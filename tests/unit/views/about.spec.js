
import { shallowMount } from '@vue/test-utils';
import About  from '@/views/About.vue';

describe('Pruebas en el about view', () => {
    test('Debe de renderizar el compoiente correctamente', () => {
        const wrapper = shallowMount(About);
        expect(wrapper.html()).toMatchSnapshot();
    })
})