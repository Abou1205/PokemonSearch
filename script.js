const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const btnSearch = document.querySelector(".btnSearch");
const searchInput = document.querySelector(".searchInput");

const pokemonNumber = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

btnSearch.addEventListener("click", () => {
  search.classList.toggle("active");
});


searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const pokeCards = document.querySelectorAll('.pokemon');

  pokeCards.forEach((pokemonCard) => {
    const nameElement = pokemonCard.querySelector('.poke-name');
    const idElement = pokemonCard.querySelector('.poke-id');

    const nameMatch = nameElement.innerHTML.toLowerCase().includes(searchValue);
    const idMatch = idElement.innerHTML.includes(searchValue);

    if (nameMatch || idMatch) {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
});



const fetchPokemons = async () => {
  for (let i = 1; i < pokemonNumber; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const { id, name, base_experience, weight, types } = pokemon;

  const pokemonId = id.toString().padStart(3, "0");

  const pokemonType = types[0].type.name;

  const pokemonBg = bg_color[pokemonType];

  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  const pokemonInnerHTML = `
    <div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="">
            </div>
            <div class="poke-info">
                <span class="poke-id">${pokemonId}</span>
                <h3 class="poke-name">${name}</h3>
                <div class="small">
                    <small class="poke-exp">
                        <i class="fa-solid fa-flask"> <span>${base_experience} Exp</span></i>
                    </small>
                    <small class="poke-weight">
                        <i class="fa-solid fa-weight-scale"> <span>${weight} Kg</span></i>
                    </small>
                </div>
                <div class="poke-type">
                    <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
                </div>
            </div>
    `;

  pokemonDiv.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();
