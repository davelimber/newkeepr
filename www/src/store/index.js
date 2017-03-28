import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  user: {},
  myVaults: {},
  myKeeps: {},
  //Dummy Data
  keeps: [{
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/b0/7f/71/b07f713b8fa296e871dd8c169ff86fd5.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/c7/80/e3/c780e34c14258f4087df410f03d76e83.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatisconsectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/b0/7f/71/b07f713b8fa296e871dd8c169ff86fd5.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }],
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default {
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    logout() {
      api.delete('http://localhost:3000/logout')
        .then(res => {
          state.user = {};
          Materialize.toast(res.data.message, 2000);
        })
        .catch(handleError)
    },
    register(email, name, password) {
      api.post('http://localhost:3000/register', {
        email: email,
        name: name,
        password: password
      })
        .then(res => {
          state.user = res.data.data
        })
        .catch(handleError)
    },
    login(userEmail, userPassword) {
      api.post('http://localhost:3000/login', {
        email: userEmail,
        password: userPassword
      })
        .then(res => {
          console.log(res.data)
          if (res.data.data) {
            state.user = res.data.data
            this.getUserVaults()
            this.getShareKeeps()
          } else {
            state.error = res.data.error
            Materialize.toast(res.data.error, 1000);
          }
        })
        .catch(handleError)
    },
    getVaults() {
      api('vaults')
        .then(res => {
          state.vaults = res.data.data
        })
        .catch(handleError)
    },
    getVault(id) {
      api('vaults/' + id)
        .then(res => {
          state.activeVault = res.data.data
          // this.getTasksandLists(id)
          this.getKeeps(id)
        })
        .catch(handleError)
    },
    getKeeps(id) {
      api('vaults/' + id + '/data')
        .then(res => {
          console.log(res.data.data)
          state.activeKeeps = res.data.data.keeps
          // state.activeTasks = res.data.data.tasks
        })
    },
    createVault(board) {
      api.post('vaults', vault)
        .then(res => {
          // this.getUserBoards()
          this.getUserBoards()

        })
        .catch(handleError)
    },
    getUserVaults() {
      api('uservaults')
        .then(res => {
          state.userVaults = res.data.data
        })
        .catch(handleError)
    },
    createVault(vault) {
      api.post('vaults', vault)
        .then(res => {
          this.getUserVaults()
        })
        .catch(handleError)
    },
    removeVault(vault) {
      api.delete('vaults/' + vault._id)
        .then(res => {
          this.getUserVaults()
        })
        .catch(handleError)
    },
    createKeep(keep, vaultId) {
      api.post('keeps', keep)
        .then(res => {
          this.getKeeps(vaultId)
        })
        .catch(handleError)
    },
    removeKeep(keep, vaultId) {
      api.delete('keeps/' + keep._id)
        .then(res => {
          this.getKeeps(vaultId)
        })
        .catch(handleError)
    },
  }

}

