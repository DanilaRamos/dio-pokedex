const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemom()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  
    return pokemon 
    
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    //O MESMO CÓDIGO ESCRITO DE MAREIRA SIMPLIFICADA:
    .then((response) => response.json()) //método para tranformar ReadableStream em OBJETO/JSON
    .then((jsonBody) => jsonBody.results) //manda a reposta com a nova lista JSON - filtra apenas o results da API
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //novas requisições de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) //transformando a nova lista em JSON
    .then((pokemonsDetail) => pokemonsDetail)
}