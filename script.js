
const options = [
  "Asado", "Empanadas", "Milanesa", "Locro", "Choripán", "Provoleta"
];

const colors = [
  "#ff0000", "#ff8000", "#ffff00", "#006400", "#0000ff", "#8a2be2"
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");
const turnsDiv = document.getElementById("turns");
let turn = 0;
let spinning = false;
const size = canvas.width;
const radius = size / 2;
const slices = options.length;
const anglePerSlice = 360 / slices;
let currentRotation = 0;

function drawWheel() {
  for (let i = 0; i < slices; i++) {
    const startAngle = (i * anglePerSlice) * Math.PI / 180;
    const endAngle = ((i + 1) * anglePerSlice) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(
      radius + radius * Math.cos(startAngle),
      radius + radius * Math.sin(startAngle)
    );
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(startAngle + (endAngle - startAngle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(options[i], radius - 12, 5);
    ctx.restore();
  }
}

drawWheel();

function spin() {
  if (spinning) return;
  spinning = true;
  result.textContent = "";

  const extraDegrees = Math.floor(Math.random() * 360);
  const fullRotations = 5 + Math.floor(Math.random() * 3);
  const degrees = 360 * fullRotations + extraDegrees;

  canvas.classList.add("spin");
  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${currentRotation + degrees}deg)`;

  setTimeout(() => {
    const finalDegrees = (currentRotation + degrees) % 360;

    // Desplazamos el resultado 2 posiciones a la izquierda (corrige 2 casilleros a la derecha)
    const correctedDegrees = (360 - finalDegrees + anglePerSlice / 2 + 4 * anglePerSlice) % 360;
    const index = Math.floor(correctedDegrees / anglePerSlice);
    const comida = options[index];

    result.textContent = `Cupón válido por: ${comida}`;
    turn++;
    turnsDiv.textContent = `Turnos: ${turn}`;
    spinning = false;
    currentRotation += degrees;
  }, 4000);
}
