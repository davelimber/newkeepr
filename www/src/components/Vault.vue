<template>
    <div>
        <div class="row">
            <h3>{{ vault.name }}</h3>

            <button v-if="!showKeepForm" @click="triggerKeepForm" class="waves-effect waves-light btn">Add Keep</button>
            <!--<button @click="triggerInviteForm" class="waves-effect waves-light btn" v-if="!showListForm && !showInviteForm">Add Collaborators</button>-->
            <!--Need to added additional fields-->
            <div class="container" v-if="showKeepForm">
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
                    <button class="waves-effect waves-teal btn" type="submit">Add Keep</button>
                    <button @click="triggerKeepForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            </div>
            <div v-for="keep in keeps">
                <list :keep="keep"></list>
            </div>
        </div>

    </div>

</template>


<script>
    // import Keep from './Keep'
  
    export default {
        name: 'vault',
        // components: { Keep },
        data() {
            return {
                keepName: '',
                keepDesc: '',
                showKeepForm: false,
                // inviteEmail: '',
                // showInviteForm: false
            }
        },
        mounted() {
            this.$root.$data.store.actions.getVaults(this.$route.params.id)
        },
        computed: {
            vaults() {
                return this.$root.$data.store.state.myVaults
            },
            keeps() {
                return this.$root.$data.store.state.keeps
            }
        },
        methods: {
            addKeep: function () {
                this.$root.$data.store.actions.createKeep({
                    name: this.keepName,
                    description: this.keepDesc,
                    vaultId: this.$route.params.id
                }, this.$route.params.id)
                this.showKeepForm = false
                this.keepName = ''
                this.keepDesc = ''
            },
            triggerKeepForm: function () {
                this.showKeepForm = !this.showKeepForm
                this.showInviteForm = false
                this.keepDesc = ''
            },
        }
    }

</script>


<styles>


</styles>