<template>
      <transition name="modal" v-if="showmodal">
        
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
    <div>
        <!--<div class="row">-->
            <!--hello
            <h3>Add a Keep or Select a Keep</h3>-->

            <!--<button v-if="!showKeepForm" @click="triggerKeepForm" class="waves-effect waves-light btn">Add Keep</button>-->

            <!--Need to added additional fields-->

            <!--<div class="container" v-if="showKeepForm">-->
                <h4>Add a Keep</h4>
                <form class="row" @submit.prevent="addKeep">
                    <div class="col s12 input-field">
                        <input type="text" id="keepName" v-model="keepName" required>
                        <label for="keepName">Title</label>
                    </div>
                    <div class="col s12 input-field">
                        <textarea class="materialize-textarea" id="keepDesc" cols="30" rows="10" v-model="keepDesc"></textarea>
                        <label for="keepDesc">Description</label>
                    </div>
                    <div class="col s12 input-field">
                        <textarea class="materialize-textarea" id="url" cols="30" rows="10" v-model="url"></textarea>
                        <label for="url">URL</label>
                    </div>
                    <div class="col s12 input-field">
                        <textarea class="modal-footer" id="public" type="checkbox" checked="checked" v-model="public"></textarea>
                        <label for="public">Public?</label>
                    </div>
                    <button class="waves-effect waves-teal btn" type="submit">Add Keep</button>
                    <button @click="routeHome" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            <!--</div>-->
        </div>
                <!--</div>-->
      </div>
    </div>
     </div>
  </transition>
        <!--<div class="row">
            <div v-for="sharedVault in sharedVaults" class="col s12 m3">
                <div class="card hoverable blue-grey darken-1" @click="getVault(sharedVault._id)">-->
                    
                    <!--{{ sharedBoard.title }}-->
                    
                    <!--<div class="row thumbnails-row">
                        <div class="col xs-12 col-sm-6 col-md-4">
                            <a href="" target="_blank">
                                <div class="thumbnail">
                                    <img :src="sharedVault.imgUrl" alt="">
                                    <div class="caption">
                                        <h3>{{ sharedVault.title }}</h3>
                                        <p></p>
                                        <p>{{ sharedVault.body }}</p>-->
                                      
                                        <!--<a href="" target="_blank">-->
                                        <!--<p><span class="project-link dotted-underline">See it live</span></p>
                      </a>
                      <a href="" target="_blank">
                        <p><span class="project-link dotted-underline">Source Code</span></p>
                      </a>-->
                    
                                    <!--</div>
                                </div>
                            </a>
                        </div>
                    </div>-->
                    
                    <!--Pulling data from DB-->
                    <!--<router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
            <div class="card-content white-text">
              <span class="card-title">        
                {{ sharedboard.name }}
                </span>
              <p>{{ sharedboard.description }}</p>
            </div>
          </router-link>-->
                <!--</div>
            </div>
        </div>-->



</template>


<script>
    export default {
        name: 'vault',
        data() {
            return {
                vault: [],
                keepName: '',
                keepDesc: '',
                showKeepForm: false,
                url: '',
                tags: '',
                public: '',
                showmodal: true
            }
        },
        mounted() {
            this.$root.$data.store.actions.getVaults(this.$route.params.id)
        },
        computed: {
            vaults() {
                return this.$root.$data.store.state.myVaults
            },
            sharedVaults() {
                return this.$root.$data.store.state.keeps
            }
        },
        methods: {
            addKeep: function () {
                this.$root.$data.store.actions.createKeep({
                    title: this.keepName,
                    body: this.keepDesc,
                    imgUrl: this.url,
                    public: this.public,
                    // vaultId: this.$route.params.id
                }, this.$route.params.id)
                this.showKeepForm = false
                this.keepName = ''
                this.keepDesc = ''
                this.$router.push("/")
            },
            triggerKeepForm: function () {
                this.showKeepForm = !this.showKeepForm
                this.showInviteForm = false
                this.keepDesc = ''
            },
            routeHome: function () {
                this.showmodal = false
                this.$router.push("/")
            },
        }
    }

 function showModal(but, modal){  
            $('#' + modal).openModal(); 
            $('#' + modal + '_YesBtn').click(function(){ $('#' + modal).closeModal(); document.location = but.href; }); 
        } 
</script>


<style scoped>
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