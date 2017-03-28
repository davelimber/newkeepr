<template>
    <div>
        <div class="row">
            <h3>{{ vault.name }}</h3>

            <button v-if="!showListForm" @click="triggerListForm" class="waves-effect waves-light btn">Add Keep</button>
            <!--<button @click="triggerInviteForm" class="waves-effect waves-light btn" v-if="!showListForm && !showInviteForm">Add Collaborators</button>-->

            <div class="container" v-if="showKeepForm">
                <h4>Add a List</h4>
                <form class="row" @submit.prevent="addKeep">
                    <div class="col s12 input-field">
                        <input type="text" id="keepName" v-model="keepName" required>
                        <label for="keepName">Title</label>
                    </div>
                    <div class="col s12 input-field">
                        <textarea class="materialize-textarea" id="keepDesc" cols="30" rows="10" v-model="keepDesc"></textarea>
                        <label for="keepDesc">Description</label>
                    </div>
                    <button class="waves-effect waves-teal btn" type="submit">Add List</button>
                    <button @click="triggerListForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            </div>
<!--Need to remove-->
            <!--<div class="container" v-if="showInviteForm">
                <h4>Add a Collaborator</h4>
                <form class="row" @submit.prevent="inviteUser">
                    <div class="col s12 input-field">
                        <input type="text" id="inviteEmail" v-model="inviteEmail" required>
                        <label for="inviteEmail">Collaborator E-mail</label>
                    </div>
                    <button type="submit" class="waves-effect waves-teal btn">Invite User</button>
                    <button @click="triggerInviteForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            </div>-->
<!--end remove-->
            <div v-for="keep in keeps">
                <list :list="keep"></list>
            </div>
        </div>

    </div>

</template>


<script>
    import Keep from './Keep'
    // import

    export default {
        name: 'board',
        components: { List },
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
            board() {
                return this.$root.$data.store.state.activeBoard
            },
            lists() {
                return this.$root.$data.store.state.activeLists
            },
            tasks() {
                return this.$root.$data.store.state.activeTasks
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
                this.listName = ''
                this.listDesc = ''
            },
            triggerListForm: function(){
                this.showKeepForm = !this.showKeepForm
                this.showInviteForm = false
                this.listName = ''
                this.listDesc = ''
            },
            // triggerInviteForm: function(){
            //     this.showInviteForm = !this.showInviteForm
            //     this.showKeepForm = false
            //     this.inviteEmail = ''
            // },
            // inviteUser: function(){
            //     this.$root.$data.store.actions.addCollab({
            //         email: this.inviteEmail
            //     }, this.$route.params.id)
            //     this.showKeepForm = false
            //     this.showInviteForm = false
            //     this.inviteEmail = ''
            // }
        }
    }

</script>


<styles>


</styles>