import dayBookRouter from '@/modules/daybook/router/index.js';


describe('Pruebas en el router module del daybook', () => {

    test('El router debe de tener esta configuracion', () => {
        expect (dayBookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children:[
                {
                    path:'',
                    name:'no-entry',
                    component: expect.any(Function),
                },
                {
                    path:':id',
                    name:'entry',
                    component: expect.any(Function),
                    props: expect.any(Function),
                }
            ]
        })

    })

})