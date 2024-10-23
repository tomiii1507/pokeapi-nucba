const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const formulario = document.getElementById("pokemonForm");
const pokemonSection = document.getElementById("pokemonSection");
const MyInput = document.getElementById("pokemonId");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valorInput = MyInput.value;

  try {
    if (!valorInput || valorInput <= 0) {
      throw new Error("Por favor ingresa un ID válido.");
    }

    let url = `${baseURL}${valorInput}`;
    let pokemon = await request(url);

    pokemonSection.innerHTML = "";

    pokemonSection.innerHTML = `
            <h2>${pokemon.name.toUpperCase()}</h2>
            <picture>
                <img src="${pokemon.sprites.front_default}" alt="Imagen de ${
      pokemon.name
    }" />
            </picture>
            <p>Stats: ${pokemon.stats
              .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
              .join(", ")}</p>
        `;
  } catch (error) {
    console.log(error);
    pokemonSection.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se encontró el Pokémon");
  return await response.json();
}
