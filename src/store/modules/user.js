import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    jobNumber: '',
    userName: '',
    nickName: '',
    roles: [],
    menus: [],
    buttons: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_JOB_NUMBER: (state, jobNumber) => {
      state.jobNumber = jobNumber
    },
    SET_NAME: (state, name) => {
      state.userName = name
    },
    SET_NICK_NAME: (state, nickName) => {
      state.nickName = nickName
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_NAMES: (state, roleNames) => {
      state.roleNames = roleNames
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_ROLE_NAMES', data.roleNames)
          commit('SET_MENUS', data.menus)
          commit('SET_BUTTONS', data.buttons)
          commit('SET_NAME', data.userName)
          commit('SET_NICK_NAME', data.nickName)
          commit('SET_JOB_NUMBER', data.jobNumber)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_NICK_NAME', '')
          commit('SET_JOB_NUMBER', '')
          commit('SET_ROLES', [])
          commit('SET_ROLE_NAMES', [])
          commit('SET_MENUS', [])
          commit('SET_MENUS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
