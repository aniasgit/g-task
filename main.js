const audioPlayer = document.querySelector("#audioPlayer");
const audioInput = document.querySelector("#audioInput");
const gridContainer = document.querySelector(".grid-container");

const createGrid = () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${i}_${j}`);
      cell.classList.add("cell");
      gridContainer.appendChild(cell);
    }
  }
};

const initializeEqualizer = () => {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();

  //To be continued...
};

const getFile = (event) => {
  const file = event.target.files[0];

  if (file) {
    const fileURL = URL.createObjectURL(file);
    audioPlayer.src = fileURL;
    initializeEqualizer();
  } else {
    audioPlayer.src = "";
  }
};

createGrid();

audioInput.addEventListener("change", (event) => getFile(event));
