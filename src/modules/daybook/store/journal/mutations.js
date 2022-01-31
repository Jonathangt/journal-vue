
export const setEntries = ( state, payload ) => {
    state.entries = [ ...state.entries, ...payload ]
    state.isLoading = false
}

export const updateEntry = ( state, payload ) => {
    const idx = state.entries.map( e => e.id ).indexOf( payload.id )
    state.entries[idx] = payload

}

export const addEntry = ( state, payload ) => {
    state.entries = [ payload, ...state.entries ]
}

export const deleteEntry = ( state, payload ) => {
    state.entries = state.entries.filter( e => e.id !== payload )
}
