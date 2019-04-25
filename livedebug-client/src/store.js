import Vue from 'vue'
import Vuex from 'vuex'
import axios from './helpers/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: '',
    projects: {
      user: {
        display_name: ''
      },
      projects: []
    },
    collections: []
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },

    setProjects(state, payload) {
      console.log(payload)
      state.projects.projects = payload
    },

    setCollections(state, payload) {
      state.collections = payload
    },

    cleanCollection(state) {
      state.collections = []
    }
  },
  actions: {
    fetchUsers(context) {
      return axios.get('/users').then(({ data }) => {
        console.log('masuk')
        console.log(data, 'ini store')
        context.commit('setUsers', data)
      })
    },
    fetchProject(context, id) {
      return axios
        .get(`/projects/${id}`)
        .then(({ data }) => {
          console.log('masuk ke then')
          context.commit('setProjects', { data })
        })
    },

    findCollections(context, query) {
      return axios.get(`/collections/?q=${query}`).then(({ data }) => {
        context.commit('setCollections', data)
      })
    },

    cleanCollection(context) {
      context.commit('cleanCollection')
    }
  }
})
