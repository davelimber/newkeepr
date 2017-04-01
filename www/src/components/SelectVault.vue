<template>
    <div>
        Hello! {{ uservault.name }}
        <!--<div v-for="uservault in uservaults" class="col s12 m3">


        <input type="checkbox" id="choice" v-model="vaultName">
        <label for="choice">{{ uservault.name }}</label>

    </div>
    <div>
       vaultName <h3>Picked: {{ vaultName }}</h3>-->
    </div>



</template>


<script>
    export default {
        name: 'selectvault',
        props: ['uservault'],
        data() {
            return {
                vaultName: ''
            }
        },
        methods: {

            routeHome: function () {
                // this.showmodal = false
                this.$router.push("/")
            },

        }
    }

</script>


<styles>


</styles>