<template>
    <transition name="modal" v-if="showmodal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div>
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
                                <textarea class="modal-footer" id="public" type="checkbox" v-model="public"></textarea>
                                <label for="public">Public?</label>
                            </div>
                            <button class="waves-effect waves-teal btn" type="submit">Add Keep</button>
                            <button @click="routeHome" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
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
                public: true,
                showmodal: true
            }
        },
        // mounted() {
        //     this.$root.$data.store.actions.getVaults(this.$route.params.id)
        // },
        computed: {
            vaults() {
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
            addKeep: function () {
                this.$root.$data.store.actions.createKeep({
                    title: this.keepName,
                    body: this.keepDesc,
                    imgUrl: this.url,
                    public: this.public,
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