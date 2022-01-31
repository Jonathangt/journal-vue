
import { shallowMount } from '@vue/test-utils';
import Home  from '@/views/Home.vue';

describe('Pruebas en el home view', () => {
    test('Debe de renderizar el compoiente correctamente', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.html()).toMatchSnapshot();
        // === 
    })

    test('Al hacer click en un boton debe de redirecionar a no-entry', () => {
        const mockRouterPush = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global:{
                mocks:{
                    $router: mockRouterPush
                }
            }
        })

        wrapper.find('button').trigger('click');

        expect(mockRouterPush.push).toHaveBeenCalledWith({ name: 'no-entry'});
    });
    
})