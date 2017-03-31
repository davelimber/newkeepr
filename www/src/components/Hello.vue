<template>
  <div class="hello">
    <div v-if="!this.$root.$data.store.state.user._id">
      <div class="section white">
        <div class="row container">
          <h3 class="header">Get Keeps!</h3>

          <!--show keeps for non logged in users-->
          <div class="row">
            <div v-for="sharedVault in sharedVaults" class="col s12 m3">
              <div class="card hoverable blue-grey darken-1" @click="getVault(sharedVault._id)">
                {{ sharedVault.title }}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add vault and user vaults when logged in -->


    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Vaults - a place for keeps!</h3>

      <!--Add Vaults-->
      <button v-if="!showVaultForm" @click="triggerVaultForm" class="waves-effect waves-light btn">Add Vault</button>

      <div class="container" v-if="showVaultForm">
        <h5>Add a Vault </h5>
        <form class="row" @submit.prevent="addVault">
          <div class="col s12 input-field">
            <input type="text" id="vaultName" v-model="vaultName" required>
            <label for="vaultName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="vaultDesc" cols="30" rows="10" v-model="vaultDesc"></textarea>
            <label for="vaultDesc">Description</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Vault</button>
          <button @click="triggerVaultForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
        </form>
      </div>

      <!--Add Keeps-->
      <router-link :to="'/vaults/'">
        <button v-if="!showVaultForm" @click="triggerVaultForm" class="waves-effect waves-light btn">Add Keep!</button>
      </router-link>

      <div class="row">
        <div v-for="uservault in uservaults" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <router-link :to="'/keeps/'" @click="getVault(uservault._id)">
              <div class="card-content white-text">
                <span class="card-title">{{ uservault.name }}</span>
                <p>{{ uservault.description }}</p>
              </div>
            </router-link>
            <div class="card-action right-align">
              <a><i @click="deleteVault(uservault)" class="fa fa-recycle"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Shared keeps -->

    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Shared Keeps</h3>
      <div class="row">
        <div v-for="sharedVault in sharedVaults" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <div class="row thumbnails-row">
              <div class="col xs-12 col-sm-6 col-md-4">
                <div class="thumbnail">
                  <img :src="sharedVault.imgUrl" alt="">
                  <div class="caption">vaultId)
                    <h3>{{ sharedVault.title }}</h3>
                    <p>{{ sharedVault.body }}</p>

                    <button v-if="showKeepToVaultForm" @click="showKeepToVault" class="waves-effect waves-light btn">Save Keep!</button>


                    <transition name="modal" v-if="!showKeepToVaultForm">
                      <div class="modal-mask">
                        <div class="modal-wrapper">
                          <div class="modal-container">
                            <div>
                              <h4>Save Keep to Vault</h4>
                              <h3>Select Vault</h3>
                              <div class="row">
                                <div v-for="uservault in uservaults" class="col s12 m3">

                                  <span>{{ uservault.name }}</span>
                                  <p>{{ uservault.description }}</p>
                                </div>

                                <button class="waves-effect waves-teal btn" type="submit">Add Keep</button>
                                <button @click="routeHome" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        vaultName: '',
        vaultDesc: '',
        showVaultForm: false,
        showKeepToVaultForm: true
      }
    },
    computed: {
      uservaults() {
        return this.$root.$data.store.state.myVaults
      },

      sharedVaults() {
        return this.$root.$data.store.state.keeps
      }
    },
    methods: {
      getVault: function (vaultId) {
        console.log('get vault by vaultId')
        console.log(vaultId)
      },
      deleteVault: function (vault) {
        this.$root.$data.store.actions.removeVault(vault)
      },
      addVault: function () {
        console.log('in addvault function')
        this.$root.$data.store.actions.createVault({
          name: this.vaultName,
          description: this.vaultDesc
        })
        console.log(this.vaultName)
        console.log(this.uservaults)
        this.showVaultForm = false
        this.vaultName = ''
        this.vaultDesc = ''
      },
      triggerVaultForm: function () {
        this.showVaultForm = !this.showVaultForm
      },
      showKeepToVault: function () {
        this.showKeepToVaultForm = !this.showKeepToVaultForm
      },
      saveKeepToVault: function () {

      },
      routeHome: function () {
        console.log('route home function')
        this.showKeepToVault();
      
      },
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-default-button {
    float: right;
  }
  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>