
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'
import authApi from '@/api/authApi'

    const createVuexStore = ( initialState ) =>
        createStore({
            modules:{
                journal: {
                    ...journal,
                    state:{ ...initialState }
                }
            }
        })



    describe('Vuex - Pruebas en el Journal Module', () => {

        beforeAll( async () => {
            const { data } = await authApi.post(':signInWithPassword', {
                email: 'test@test.com',
                password: '123456789',
                returnSecureToken: true
            })

            localStorage.setItem('idToken', data.idToken)
        })
        
        //basics
        test('Este es el estado incial, debe de tener el state', () => {
            const store = createVuexStore( journalState )
                    
            const { isLoading, entries } = store.state.journal

            expect( isLoading ).toBeFalsy()
            expect( entries ).toEqual( journalState.entries )
        })

        // Mutations
        test('Mutations: setEntries', () => {

            const store = createVuexStore({ isLoading: true, entries: [] })

            store.commit('journal/setEntries', journalState.entries)

            expect( store.state.journal.entries.length ).toBe( 2 )
            expect( store.state.journal.isLoading ).toBeFalsy()
        })

        test('Mutations: updateEntry', () => {
            //crete store con entries
            const store = createVuexStore( journalState )

            //updateEntry

            const updateEntry = {
                id: '-MtVDjnn01jkmfCVkQmp',
                date: '1642291973841',
                text: 'Hola mundo desde mock-data',
            }

            //commit de la mutation
            store.commit('journal/updateEntry', updateEntry)

            //Expects
            //entries.length = 2

            const arrEntries = store.state.journal.entries

            expect( arrEntries.length ).toBe( 2 )
            //entries tiene que existir updateEntry toEqual
            expect( arrEntries.find( e => e.id === updateEntry.id)).toEqual( updateEntry )        
        })

        test('Mutations: addEntry', () => {
            //crete store con entries
            const store = createVuexStore( journalState )

            // addEntry { id, date, text }
            store.commit('journal/addEntry', { id: '-ABC-123', date: '1642291973841', text: 'Hola mundo desde addEntry' })

            //Expects 
            const arrEntries = store.state.journal.entries
            //entries.length = 3
            expect( arrEntries.length ).toBe( 3 )
            //entries con el id ABC-123 exista
            expect( arrEntries.find( e => e.id === '-ABC-123')).toBeTruthy( )       

            //commit de la mutation deleteEntry con el id ABC-123

            store.commit('journal/deleteEntry', '-ABC-123')
            //Expects 
            //entries.length = 2
            expect( store.state.journal.entries.length ).toBe( 2 )
            
            //entries con el id ABC-123 no exista
            expect( store.state.journal.entries.find( e => e.id === '-ABC-123')).toBeFalsy( )

        })

        //test('Mutations: deleteEntry', () => {})

        //test('Mutations: clearEntries', () => {})

        //getters
        test('Getters: getEntriesByTerm - getEntryById', () => {

            const store = createVuexStore( journalState )

            const [ entry1, entry2 ] = journalState.entries

            expect( store.getters['journal/getEntriesByTerm']('').length ).toBe( 2 )
            expect( store.getters['journal/getEntriesByTerm']('test').length ).toBe( 1 )

            expect( store.getters['journal/getEntriesByTerm']('test') ).toEqual( [entry2] )

            //-MtVDjnn01jkmfCVkQmp
            expect( store.getters['journal/getEntryById']('-MtVDjnn01jkmfCVkQmp') ).toEqual( entry1 )

        })

        //actions
        test('Actions: loadEntries', async () => {

            const store = createVuexStore({ isLoading: true, entries: [] })
            //llegara a firebase
            await store.dispatch('journal/loadEntries')

            expect( store.state.journal.entries.length ).toBe( 3 )

        })

        test('Actions: updateEntry', async () => {

            const store = createVuexStore( journalState )
            
            const updateEntry = {
                id: '-MtVDjnn01jkmfCVkQmp',
                date: '1642291973841',
                text: 'Hola mundo update',
                otroCampo: true,
                otroMas: { a: 1, b: 2 }
            }

            await store.dispatch('journal/updateEntry', updateEntry)

            expect( store.state.journal.entries.length ).toBe( 2 )
            expect( store.state.journal.entries.find( e => e.id === updateEntry.id ))
                .toEqual({
                    id: '-MtVDjnn01jkmfCVkQmp',
                    date: '1642291973841',
                    text: 'Hola mundo update',
                })
        })


        test('Actions: createEntry, deleteEntry', async () => {
            //create store
            const store = createVuexStore( journalState )

            //new entry { id, date, text }
            const newEntry = { date: '1642291973841', text: 'Hola mundo desde createEntry' }

            //dispatch createEntry
            const id = await store.dispatch('journal/createEntry', newEntry)

            //get id from entry //id debe de ser un string
            expect( typeof id ).toBe('string')
            
            //la nueva entrada debe de existir en el store...
            expect( store.state.journal.entries.find( e => e.id === id )).toBeTruthy()

            //#2 deleteEntry


            //dispatch deleteEntry
            await  store.dispatch('journal/deleteEntry', id)

            //la nueva entrada debe de no existir en el store...
            expect( store.state.journal.entries.find( e => e.id === id )).toBeFalsy()

        })



    });