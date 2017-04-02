<template>
    <div>
        <h2> Hello! </h2>
        <h3>{{ activeKeep.title }}</h3>
        <!--{{ uservault.name }}-->
        <!--<div v-for="uservault in uservaults" class="col s12 m3">


            <input type="checkbox" id="choice" v-model="vaultName">
            <label for="choice">{{ uservault.name }}</label>

        </div>
        <div>
            vaultName
            <h3>Picked: {{ vaultName }}</h3>
        </div>

    </div>-->

        <div class="container">
            <form class="col s12" @submit.prevent="addToVault">
                <div class="input-field col s8">
                    <select id="selected">
                    <option   v-for="vault in uservaults" :value="vault.title">{{vault.title}}</option>
                </select>
                    <label>Vault</label>
                </div>
                <button class="waves-effect waves-light btn" alt="add keep to vault">Add to Vault</button>
            </form>

        </div>
    </div>
</template>


<script>
    export default {
        name: 'selectvault',
        props: ['sharedKeep'],
        data() {
            return {
                vaultName: ''
            }
        },
        computed: {
            uservaults(vaults) {

                return this.$root.$data.store.state.keeps
            },

            activeKeep() {
                return this.$root.$data.store.state.activeKeep
            },
            activeUserId() {
                return this.$root.$data.store.state.user._id
            }
        },
        methods: {

            routeHome: function () {
                // this.showmodal = false
                this.$router.push("/")
            },
            addToVault() {
                var selectedName = document.getElementById("selected").value
                var vault = {
                    name: selectedName,
                }
                this.$root.$data.store.actions.addKeepToVault(this.keep._id, vault)
                Materialize.toast('keep added to vault', 5000)
            }

        }
    }

</script>


<styles>


</styles>