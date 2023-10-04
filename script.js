async function getPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const { results } = await response.json();

  return results;
}

async function getPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  console.log(data);

  return data;
}

async function handleClickPokemon(name) {
  const pokemonElement = document.getElementById("container-pokemon");
  const pokemon = await getPokemon(name);
  let imagesHtml = "";
  Object.values(pokemon.sprites).forEach((image) => {
    if (typeof image === "string")
      imagesHtml += `<img class="image" src='${image}' />`;
  });
  const pokemonHtml = `
    <div class="container-info">
      <span class="title">${name}</span>
      <span class="info">O pokemon ${name} possui uma altura de ${
    pokemon.height / 10
  }m, podendo chegar até 
      ${pokemon.weight / 10}kg, possuindo um HP base de ${
    pokemon.stats[0].base_stat
  } pontos.
      Possui um total de ${pokemon.moves.length} movimentos e aparece em 
      ${pokemon.game_indices.length} jogos da franquia.</span>
      <div class="container-images">
        ${imagesHtml}
      </div>
    </div>
  `;

  pokemonElement.innerHTML = pokemonHtml;
}

async function renderPokemons() {
  const pokemons = await getPokemons();
  const containerElement = document.getElementById("container-pokemons");
  let pokemonsHtml = "";

  pokemons.forEach(({ name }) => {
    pokemonsHtml += `<button onclick="handleClickPokemon('${name}')" class='container-pokemon'>${name}</div>`;
  });

  containerElement.innerHTML = pokemonsHtml;
}

renderPokemons();
