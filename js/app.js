

/**
 * It toggles the class 'show' on the nav-bar element, the class 'bx-x' on the header-toggle element,
 * the class 'body-pd' on the body-pd element, and the class 'body-pd' on the header element.
 * @param toggle - the id of the toggle button
 * @param navId - The id of the navbar
 * @param bodyId - The id of the body element.
 * @param headerId - The id of the header element.
 */
const toggleId = document.querySelector('#header-toggle');
const navBar = document.querySelector('#nav-bar');
const bodyPd = document.querySelector('#body-pd');
const headerPD = document.querySelector('#header');
function showNavBar(toggle, navId, bodyId, headerId) {
    if (toggle && navId && bodyId && headerId) {
        toggleId.addEventListener('click', () => {
            //SHOW NAVBAR
            navBar.classList.toggle('show');
            //CHANGE ICON
            toggleId.classList.toggle('bx-x');
            //ADD PADDING TO BODY
            bodyPd.classList.toggle('body-pd');
            //ADD PADDING TO HEADER
            headerPD.classList.toggle('body-pd');
        })
    }
}
showNavBar('header-toggle', 'nav-bar', 'body-pd', 'header');
/* ====== LINK ACTIVE ===== */
/**
 * If there is a linkActive, remove the class 'active' from each linkActive, then add the class
 * 'active' to the link that was clicked.
 */
const linkActive = document.querySelectorAll('.nav__link');

function colorLink() {
    if (linkActive) {
        linkActive.forEach(active => active.classList.remove('active'))
        this.classList.add('active');
    }
}
linkActive.forEach(active => active.addEventListener('click', colorLink));

/**
 * If the window is scrolled down 50px, add the class 'scroll-header' to the header element. If the
 * window is scrolled up 50px, remove the class 'scroll-header' from the header element.
 */
const header = document.querySelector('header');
/** ----SCROLL HEADER -----*/
function scrollHeader() {
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header')
    }
}
window.addEventListener('scroll', scrollHeader);


/*===== consumir appi ===== */

const pokemonContainer = document.querySelector('.card__container');
const previus = document.querySelector('#previus')
const next = document.querySelector('#next');
let offset = 1;
let limit = 11

previus.addEventListener('click', (e) => {
    e.preventDefault();
    if (offset != 1) {
        offset -= 12;
        removeChild(pokemonContainer);
        fetchPokemons(offset, limit);
    }
})
next.addEventListener('click', (e) => {
    e.preventDefault();
    offset += 12;
    removeChild(pokemonContainer);
    fetchPokemons(offset, limit);
})
function fetchApi(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((resp) => resp.json())
        .then((data) => { cardPokemon(data) })
}
function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchApi(i);
    }
}
fetchPokemons(151);

function cardPokemon(pokemon) {
    const cardBox = document.createElement('div');
    cardBox.classList.add('card__box');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');
    // const enlace = document.createElement('a');
    // enlace.classList.add('button');
    // enlace.innerHTML = 'Ver más';
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    cardImg.appendChild(img);

    const number = document.createElement('p');

    number.innerHTML =
        `<p class = "card__number">Número:
    <span class = "card-poks">#${pokemon.id.toString().padStart(3, '0')}</span>
    </p>`;

    const name = document.createElement('p');

    name.innerHTML = `<p class="card__title">Nombre: <span class="card-poks"> ${pokemon.name}
    </span></p>`;
    const description = document.createElement('p');
    description.innerHTML = `<p class="card__description">Descripción: <span class="card-poks">${pokemon.types[0].type.name}</span></p>`;

    // cardBox.appendChild(enlace);
    cardBox.appendChild(cardBody);
    cardBody.appendChild(cardImg);
    cardBody.appendChild(cardInfo);
    cardInfo.appendChild(number);
    cardInfo.appendChild(name);
    cardInfo.appendChild(description);

    pokemonContainer.appendChild(cardBox);
}
function removeChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
fetchPokemons(offset, limit);

