var canvas = document.getElementById('drawingcanvas');
var ctx = canvas.getContext('2d');
var pos = { x: 0, y: 0 };
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setPosition(e) {
  pos.x = e.clientX- canvas.offsetLeft;
  pos.y = e.clientY- canvas.offsetTop;
}


function draw(e) {
  if (e.buttons !== 1) return;

  ctx.beginPath();

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  //ctx.strokeStyle = '#ffffff;

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke(); 
}