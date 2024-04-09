// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo:{},
  }
}

const state = getDefaultState()

//通过 commit调用
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO:(state, userinfo)=>{
    debugger;
    state.userInfo=userinfo;
  }
}


//通过   this.$store.dispatch('user/login', currentUser)  调用

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const token = Date.parse(new Date())
    console.log(token);
    if (username == 'admin' && password == 'admin') {
      commit('SET_TOKEN', token)
      setToken(token)
      return true
    } else {
      return false
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //   }).catch(error => {
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },


 



  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

