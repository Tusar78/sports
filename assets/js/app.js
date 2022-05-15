// Base Sports-DB URL
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/2";

// Make a function call searchPlayer
const searchPlayer = async () => {
  const searchInput = document.getElementById("search-box");
  const playerName = searchInput.value;

  // Clear player container
  const playerContainer = document.getElementById("player-container");
  playerContainer.textContent = "";

  // Get Error Id
  const errorMsg = document.getElementById("error");

  // Check Validation
  if (playerName == "") {
    errorMsg.style.display = "block";
  } else {
    const response = await fetch(
      `${BASE_URL}/searchplayers.php?p=${playerName}`
    );
    const data = await response.json();
    showPlayer(data.player);
  }
  // Clear input filled
  searchInput.value = "";
};

const showPlayer = (players) => {
  const playerContainer = document.getElementById("player-container");
  const errorMsg = document.getElementById("error");
  errorMsg.style.display = "none";

  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img
        src="${(player.strThumb) ? (player.strThumb) : './assets/images/demo.png'}"
        class="card-img-top"
        alt="${player.strPlayer}"
      />
      <div class="card-body">
        <h5 class="card-title">Name: ${player.strPlayer}</h5>
        <p class="card-text">Country: ${player.strNationality}</p>
        <a href="#" class="btn btn-danger mb-2">Delete</a>
        <a href="#" class="btn btn-primary mb-2">Details</a>
      </div>
    `;
    playerContainer.appendChild(div);
  });
};
