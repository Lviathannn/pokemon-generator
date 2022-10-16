const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const typeColor = {
   bug: "#26de81",
   dragon: "#ffeaa7",
   electric: "#fed330",
   fairy: "#FF0069",
   fighting: "#30336b",
   fire: "#f0932b",
   flying: "#81ecec",
   grass: "#00b894",
   ground: "#EFB549",
   ghost: "#a55eea",
   ice: "#74b9ff",
   normal: "#95afc0",
   poison: "#6c5ce7",
   psychic: "#a29bfe",
   rock: "#2d3436",
   water: "#0190FF",
};

let getPokeData = () => {
   let id = Math.floor(Math.random() * 150) + 1;
   const finalUrl = `${url + id}`;
   fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => generatePokemon(data));
};
// Generate Card

function generatePokemon(data) {
   const pokeName = data.name;
   const pokeHp = data.stats[0].base_stat;
   const pokeAttack = data.stats[1].base_stat;
   const pokeDefense = data.stats[2].base_stat;
   const pokeSpeed = data.stats[5].base_stat;
   const pokeIMG = data.sprites.other.dream_world.front_default;
   const pokeType = data.types;

   const themeColor = typeColor[data.types[0].type.name];
   const newCard = generateCard(
      pokeName,
      pokeAttack,
      pokeDefense,
      pokeHp,
      pokeSpeed,
      pokeIMG
   );
   card.innerHTML = newCard;
   appendTypes(pokeType);
   styleCard(themeColor);
}

function appendTypes(pokeTypes) {
   const types = document.querySelector(".types");
   pokeTypes.forEach((type) => {
      const span = document.createElement("span");
      span.innerHTML = type.type.name;
      types.appendChild(span);
   });
}
function styleCard(theme) {
   const types = document.querySelectorAll(".types span");
   card.style.background = `radial-gradient(circle at 50% 0%, ${theme} 36%, #ffffff 36%)`;
   btn.style.backgroundColor = theme;
   types.forEach((type) => {
      type.style.backgroundColor = theme;
   });
}

function generateCard(name, attack, defense, hp, speed, img, types) {
   return `
                  <p class="hp">
                  <span>HP</span>
                  ${hp}
                  </p>
                  <img src="${img}" alt="" />
                  <h2 class="poke-name">${name}</h2>
                  <div class="types">
                  </div>
                  <div class="stat">
                  <div>
                        <h3>${attack}</h3>
                        <p>Attack</p>
                  </div>
                  <div>
                        <h3>${defense}</h3>
                        <p>Deffense</p>
                  </div>
                  <div>
                        <h3>${speed}</h3>
                        <p>Speed</p>
                  </div>
                  </div>
            `;
}

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
