// Base Sports-DB URL
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/2";

// When I will click the home button, then the website reloaded.
const reload = () => {
  return location.reload();
};

// Make a function called presentStyle
const presentStyle = (displayStyle) => {
  document.getElementById("present").style.display = displayStyle;
};

// Make a function called spinnerStyle
const spinnerStyle = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// Make a function called errorMsgStyle
const errorMsgStyle = (displayStyle) => {
  document.getElementById("error-msg").style.display = displayStyle;
};

// Make a function called searchPlayer
const searchPlayer = async () => {
  // Clear Card container content
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  // Take player name from user
  const searchPlayer = document.getElementById("search-player");
  const playerName = searchPlayer.value;

  // Clear input filled
  searchPlayer.value = "";

  // When input box empty
  if (playerName === "") {
    errorMsgStyle("block");
    presentStyle("flex");
  } else {
    spinnerStyle("grid");
    // Fetch API
    const response = await fetch(
      `${BASE_URL}/searchplayers.php?p=${playerName}`
    );
    const data = await response.json();

    // If data is null
    if (data.player === null) {
      spinnerStyle("none");
      errorMsgStyle("block");
      presentStyle("flex");
    } else {
      presentStyle("none");
      errorMsgStyle("none");
      displayPlayer(data.player);
    }
  }
};

// Make a function called displayPlayer
const displayPlayer = (players) => {
  spinnerStyle("none");
  const cardContainer = document.getElementById("card-container");
  cardContainer.style.display = 'flex';

  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("custom-card");
    div.innerHTML = `
      <img
      src="${player.strThumb ? player.strThumb : "./assets/images/demo.png"}"
      alt="Player image"
      class="card__img"
      />
      <h3 class="card__title">${player.strPlayer}</h3>
      <p class="card__desc">${
        player.strDescriptionEN
          ? (player?.strDescriptionEN).slice(0, 90)
          : 'No description available here <i class="bx bx-sad"></i> '
      }</p>
      <div class="btn-container">
        <button type="button" class="card__btn" onclick="detailsId(${
          player.idPlayer
        })">Read More</button>
      </div>
    `;
    cardContainer.appendChild(div);
  });
};

// Make a async function called detailsID
const detailsId = async (id) => {
  spinnerStyle("grid");
  const response = await fetch(`${BASE_URL}/lookupplayer.php?id=${id}`);
  const data = await response.json();
  detailsPlayer(data.players[0]);
};

// Make a function called detailsPlayer
const detailsPlayer = (player) => {
  spinnerStyle("none");
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = ''
  cardContainer.style.display = 'block'

  const div = document.createElement("div");
  div.classList.add("player-details");
  div.innerHTML = `
    <div class="details__images">
      <img
        class="details__parentImg"
        src="${(player.strFanart1) ? (player.strFanart1) : (player.strGender === 'Male') ? './assets/images/male-team.jpg' : './assets/images/female-team.jpg'}"
        alt="team img"
      />
      <img
        src="${
          player.strRender
            ? player.strRender
            : player.strThumb
            ? player.strThumb
            : "./assets/images/demo.png"
        }"
        alt="Player img"
        class="details__img"
      />
    </div>
    <div class="title-subtitle">
      <h2>${player.strPlayer}</h2>
      <h5>${player.strNationality ? player.strNationality : "No idea!"}</h5>
    </div>
    <div class="details__born">
      <p><span>Born: </span>${
        player.dateBorn ? player.dateBorn : "No idea!"
      }</p>
      <p><span>Birth Location: </span>${
        player.strBirthLocation ? player.strBirthLocation : "No idea!"
      }</p>
    </div>
    <p class="details__desc">
    ${
      player.strDescriptionEN
        ? player.strDescriptionEN.slice(0, 500)
        : "No description available!"
    }
    </p>
  `;
  cardContainer.appendChild(div);
};

// Search By enter key
const searchBox = document.getElementById("search-player");
const searchBtn = document.getElementById("search-btn");
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
