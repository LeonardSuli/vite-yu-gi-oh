import {reactive} from 'vue';

import axios from 'axios';

export const state = reactive({

    // base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
    base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=100&offset=0',
    characters: [],       //o null, o [], o '';
    loading: true,
    archetypes: [],
    selectedArchetype: '',







    getCharacters(url){


        //All cards
        axios
        .get(url)
        .then((response) => {

            console.log(this.characters);
            console.log(response.data.data[0].card_images[0].image_url);

            this.characters = response.data.data

            this.loading = false

        })

        .catch((error) => {
      
        console.error(error);
    
        })

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

})