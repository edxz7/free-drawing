/*
 License: Apache-2.0
 Author: Eduardo Ch. Colorado
 E-mail: edxz7c@gmail.com
*/
window.addEventListener("load", () => {

  /** CONSTANTS **/
  const CANVAS_BACKGROUND_COLOUR = "black" //"#1d252c";       
  
  // Get the canvas element
  const canvas = document.querySelector('#canvas');  // on querySelector search for the tag canvas in the index.html 
  // Return a two dimensional drawing context
  // In canvas all the drawinng is performed in the context
  const ctx = canvas.getContext('2d');
  // Select the colour to fill the canvas
  ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false
  let maxWidth = 35
  let minWidth = 15
  let widthDelta = 0.25
  let lx, ly = [0,0]
  let hue = 0                      // if the hue strockeStyle is enabled
  ctx.strokeStyle = 'white';
  ctx.lineJoin = 'round';  // apariencia de las lineas cuando se unen, 3 posibles valores: round, bevel and miter, default miter
  ctx.lineCap = 'round';   // apariencia del final de las lineas, 3 posible valores butt, round and square, default butt
  ctx.lineWidth = minWidth;

  function draw(e){
      if(!isDrawing) return;
      // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      hue = ++hue % 360;
      ctx.beginPath()
      ctx.moveTo(lx,ly)
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lx,ly] = [e.offsetX, e.offsetY]

      ctx.lineWidth += widthDelta
      if(ctx.lineWidth < minWidth || ctx.lineWidth > maxWidth){
          widthDelta = -widthDelta
      }
  }

  canvas.addEventListener('mousemove', draw);

  // se activa cuando el boton de un dispositivo apuntador es precionado
  canvas.addEventListener('mousedown', (e) => {
      isDrawing = true
      ctx.moveTo(e.offsetX, e.offsetY)
      ctx.closePath(); //cerramos si el path quedo abierto previamente
      [lx,ly] = [e.offsetX, e.offsetY]
  });

  // se activa cuando soltamos el boton de un dispositivo apuntador
  canvas.addEventListener('mouseup', () => {
      isDrawing = false 
      hue = 0
  });
    // se activa cuando el puntero de un dispositivo apuntador sale del canvas
  canvas.addEventListener('mouseout', () => isDrawing = false);


  // clear canvas
  document.getElementById('clear-canvas').addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, false);

});