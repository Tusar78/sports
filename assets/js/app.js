// // Base Sports-DB URL
// const BASE_URL = "https://www.thesportsdb.com/api/v1/json/2";

// // Make a function call searchPlayer
// const searchPlayer = async () => {
//   const searchInput = document.getElementById("search-box");
//   const playerName = searchInput.value;

//   // Clear player container
//   const playerContainer = document.getElementById("player-container");
//   playerContainer.textContent = "";

//   // Get Error Id
//   const errorMsg = document.getElementById("error");

//   // Check Validation
//   if (playerName == "") {
//     errorMsg.style.display = "block";
//   } else {
//     const response = await fetch(
//       `${BASE_URL}/searchplayers.php?p=${playerName}`
//     );
//     const data = await response.json();
//     showPlayer(data.player);
//   }
//   // Clear input filled
//   searchInput.value = "";
// };

// const showPlayer = (players) => {
//   const playerContainer = document.getElementById("player-container");
//   const errorMsg = document.getElementById("error");
//   errorMsg.style.display = "none";

//   players.forEach((player) => {
//     const div = document.createElement("div");
//     div.classList.add("card");
//     div.innerHTML = `
//       <img
//         src="${(player.strThumb) ? (player.strThumb) : './assets/images/demo.png'}"
//         class="card-img-top"
//         alt="${player.strPlayer}"
//       />
//       <div class="card-body">
//         <h5 class="card-title">Name: ${player.strPlayer}</h5>
//         <p class="card-text">Country: ${player.strNationality}</p>
//         <a href="#" class="btn btn-danger mb-2">Delete</a>
//         <a href="#" class="btn btn-primary mb-2">Details</a>
//       </div>
//     `;
//     playerContainer.appendChild(div);
//   });
// };

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

  // When input box empty
  if (playerName === "") {
    errorMsgStyle("block");
    presentStyle("flex");
  } else {
    // Fetch API
    const response = await fetch(
      `${BASE_URL}/searchplayers.php?p=${playerName}`
    );
    const data = await response.json();

    // If data is null
    if (data.player === null) {
      errorMsgStyle("block");
      presentStyle("flex");
    } else {
      // When I click on the search button, the present section will be hidden.
      const presentSection = document.getElementById("present");
      presentSection.style.display = "none";
      errorMsgStyle("none");
      displayPlayer(data.player);
    }
  }

  // Clear input filled
  searchPlayer.value = "";
};

// Make a function called displayPlayer
const displayPlayer = (players) => {
  const cardContainer = document.getElementById("card-container");

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
          ? (player?.strDescriptionEN).slice(0, 100)
          : 'No description available here <i class="bx bx-sad"></i> '
      }</p>
      <div class="btn-container">
        <button type="button" class="card__btn">Read More</button>
      </div>
    `;
    cardContainer.appendChild(div);
  });
};

// Search By enter key
const searchBox = document.getElementById("search-player");
const searchBtn = document.getElementById("search-btn");
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
