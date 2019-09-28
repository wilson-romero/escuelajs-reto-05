const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";

const getData = async api => {
  let next_fetch = window.localStorage.getItem("next_fetch");
  if (!next_fetch) next_fetch = api;
  try {
    let response = await fetch(next_fetch);
    response = await response.json();
    window.localStorage.setItem("next_fetch", `${response.info.next}`);
    if (response.info.next != "") {
      const characters = response.results;
      var output = characters
        .map(character => {
          return `
          <article class="Card">
            <img src="${character.image}" />
            <h2>${character.name}<span>${character.species}</span></h2>
          </article>
        `;
        })
        .join("");
    } else {
      intersectionObserver.disconnect();
      var output = `
      <div id="end-data">
        <span>Ya no hay personajes...<span>
      </div>
      `;
    }
    var newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

window.localStorage.clear();
intersectionObserver.observe($observe);
