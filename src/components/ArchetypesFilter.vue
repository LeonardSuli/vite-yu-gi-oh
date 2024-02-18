<script>

import {state} from '../state.js'

export default{
    name: 'ArchetyperFilter',
    emits: ['filter'],
    data(){
        return{
            state
        }
    },

    created(){

        // All archetypes
        this.state.getArchetypesList('https://db.ygoprodeck.com/api/v7/archetypes.php')

    }
}
</script>


<template>

    <select name="archetype" id="archetype" v-model="state.selectedArchetype" @change="$emit('filter')">

        <option value="all" selected>All</option>

        <option :value="archetype.archetype_name" v-for="archetype in state.archetypes">

            {{ archetype.archetype_name }}

        </option>

    </select>

</template>


<style scoped></style>