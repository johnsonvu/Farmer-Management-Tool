import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        loggedIn: false,
        user_sin: ''
    })
}

export default createStore
