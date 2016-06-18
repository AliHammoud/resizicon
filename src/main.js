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

      return reader.result;

    };

  } catch (e) {

    console.warn('Error: ' + e);
    return -1;

  }
  
}

function setAnimSpeed(speed) {
  
  $("#targetImg").css("animation-duration", speed+"s");
  
}

function setDropMsg(msg) {

  $("#howTo").text(msg);

}

function allowDrop (ev) {

  ev.preventDefault();
  
  var targetImg = document.getElementById("targetImg");
  setAnimSpeed(0.5);
  
  setDropMsg("Drop it like it's hot!");
  
}

function triggerInput() {
  
  $("#hiddenInput").click();
  
}

function clickLoad() {
  
  //console.log($("#hiddenInput").get(0).files[0])
  readData($("#hiddenInput").get(0).files[0]);
  
}

function dragLoad(ev) {

  ev.stopPropagation();
  ev.preventDefault();
  
  readData(ev.dataTransfer.files[0]);

  setAnimSpeed(2);
  setDropMsg("Drag and drop, or click to upload");

}

function dragEnded(ev) {

  setAnimSpeed(2);
  setDropMsg("Drag and drop, or click to upload");
  
}