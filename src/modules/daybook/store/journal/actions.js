/* 
export const myAction = async ( {{commit }} ) => {

} */

import journalApi from "@/api/journalApi"


export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')

    if ( !data ) {
        commit('setEntries', [])
        return
    }

    const entries = []

    for (let id of Object.keys( data )) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

export const updateEntry = async ( { commit }, payload ) => {
    const { date, picture, text } = payload
    const dataToSave = { date, picture, text }

   await journalApi.put(`/entries/${payload.id}.json`, dataToSave )

   dataToSave.id = payload.id

    commit('updateEntry', { ...dataToSave })
}

export const createEntry = async ({ commit }, payload ) => {

    const { date, picture, text } = payload
    const dataToSave = { date, picture, text }

    const { data } = await journalApi.post(`/entries.json`, dataToSave )
    dataToSave.id = data.name

    commit('addEntry', dataToSave )

    return data.name
}


export const deleteEntry = async ({ commit }, id ) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id )

    return id
}
