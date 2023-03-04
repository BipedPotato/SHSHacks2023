var canvas = document.getElementById('drawingcanvas');
var ctx = canvas.getContext('2d');
var pos = { x: 0, y: 0 };
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setPosition(e) {
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  pos.x = e.clientX- canvas.offsetLeft+scrollLeft;
  pos.y = e.clientY- canvas.offsetTop+scrollTop;
}


function draw(e) {
  if(document.activeElement == canvas)
  {
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

}