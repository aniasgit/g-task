const audioPlayer = document.querySelector("#audioPlayer");
const audioInput = document.querySelector("#audioInput");
const gridContainer = document.querySelector(".grid-container");

let audioCtx, analyser, source;

const createGrid = () => {
  for (let i = 0; i < 8; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", j);
      cell.classList.add("cell");
      column.appendChild(cell);
    }

    gridContainer.appendChild(column);
  }
};

const initializeEqualizer = () => {
  if (audioCtx == undefined) {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const columns = gridContainer.querySelectorAll(".column");
  let columnCells = [];
  columns.forEach((column) =>
    columnCells.push(column.querySelectorAll(".cell"))
  );

  const draw = () => {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);
    let barHeight = 0;

    for (i = 0; i < bufferLength; i++) {
      barHeight += dataArray[i] / 32;
      if (i % 128 === 127) {
        barHeight = Math.round(barHeight / 128);
        columnCells[Math.floor(i / 128)].forEach((cell) => {
          if (barHeight > +cell.id) {
            cell.classList.add("fill");
          } else {
            cell.classList.remove("fill");
          }
        });
        barHeight = 0;
      }
    }
  };

  draw();
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
