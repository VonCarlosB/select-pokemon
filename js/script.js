const btnInfo = document.getElementById('get-pokemon')

btnInfo.addEventListener('click', () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${document.getElementById('pokemon-select').value}`).then(
        (response) =>{
            if(!response.ok){
                console.error('Ha habido un problema con la obtención de datos')
            }
            return response.json()
    }).then((data) =>{
        console.log(data)
        document.getElementById('display').innerHTML = `
        <div class="section">
            <div class="info">
                <h3>Name: ${data.name}</h3>
                <p><b>Pokedex-Index</b>: ${data.order}</p>
                <p><b>Type</b>: ${data.types[0].type.name}</p>
                <p><b>Height</b>: ${data.height} inch</p>
                <p><b>Weight</b>: ${data.weight} pound</p>
            </div>
            <img src="${data.sprites.other["official-artwork"].front_default}" height=200 class="border">
            <img src="${data.sprites.other["official-artwork"].front_shiny}" height=200 class="border">
        </div>
        <div class="tables">
            <div class="stats">
                <h4>Stats: </h4>
                <div class="table">
                    ${showStats(data.stats)}
                </div>
            </div>
            <div class="stats">
                <h4>Moves: </h4>
                <div class="table">
                    ${showMoves(data.moves)}
                </div>
            </div>
        </div>
        `
    }).catch((error) => {
        console.error(error)
    })
})

function showStats(stats) {
    let ans = ''
    for (const stat of stats) {
        ans += `<p><b>${stat.stat.name}</b>: ${stat.base_stat}</p>`
    }
    return ans
}

function showMoves(moves) {
    let ans = ''
    for (const move of moves) {
        ans += `<p>${move.move.name}</p>`
    }
    return ans
}