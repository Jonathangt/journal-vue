
import store from '@/store';

const idAuthenticatedGuard = async (to, from, next) => {

    const { ok } = await store.dispatch('auth/checkAuthentication'); //returns true or false
    if ( ok )  next();
    else next( { name: 'login' } );
}

export default idAuthenticatedGuard;