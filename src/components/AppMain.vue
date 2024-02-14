<script>

import axios from 'axios';

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
    //   base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
      base_api_url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0',
      characters: [], //o null, o [], o '';
      loading: true,

    }
  },
  computed:{

    getResults(){

      return this.characters ? this.characters.length : 'Nessun risultato'

    }

  },
  mounted(){

    // Inseriamo il setTimeout per far ritardare di qualche secondo la chiamata
    setTimeout(() => {

        axios
        .get(this.base_api_url)
        .then((response) => {

            console.log(this.characters);
            console.log(response.data.data[0].card_images[0].image_url);

            this.characters = response.data.data

            this.loading = false

        })

    }, 3000)
    
  }
}
</script>


<template>

    <main>
        <div class="container">

            <div class="filter">
                <select name="" id="">
                    <option value="alien">Alien</option>
                    <option value="alien">Alien</option>
                    <option value="alien">Alien</option>
                    <option value="alien">Alien</option>
                </select>
            </div>

            <div class="card_found">

                <div class="card_found_total">FOUND {{getResults}} CARDS</div>

                <!-- Inseriamo un loading -->
                <div class="row" v-if="!loading">
    
                    <CharacterCard 
                        v-for="character in characters" 
                        :key="character.id + '_character'"
                        :character="character">
                    </CharacterCard>

                    <!-- <div class="col" v-for="character in characters">
    
                        <div class="card">
                            <img :src="character.card_images[0].image_url" alt="">
                            <div class="name">{{ character.name }}</div>
                            <div class="archetype">{{ character.archetype }}</div>
                        </div>
    
                    </div> -->
    
                </div>

                <!-- Inseriamo un loading -->
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
