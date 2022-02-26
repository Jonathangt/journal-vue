import axios from 'axios';
import createVuexStore from '../../../mock-data/mock-store';

describe('Vuex - Pruebas en el Auth Module', () => {

    test('Estado inicial', () => {

        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'authenticating', // authenticating, authenticated, not-authenticated
            user: null,
        })
    
        const { idToken, refreshToken, status, user } = store.state.auth

        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
        expect( status ).toBe( 'authenticating' )
        expect( user ).toBe( null )
    })

    //Mutations
    test('Mutation: loginUser', () => {
        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'authenticating', // authenticating, authenticated, not-authenticated
            user: null,
        })

        const payload = {
            user: { name: 'Jonathan', email: 'jonathan@gmail.com'},
            idToken: 'ABC-123',
            refreshToken: 'XMC-123',
        }

        store.commit( 'auth/loginUser', payload )

        const { idToken, refreshToken, status, user } = store.state.auth

        expect( idToken ).toBe( 'ABC-123' )
        expect( refreshToken ).toBe( 'XMC-123' )
        expect( status ).toBe( 'authenticated' )
        expect( user ).toEqual({ name: 'Jonathan', email: 'jonathan@gmail.com'})
    })

    test('Mutation: logout', () => {

        localStorage.setItem( 'idToken', 'ABC-123' )
        localStorage.setItem( 'refreshToken', 'XMC-123' )

        const store = createVuexStore({
            idToken: 'ABC-123',
            refreshToken: 'XMC-123',
            status: 'authenticated', // authenticating, authenticated, not-authenticated
            user: { name: 'Jonathan', email: 'jonathan@gmail.com'}
        })

        store.commit( 'auth/logout' )


        const { idToken, refreshToken, status, user } = store.state.auth

        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBe( null )


        expect( localStorage.getItem( 'idToken' ) ).toBe( null )
        expect( localStorage.getItem( 'refreshToken' ) ).toBe( null )
    })

    //Getters

    test('Getter: currentState, username', () => {

        const store = createVuexStore({
            idToken: 'ABC-123',
            refreshToken: 'XMC-123',
            status: 'authenticated', // authenticating, authenticated, not-authenticated
            user: { name: 'Jonathan', email: 'jonathan@gmail.com'}
        })

        expect( store.getters['auth/currentState'] ).toBe( 'authenticated' )       
        expect( store.getters['auth/username'] ).toBe( 'Jonathan' )
    })

    //Actions

    test('Action: createUser - Error user ya existe', async () => {
        
        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'not-authenticated', // authenticating, authenticated, not-authenticated
            user: null,
        })

        const payload = {
            name: 'user Testing',
            email: 'test@test.com',
            password: '123456789',
        }

        const response = await store.dispatch( 'auth/createUser', payload )

        expect( response ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

        const { idToken, refreshToken, status, user } = store.state.auth

        expect( idToken ).toBeFalsy()
        expect( refreshToken ).toBeFalsy()
        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBeFalsy()
    })

    test('Action: createUser signInUser - Crea el user', async () => {
        
        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'not-authenticated', // authenticating, authenticated, not-authenticated
            user: null,
        })

        const payload = { name: 'user Testing', email: 'test2@test.com', password: '123456789' }

        //SingInUser
        await store.dispatch( 'auth/signInUser', payload )
        
        const { idToken } = store.state.auth

        //borrar el user
        const deleteResponse = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAnTt2ImZZxs7IKo6T3vBvX6Dov29gupJQ`,{
            idToken
        })


        //crear el user
        const createResponse = await store.dispatch( 'auth/createUser', payload )

        expect( createResponse ).toEqual({ ok: true, message: 'OK' })

        const { idToken:token, refreshToken, status, user } = store.state.auth

        expect( typeof token ).toBe( 'string' )
        expect( typeof refreshToken ).toBe( 'string' )
        expect( status ).toBe( 'authenticated' )
        expect( user ).toMatchObject({ name: 'user Testing', email: 'test2@test.com' })
    })

    test('Action: checkAuthentication - POSITIVE', async () => {

        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'not-authenticated', // authenticating, authenticated, not-authenticated
            user: null,
        })

        //SingInUser
        const SingInUserResp = await store.dispatch( 'auth/signInUser', { email: 'test@test.com', password: '123456789' } )

        const { idToken } = store.state.auth
        store.commit('auth/logout')

        localStorage.setItem( 'idToken', idToken )
        const checkAuthentication = await store.dispatch( 'auth/checkAuthentication' )

        expect( checkAuthentication ).toEqual({ ok: true })

        const { idToken:token, status, user } = store.state.auth

        expect( typeof token ).toBe( 'string' )
        expect( status ).toBe( 'authenticated' )
        expect( user ).toMatchObject({ name: 'user Testing', email: 'test@test.com' })
    })

    test('Action: checkAuthentication - NEGATIVE', async () => {

        const store = createVuexStore({
            idToken: null,
            refreshToken: null,
            status: 'authenticating', // authenticating, authenticated, not-authenticated
            user: null,
        })

        localStorage.removeItem( 'idToken' )
        const checkAuthentication = await store.dispatch( 'auth/checkAuthentication' )
        expect( checkAuthentication ).toEqual({ ok: false, message: 'No token'})

        const { status } = store.state.auth       
        expect( status ).toBe( 'not-authenticated' )

        localStorage.setItem( 'idToken', 'ABC-123' )
        const checkAuthentication2 = await store.dispatch( 'auth/checkAuthentication' )

        expect( checkAuthentication2 ).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' })
    })
})