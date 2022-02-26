import { computed } from "vue"
import { useStore } from "vuex"

const useAuth = () => {

    const store = useStore()

    const createUser = async ( user ) => {
        //TODO: create user in firebase
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const signInUser = async ( user ) => {
        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkAuthStatus = async ( ) => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    const logout = ( ) => {
        store.commit('auth/logout')
        store.commit('journal/clearEntries')
    }

    return {
        checkAuthStatus,
        createUser,
        logout,
        signInUser,

        authStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username']),
    }
}

export default useAuth