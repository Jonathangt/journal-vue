import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-b001c-default-rtdb.firebaseio.com'
})

export default journalApi