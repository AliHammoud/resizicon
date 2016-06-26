function updatePreview(selector, data) {
  
  //$(selector).attr('src', data);
  
  var 
  img = new Image(),
  imgData,
  canvas,
  canvasSize = 128,
  cw,
  ch,
  w,
  h;
  
  img.onload = function() {
    
    w = img.width;
    h = img.height;
    
    //Check aspect & decide which dimension to fit
    
    if (w/h > 1) {
      
      cw = canvasSize;
      ch = h/w * canvasSize;

      //needs a special vertical offset to stay centered

      $('#preview').css('top', (canvasSize - ch/2) );
      
    } else {

      cw = w/h * canvasSize;
      ch = canvasSize;
      
    }
    
    canvas = document.getElementById('editorCanvas').getContext('2d');
    
    $('#editorCanvas').attr({width: cw ,height: ch });

    
    $('#iconDimensions').html('W: ' + w + ' - ' + 'H: ' + h);
    
    console.log(w + ', ' + h);

    canvas.drawImage(img, 0, 0, w, h, 0, 0, cw, ch);

    
    imgData = canvas.getImageData(0, 0, w, h);
    
    for (var i = 0; i < imgData.data.length; i += 4) {
      
      if(imgData.data[i+3] != 0) {
        
        imgData.data[i]   = 0;
        imgData.data[i+1] = 0;
        imgData.data[i+2] = 0;
        
      }
      
    }
    
    canvas.putImageData(imgData, 0, 0);
    
  }
  
  img.src = data;
  
}

function readData(file) {
  
  try {

    var
    reader = new FileReader(),
    fileSizeRaw = file.size,
    filesizeMB;

    filesizeMB = fileSizeRaw / (1000 * 1000);

    reader.readAsDataURL(file);

    reader.onloadend = function (e) {

      console.log('File loaded [Name: ' +
                  file.name + ' | Type: ' +
                  file.type + ' | Size: ' +
                  filesizeMB.toPrecision(3) +
                  ' MB]'
                 );
      
      updatePreview('#editorCanvas', reader.result);
      
      $('#iconName').html(file.name);
      $('#iconSize').html('Size: ' + readableFileSize(filesizeMB));
      
      return reader.result;

    };

  } catch (e) {

    console.warn('Error: ' + e);
    return -1;

  }
  
}

function setAnimSpeed(speed) {
  
  $('#targetImg').css('animation-duration', speed+'s');
  
}

function setDropMsg(msg) {

  $('#howTo').text(msg);

}

function allowDrop (ev) {

  ev.preventDefault();
  
  var targetImg = document.getElementById('targetImg');
  setAnimSpeed(0.5);
  
  setDropMsg("Drop it like it's hot!");
  
}

function triggerInput() {
  
  $('#hiddenInput').click();
  
}

function clickLoad() {
  
  var img = readData($('#hiddenInput').get(0).files[0]);
  
  showIcon();
  
}

function dragLoad(ev) {

  ev.stopPropagation();
  ev.preventDefault();
  
  readData(ev.dataTransfer.files[0]);
  
  showIcon();
  
  setAnimSpeed(2);
  setDropMsg('Drag and drop, or click to upload');

}

function dragEnded(ev) {

  setAnimSpeed(2);
  setDropMsg('Drag and drop, or click to upload');
  
}

function showIcon () {

  $('#loader').hide();
  $('#editor-container').show();
  
}

function showLoader () {
  
  $('#editor-container').hide();
  $('#loader').show();
  
}

function readableFileSize(sizeMB){
  
  if(sizeMB >= 1) {
    
    return (sizeMB.toFixed(2)+'MB');
    
  } else {
    
    var sizeKB = sizeMB * 1024;
    
    return (sizeKB.toFixed(0)+'KB');
    
  }
  
}

function reset() {

  var canvas = document.getElementById('editorCanvas');
  var context = canvas.getContext('2d');
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
  
  $('#iconName').html("-");
  $('#iconSize').html("-");
  $('#iconDimensions').html("-");
  
  showLoader();
  
}