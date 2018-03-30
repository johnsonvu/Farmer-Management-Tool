import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        isLoggedIn: false,
        user_sin: '1234',
        isManager: false,
        isWorker: false
    })
}

export default createStore
