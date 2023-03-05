var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.body.style.msTransform =   scale;       // IE 9
 document.body.style.transform = scale;     // General
var output = document.createElement('pre');
document.body.appendChild(output);

var oldLog = console.log;

console.log = function (...items) {

  oldLog.apply(this, items);

  items.forEach((item, i) => {
    items[i] = (typeof item === 'object' ? JSON.stringify(item, null, 4) : item);
  });
  output.innerHTML += items.join(' ') + '<br />';

};

function consoleInput(data) {
  console.log(data + '<br />');
  try {
    console.log(eval(data));
  } catch (e) {
    console.log(e.stack);
  }
}
//console.log("plz send help");
var canvas = document.getElementById('drawingcanvas');
var ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth/ 2;
canvas.height = document.documentElement.clientHeight / 2;

var drawing = false;
var mousePos = { x: 0, y: 0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
  drawing = true;
  lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, false);

function getMousePos(canvasDom, mouseEvent) {
  var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

  return {
    x: (mouseEvent.clientX - rect.left) * scaleX,
    y: (mouseEvent.clientY - rect.top) * scaleY
  }
}
window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function renderCanvas() {
  if (drawing) {
    ctx.beginPath();
  
    ctx.lineWidth = document.getElementById("drawingSize").value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("colorpicker").value;
    if(document.getElementById("eraser").checked)
    {
      ctx.strokeStyle = `rgb(255,255,255)`;
    }
    
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
  }
}

(function drawLoop() {
  requestAnimFrame(drawLoop);
  renderCanvas();
})();
canvas.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

const button = document.querySelector('input');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);
var click = -0.5;
function updateButton() {
  if(click == 0){
    paragraph.textContent = "Thanks for sharing!"
  }
  else{
    paragraph.textContent = "Clicks: " + click
  }
  click += 0.5;
}