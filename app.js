var canvas = document.getElementById('drawingcanvas');
var ctx = canvas.getContext('2d');
var pos = { x: 0, y: 0 };
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);

canvas.addEventListener('touchmove', drawMobile);
canvas.addEventListener('touchdown', setPosition);
canvas.addEventListener('touchstart', setPosition);

function setPosition(e) {
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  pos.x = e.clientX - canvas.offsetLeft + scrollLeft;
  pos.y = e.clientY - canvas.offsetTop + scrollTop;
}

function setPositionMobile(e) {
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  pos.x = e.touches[0].clientX - canvas.offsetLeft + scrollLeft;
  pos.y = e.touches[0].clientY - canvas.offsetTop + scrollTop;
}


function draw(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.buttons !== 1) return;

  ctx.beginPath();

  ctx.lineWidth = document.getElementById("drawingSize").value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById("colorpicker").value;

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();

}
function drawMobile(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.buttons !== 1) return;

  ctx.beginPath();

  ctx.lineWidth = document.getElementById("drawingSize").value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById("colorpicker").value;

  ctx.moveTo(pos.x, pos.y);
  setPositionMobile(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();

}