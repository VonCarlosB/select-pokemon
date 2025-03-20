const selector = document.getElementById('pokemon-select')

document.getElementById('get-pokemon').addEventListener('click', () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selector.value}`).then(
        (response) =>{
            if(!response.ok){
                console.error('Ha habido un problema con la obtención de datos')
            }
            return response.json()
    }).then((data) =>{
        let display = document.getElementById('display')
        display.style.display = 'block'
        display.innerHTML = `
        <div class="section">
            <div class="info">
                <h3>Name: ${data.name}</h3>
                <p><b>Pokedex-Index</b>: ${data.order}</p>
                <p><b>Type</b>: ${data.types[0].type.name}</p>
                <p><b>Height</b>: ${data.height} inch</p>
                <p><b>Weight</b>: ${data.weight} pound</p>
            </div>
            ${showImage(data.sprites.other["official-artwork"].front_default)}
            ${showImage(data.sprites.other["official-artwork"].front_shiny)}
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

function showImage(image) {
    if(image != null){
        return `<img src="${image}" height=200 class="border">`
    }else{
        return `<img style="display:none;">`
    }
}

selector.innerHTML = ''
fetchOptions('https://pokeapi.co/api/v2/pokemon')

function fetchOptions(url) {
    fetch(url).then((response) => {
        if(!response.ok){
            console.error('Ha habido un problema con la obtención de la lista de pokemon')
        }
        return response.json()
    }).then((data) => {
        console.log(data)
        selector.innerHTML += `
            ${createOptions(data)}
        `
    }).catch((error) => {
        console.error(error)
    })
}


function createOptions(data){
    let ans = ''
    let results = data.results
    for (const option of results) {
        ans += `<option value="${option.name}">${option.name}</option>`
    }
    if(data.next != null){
        fetchOptions(data.next)
    }
    return ans
}