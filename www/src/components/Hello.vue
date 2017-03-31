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

                

                <!--Pulling data from DB-->
                <!--<router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
            <div class="card-content white-text">
              <span class="card-title">        
                {{ sharedboard.name }}
                </span>
              <p>{{ sharedboard.description }}</p>
            </div>
          </router-link>-->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add vault and user vaults when logged in -->


    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Vaults - a place for keeps!</h3>

      <button v-if="!showVaultForm && !hideVaultForm" @click="triggerVaultForm" class="waves-effect waves-light btn">Add Vault</button>
       <!--<button @click="hideVaultForm" class="waves-effect waves-light btn">Toggle </button>-->
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

            <button v-if="!showVaultForm && !hideVaultForm" @click="triggerVaultForm" class="waves-effect waves-light btn">Add Keep!</button>
       <!--<button @click="hideVaultForm" class="waves-effect waves-light btn">Toggle </button>-->
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

      <div class="row">
        <div v-for="uservault in uservaults" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <router-link :to="'/vaults/' + uservault._id" @click="getVault(uservault._id)">
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
          <div class="card hoverable blue-grey darken-1" @click="getVault(sharedVault._id)">
            <!--{{ sharedBoard.title }}-->
            <div class="row thumbnails-row">
              <div class="col xs-12 col-sm-6 col-md-4">
                <a href="" target="_blank">
                  <div class="thumbnail">
                    <img :src="sharedVault.imgUrl" alt="">
                    <div class="caption">
                      <h3>{{ sharedVault.title }}</h3>
                      <p></p>
                      <p>{{ sharedVault.body }}</p>
                      <!--<a href="" target="_blank">-->
                        <!--<p><span class="project-link dotted-underline">See it live</span></p>
                      </a>
                      <a href="" target="_blank">
                        <p><span class="project-link dotted-underline">Source Code</span></p>
                      </a>-->
                    </div>
                  </div>
                </a>
              </div>
            </div>
  <!--Pulling data from DB-->
              <!--<router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
            <div class="card-content white-text">
              <span class="card-title">        
                {{ sharedboard.name }}
                </span>
              <p>{{ sharedboard.description }}</p>
            </div>
          </router-link>-->
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
        hideVaultForm: false
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
      hideVaultForm: function () {
        this.hideVaultForm = !this.hideVaultForm
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
</style>