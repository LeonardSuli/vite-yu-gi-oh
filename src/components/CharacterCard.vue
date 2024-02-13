<script>
export default{
    name: 'CharacterCard',
    props: {
        character: Object
    }
}
</script>


<template>

    <div class="col">
    
        <div class="card">
            <img :src="character.card_images[0].image_url" alt="">
            <div class="name">{{ character.name }}</div>
            <div class="archetype">{{ character.archetype }}</div>
        </div>

    </div>

</template>


<style scoped>

.col{
    width: calc(100% / 5);
}

.card{
    text-align: center;
    background-color: #d48f38;
}

.card img{
    width: 100%;
}

.name{
    color: white;
    padding: 1rem;
    text-transform: uppercase;
}


</style>