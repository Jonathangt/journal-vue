import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';

describe('pruebas en el FAB component', () => {

    test('Debe de mostrar el icono por defecto', () => {
        //fa-plus
        const wrapper = shallowMount( Fab );
        const iTag = wrapper.find('i');

        expect( iTag.classes('fa-plus') ).toBeTruthy();
    })

    test('Debe de mostrar el indicon por argumento fa-circle', () => {
        //fa-circle
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        });

        const iTag = wrapper.find('i');

        expect( iTag.classes('fa-circle') ).toBeTruthy();
    })

    test('Debe de emitir el evento on:click cuando se hace click', () => {
        //wrapper.find('button').trigger('click');

        const wrapper = shallowMount( Fab );
        wrapper.find('button').trigger('click');

        expect( wrapper.emitted('on:click') ).toHaveLength(1);

    })
})