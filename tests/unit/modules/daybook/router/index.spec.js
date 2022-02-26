import dayBookRouter from '@/modules/daybook/router/index.js';


describe('Pruebas en el router module del daybook', () => {

    test('El router debe de tener esta configuracion', async () => {
        expect (dayBookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children:[
                {
                    path:'',
                    name: 'no-entry',
                    component: expect.any(Function),
                },
                {
                    path:':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function),
                }
            ]
        })

        //expect( (await dayBookRouter.children[0].component()).default.name ).toBe('NoEntrySelected');
        //expect( (await dayBookRouter.children[1].component()).default.name ).toBe('EntryView');

        const promiseRoute = []
        //se almacena las rutas en un arreglo para poder verificar que se hayan cargado
        dayBookRouter.children.forEach( child => promiseRoute.push(child.component()))
        //resp array
        const routes = (await Promise.all( promiseRoute )).map( component => component.default.name )

        expect( routes ).toContain('NoEntrySelected');
        expect( routes ).toContain('EntryView');
    })

    test('Debe de retornar el id de la ruta', () => { 
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        //expect( dayBookRouter.children[1].props(route) ).toEqual({ id: 'ABC-123' });

        const entryRoute = dayBookRouter.children.find( child => child.name === 'entry')
        expect( entryRoute.props(route) ).toEqual({ id: 'ABC-123' });
    })
})