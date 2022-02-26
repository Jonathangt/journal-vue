

import { createStore } from 'vuex'
//import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryList from '@/modules/daybook/components/EntryList.vue'
import { shallowMount } from '@vue/test-utils'
import journal from '@/modules/daybook/store/journal'

const createVuexStore = ( initialState ) =>
        createStore({
            modules:{
                journal: {
                    ...journal,
                    state:{ ...initialState }
                }
            }
        })

       

describe('Pruebas en el entryList component', () => {
    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }

    // const store = createStore({
    //     modules: { 
    //         journal: { ...journalMockModule }
    //     }
    // })

    const store = createVuexStore( journalState )

    const mockRouter = {
        push: jest.fn()
    }


    /* let wrapper = shallowMount( EntryList, {
        global:{
            mocks:{
                $router: mockRouter
            },
            plugins: [ store ]
        }
    }) */

    let wrapper 

    beforeEach(() => {
        jest.clearAllMocks()

        wrapper = shallowMount( EntryList, {
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('Debe de llamar el getEntriesByTerm sin termino y mostar dos entradas', () => { 
        expect( wrapper.findAll('entry-stub').length ).toBe( 2 );
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')

        await input.setValue('2 test')

        expect( wrapper.findAll('entry-stub').length ).toBe( 1 )
    })


    test('El btn de nuevo debe de redireccionar a /new', async () => {
        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'entry', params:{ id:'new' }})
    })
})