
import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView.vue'


const createVuexStore = ( initialState ) =>
    createStore({
        modules:{
            journal: {
                ...journal,
                state:{ ...initialState }
            }
        }
    })

    jest.mock('sweetalert2', () => ({
        fire: jest.fn(),
        showLoading: jest.fn(),
        close: jest.fn(),
    }))

    describe('Pruebas en el entryList component', () => {

        const store = createVuexStore( journalState )
        store.dispatch = jest.fn()

        const mockRouter = {
            push: jest.fn()
        }

        let wrapper 

        beforeEach(() => {
            jest.clearAllMocks()

            wrapper = shallowMount( EntryView, {
                props: {
                    id: '-MtVDjnn01jkmfCVkQmp1'
                },
                global:{
                    mocks:{
                        $router: mockRouter
                    },
                    plugins: [ store ]
                }
            })
        })

        test('Debe de sacar al usuario por que el id no existe', () => {

            const wrapper = shallowMount( EntryView, {
                props: {
                    id: 'Este id no existe en el store'
                },
                global:{
                    mocks:{
                        $router: mockRouter
                    },
                    plugins: [ store ]
                }
            })

            //lo llama, y saca al user

            expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
        })


        test('Debe de mostrar la entrada correctamente ', () => {  
            expect( wrapper.html() ).toMatchSnapshot()
            expect( mockRouter.push ).not.toHaveBeenCalledWith()
        })

        test('Debe de borrar la entrada y salir', ( done ) => {    
            
            Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))
            
            wrapper.find('.btn-danger').trigger('click')



            expect( Swal.fire ).toHaveBeenCalledWith({ 
                title: 'Are you sure?',
                text: 'Once deleted, cannot be recovered',
                showDenyButton: true,
                confirmButtonText: "Yes, I'm sure."
            })

            setTimeout(() => {
                expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-MtVDjnn01jkmfCVkQmp1')
                expect( mockRouter.push ).toHaveBeenCalled()
                done()
            }, 1 )
        })
    })