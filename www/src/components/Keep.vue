<template>
    <div>
 Vault name and it's Keeps go here!
                <ul>
                    <li>
                      
                    </li>
                    <li>
                    
                    </li>
                </ul>
    
     </div>

</template>


<script>


    export default {
        name: 'keeps',
        computed: {
            user() {
                return this.$root.$data.store.state.user
            }
        },
        methods: {
            
        }

    }


</script>


<style>

</style>