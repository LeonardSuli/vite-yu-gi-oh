<script>

import axios from 'axios';
import {state} from '../state'

// import axios from 'axios';          //spostato nello state

import CharacterCard from './CharacterCard.vue';
import LoadingIcon from './LoadingIcon.vue';

export default{
    name: 'AppMain',
    components:{
        CharacterCard,
        LoadingIcon,
    },
    
    data(){
        return{

            state,
            

            // //   base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',                     //spostato nello state 
            // base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0',
            // characters: [], //o null, o [], o '';
            // loading: true,
            
            archetypes: [],
            selectedArchetype: '',

        }
    },
    

    methods: {

        // getCharacters(url){                   //spostato nello state

        //     axios
        //     .get(url)
        //     .then((response) => {

        //         console.log(this.characters);
        //         console.log(response.data.data[0].card_images[0].image_url);

        //         this.characters = response.data.data

        //         this.loading = false

        //     })

        //     .catch((error) => {
          
        //     console.error(error);
        
        //     })

        // },

        
        filterResults(){
            console.log('filter');

            const url = `${state.base_api_url}&archetype=${this.selectedArchetype}`

            state.getCharacters(url)

            // axios                                    //inserito method getCharacters
            // .get(url)
            // .then((response) => {

            //     // console.log(this.characters);
            //     console.log(response.data.data[0].card_images[0].image_url);

            //     state.characters = response.data.data

            //     state.loading = false

            // })

            // .catch((error) => {
          
            // console.error(error);
        
            // })

            console.log(url);

        },

        getArchetypesList(url){

            axios
            .get(url)
            .then((response) => {

                console.log(response);

                this.archetypes = response.data
            })
            .catch((error) => {
        
            console.error(error);

            })

        },


    },

    
    mounted(){

        // All archetypes
        this.getArchetypesList('https://db.ygoprodeck.com/api/v7/archetypes.php')

        


        // Inseriamo il setTimeout per far ritardare di qualche secondo la chiamata
        setTimeout(() => {

            // All cards
            state.getCharacters(state.base_api_url)

            // axios
            // .get(this.base_api_url)
            // .then((response) => {

            //     console.log(this.characters);
            //     console.log(response.data.data[0].card_images[0].image_url);

            //     this.characters = response.data.data

            //     this.loading = false

            // })

        }, 1000)
        
    },


    computed:{

        getResults(){

            return state.characters ? state.characters.length : 'Nessun risultato'

        }

    },

}

</script>


<template>

    <main>
        <div class="container">

            <div class="filter">

                <select name="archetype" id="archetype" v-model="selectedArchetype" @change="filterResults">

                    <option value="all" selected>All</option>

                    <option :value="archetype.archetype_name" v-for="archetype in archetypes">

                        {{ archetype.archetype_name }}

                    </option>
                    
                </select>

            </div>

            <div class="card_found">

                <div class="card_found_total">FOUND {{getResults}} CARDS</div>

                <!-- Inseriamo un loading -->
                <div class="row" v-if="!state.loading">
    
                    <CharacterCard 
                        v-for="character in state.characters" 
                        :key="character.id + '_character'"
                        :character="character">
                    </CharacterCard>

                    <!-- <div class="col" v-for="character in characters">           //spostato in CharacterCard
    
                        <div class="card">
                            <img :src="character.card_images[0].image_url" alt="">
                            <div class="name">{{ character.name }}</div>
                            <div class="archetype">{{ character.archetype }}</div>
                        </div>
    
                    </div> -->
    
                </div>

                <!-- Inseriamo un loading                          //spostato in LoadingIcon -->
                <!-- <div>

                    Loading...
                    <i class="fa-solid fa-spinner fa-spin"></i>

                </div> -->

                <LoadingIcon v-else></LoadingIcon>

            </div>


        </div>

    </main>


</template>


<style scoped>

.container{
    background-color: white;
}

.filter{
    background-color: #d48f38;
}

select{
    margin: 1rem;
    font-size: 20px;
}

.card_found{
    margin: 3rem;
}

.card_found_total{
    color: white;
    background-color: black;
    padding: 1rem;
}

</style>
