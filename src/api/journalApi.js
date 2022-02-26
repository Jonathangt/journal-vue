import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-b001c-default-rtdb.firebaseio.com'
})

//console.log( process.env.NODE_ENV ) // 'test';

journalApi.interceptors.request.use(config => {
    
    config.params = {  
        auth: localStorage.getItem('idToken')
    }
    return config
})

export default journalApi