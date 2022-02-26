/* 
export const myAction = async ( {{commit }} ) => {

} */

import authApi from "@/api/authApi";


export const createUser = async ( { commit }, user ) => {
    const { name, email, password } = user

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })

        const { idToken, refreshToken } = data //localId

        await authApi.post(':update', { displayName: name, idToken, refreshToken })

        //Mutation
        delete user.password
        commit('loginUser', { user, idToken, refreshToken })

        
        return { ok: true, message: 'OK' }

    } catch (error) {
        console.log( error.response.data.error.message );
        return { ok: false, message: error.response.data.error.message }
    }
}


export const signInUser = async ( { commit }, user ) => {
    const { email, password } = user

    try {

        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })

        const { displayName, idToken, refreshToken } = data //localId

        user.name = displayName

        //Mutation
        commit('loginUser', { user, idToken, refreshToken })
        
        return { ok: true }

    } catch (error) {
        console.log( error.response.data.error.message );
        return { ok: false, message: error.response.data.error.message }
    }
}


export const checkAuthentication = async ( { commit } ) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if( !idToken ){
        commit('logout')
        return {
            ok: false,
            message: 'No token'
        }
    }

    try {
        const { data } = await authApi.post(':lookup', { idToken })

        const { email, displayName } = data.users[0];

        const user = {
            name: displayName,
            email,
        }

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

    } catch (error) {
        commit('logout')
        return { ok: false, message: error.response.data.error.message }        
    }
}