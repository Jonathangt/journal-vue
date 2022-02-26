
import useAuth from '@/modules/auth/composables/useAuth';

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentState': 'authenticated',
        'auth/username': 'testuser',
    },
}

jest.mock('vuex', () => ({
    useStore: () => mockStore,

}));

describe('Vuex - Pruebas en el Auth Module', () => {  
    
    beforeEach( () => { jest.clearAllMocks() } )

    test('Create user exitoso', async () => {

        const { createUser } = useAuth();

        const user = { name: 'Jonathan', email: 'jonathan@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await createUser( user );

        expect( mockStore.dispatch ).toHaveBeenCalledWith('auth/createUser', user);
        expect( resp ).toEqual({ ok: true });

    })

    test('Create user fallido, porque el user ya existe', async () => {

        const { createUser } = useAuth();

        const user = { name: 'Jonathan', email: 'jonathan@gmail.com' }
        mockStore.dispatch.mockResolvedValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser( user );

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/createUser', user );

        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' });
    })

    test('Login exitoso', async () => {

        const { signInUser } = useAuth();

        const loginForm = { email: 'jonathan@gmail.com', password: '123456' }

        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await signInUser( loginForm );

        expect( mockStore.dispatch ).toHaveBeenCalledWith('auth/signInUser', loginForm );

        expect( resp ).toEqual({ ok: true });
    })

    test('Login fallido', async () => {

        const { signInUser } = useAuth();

        const loginForm = { email: 'jonathan@gmail.com', password: '123456' }

        mockStore.dispatch.mockResolvedValue({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

        const resp = await signInUser( loginForm );

        expect( mockStore.dispatch ).toHaveBeenCalledWith('auth/signInUser', loginForm );

        expect( resp ).toEqual({ ok: false, message: 'EMAIL/PASSWORD do not exist' });
    })


    test('checkAuthStatus', async () => {

        const { checkAuthStatus } = useAuth();

        mockStore.dispatch.mockResolvedValue({ ok: true })

        const resp = await checkAuthStatus();

        expect( mockStore.dispatch ).toHaveBeenCalledWith( 'auth/checkAuthentication' );

        expect( resp ).toEqual({ ok: true });
    })

    test('logout', async () => {

        const { logout } = useAuth()

        logout()

        expect( mockStore.commit ).toHaveBeenCalledWith( 'auth/logout' );
        expect( mockStore.commit ).toHaveBeenCalledWith( 'journal/clearEntries' );
    })


    test('Computed: authState, username', () =>{
        const { authStatus, username } = useAuth()

        expect( authStatus.value ).toBe('authenticated');
        expect( username.value ).toBe('testuser');
    })

    





    
 });