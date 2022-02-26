import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyAnTt2ImZZxs7IKo6T3vBvX6Dov29gupJQ'
    }
})

export default authApi