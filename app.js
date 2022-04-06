let allPokemon = [];
let tableauFin = [];

let notVar = [];

const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');


const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271',
    electric: '#F7D02C',
    fairy: '#D685AD',
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};
// const types = ['#78c850', '#E2BF65', '#6F35FC', '#F58271', '#F58271', '#F7D02C', '#D685AD', '#966DA3', '#B3F594',
// '#6390F0', '#D9D5D8', '#F95587', '#A98FF3', '#C25956', '#B6A136', '#735797', '#96D9D6'
// ]


function notreApi() {
    console.log("Notre api clicked! ");
    fetch("http://localhost:3333/api/pokemon/all")

        .then(reponse => reponse.json())
        .then((allPoke) => {
            notVar = allPoke;
            console.log("---------------------------")
            console.log("Notre var est : ")
            console.log(notVar);

            notVar.forEach((pokemon) => {
                fetchPokemonBase(pokemon.number);
            });

        })

}



function fetchPokemonBase(id) {

    console.log("FetchPokemonBase")
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(reponse => reponse.json())
        .then((allPoke) => {
             console.log(allPoke.forms[0]);
             fetchPokemonComplet(allPoke.forms[0]);
            // allPoke.results.forEach((pokemon) => {
            //     fetchPokemonComplet(allPoke.forms[0]);
            // })

        })


}
// function fetchPokemonBase() {

//     fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
//         .then(reponse => reponse.json())
//         .then((allPoke) => {
//             console.log(allPoke);
//             allPoke.results.forEach((pokemon) => {
//                 fetchPokemonComplet(pokemon);
//             })

//         })
//  }

//notre api

// function notreApi() {
//     console.log("Notre api clicked! ");
//     fetch("http://localhost:3333/api/pokemon/all")

//         .then(reponse => reponse.json())
//         .then((allPoke) => {
//             notVar = allPoke;
//             console.log("---------------------------")
//             console.log("Notre var est : ")
//             console.log(notVar);
//             createCard(notVar);
//                 notVar.forEach((pokemon) => {
//                     console.log(pokemon);
//                 });

//         })

// }



// function  testApiFrançais(){
//     console.log("Api français res ")
//     fetch(`https://pokeapi.co/api/v2/pokemon/1`)
//                 .then(reponse => reponse.json())
//                 .then((pokeData) => {
//                  console.log(pokeData);
//                 })
// }

//testApiFrançais();

notreApi();

//fetchPokemonBase(25);
//fetchPokemonBase()
function fetchPokemonComplet(pokemon) {

    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            // console.log(pokeData);

            objPokemonFull.pic = pokeData.sprites.front_default;
            objPokemonFull.type = pokeData.types[0].type.name;
            objPokemonFull.id = pokeData.id;


            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    // console.log(pokeData);

                    objPokemonFull.name = pokeData.names[4].name;
                    allPokemon.push(objPokemonFull);

                    if (allPokemon.length === 151) {
                        // console.log(allPokemon);

                        tableauFin = allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        }).slice(0, 21);
                        // console.log(tableauFin);

                        createCard(tableauFin);
                        chargement.style.display = "none";
                    }

                })

        })

}





function notreTruc() {


}


// Création des cartes

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createCard(arr) {

    for (let i = 0; i < arr.length; i++) {

        const carte = document.createElement('li');
        let couleur = types[arr[i].type];
        //let couleur = types[getRandomInt(17)];
        //console.log("The coulor is : " + couleur )

        carte.style.background = couleur;
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);

    }

}

// Scroll Infini

window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // scrollTop = scroll depuis le top
    // scrollHeight = scroll total
    // clientHeight = hauteur de la fenêtre, partie visible.

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }

})

let index = 21;

function addPoke(nb) {
    if (index > 151) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    console.log(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Recherche 

// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
//     e.preventDefault();
//     recherche();
// })

searchInput.addEventListener('keyup', recherche);

function recherche() {

    if (index < 151) {
        addPoke(130);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');


    for (i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }

    }

}








// Animation Input

searchInput.addEventListener('input', function (e) {

    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})


