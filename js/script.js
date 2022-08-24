const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonimage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonprev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchpokemon = 1

async function fetchpokemon(pokemon) {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status === 200){
    const data = await APIresponse.json();
    return data;
    }
}
const renderpokemon = async (pokemon) =>{
    
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchpokemon(pokemon);

    if(data){
    pokemonimage.style.display = 'block'   
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonimage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchpokemon = data.id;
    } else {
        pokemonimage.style.display = 'none'
        pokemonName.innerHTML ='not found :/';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (Event) => {
    Event.preventDefault();
    renderpokemon(input.value.toLowerCase());
});

buttonprev.addEventListener('click', () => {
    if (searchpokemon > 1) {
    searchpokemon -= 1
    renderpokemon(searchpokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchpokemon += 1
    renderpokemon(searchpokemon)
});

renderpokemon(searchpokemon)