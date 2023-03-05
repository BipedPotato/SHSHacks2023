var output = document.createElement('pre');
document.body.appendChild(output);

var oldLog = console.log;

console.log = function( ...items ) {

    oldLog.apply(this,items);

    items.forEach( (item,i)=>{
        items[i] = (typeof item === 'object' ? JSON.stringify(item,null,4) : item);
    });
    output.innerHTML += items.join(' ') + '<br />';

};

function consoleInput( data ) {
    console.log( data + '<br />' );
    try {
        console.log( eval( data ) );
    } catch (e) {
        console.log( e.stack );
    }
}
console.log("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd");
var canvas = document.getElementById('drawingcanvas');
var ctx = canvas.getContext('2d');
var pos = { x: 0, y: 0 };
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);


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

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
  x: touchEvent.touches[0].clientX - rect.left,
  y: touchEvent.touches[0].clientY - rect.top
  };
}




function setPosition(e) {
  console.log(pos.x+","+pos.y);
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  pos.x = e.clientX - canvas.offsetLeft + scrollLeft;
  pos.y = e.clientY - canvas.offsetTop + scrollTop;
}

function setPositionMobile(e) {
  //document.getElementById("drawingSize").value = 100;
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