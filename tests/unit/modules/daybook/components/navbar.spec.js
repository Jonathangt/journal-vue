
import { shallowMount } from '@vue/test-utils';
import Navbar from '@/modules/daybook/components/navbar.vue';
import createVuexStore from '../../../mock-data/mock-store';



import { VueRouterMock, createRouterMock, injectRouterMock  } from 'vue-router-mock'
import { config } from '@vue/test-utils'
  
// create one router per test file
const router = createRouterMock()
  beforeEach(() => {
    injectRouterMock(router)
  })
  
// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)

describe('Vuex - Pruebas en el navbar component', () => { 

    const store = createVuexStore({
        user:{
            name: 'Jonathan',
            email: 'jonathan@gmail.com'
        },

        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    });


    beforeEach( () =>  jest.clearAllMocks() )

    test('Debe de mostar el componente correctamente', async () => {

        const wrapper = shallowMount(Navbar, {
            global:{
                plugins: [ store ],
            }
        })

        expect( wrapper.html() ).toMatchSnapshot();
    })


    test('Debe de cerrar sesión y redireccionar', async () => {

        const wrapper = shallowMount(Navbar, {
            global:{
                plugins: [ store ],
            }
        })

        await wrapper.find('button').trigger('click');

        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'login' } );

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated', 
            idToken: null,
            refreshToken: null
        });
    })
});