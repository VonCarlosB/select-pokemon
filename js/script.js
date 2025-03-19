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
        <img src="${data.sprites.other["official-artwork"].front_default}" height=200>
        <div class="info">
            <h3>Name: ${data.name}</h3>
            <p>Pokedex-Index: ${data.order}</p>
            <p>Type: ${data.types[0].type.name}</p>
            <p>Height: ${data.height} inch</p>
            <p>Weight: ${data.weight} pound</p>
        </div>
        <div class="stats">
            <h4>Stats: </h4>
            ${showStats(data.stats)}
        </div>
        <div class="moves">
            <h4>Moves: </h4>
            ${showMoves(data.moves)}
        </div>
        <p></p>
        <!--${elements(data)}-->
        `
    }).catch((error) => {
        console.error(error)
    })
})

function elements(data) {
    let ans = ''
    for(const [key, value] of (Object.entries(data))) {
        ans += `<p>${key}: ${value}</p>`
    }
    return ans
}

function showStats(stats) {
    let ans = ''
    for (const stat of stats) {
        ans += `<p>${stat.stat.name}: ${stat.base_stat}</p>`
    }
    return ans
}

function showMoves(moves) {
    let ans = ''
    for (const move of moves) {
        ans += `<p class="move">${move.move.name}</p>`
    }
    return ans
}