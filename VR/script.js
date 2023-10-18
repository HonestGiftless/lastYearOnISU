function start() {
  var scene = document.querySelector('a-scene');

  if (scene.hasLoaded) {
    mainElems();
    console.log("hasLoaded");
  } else {
    scene.addEventListener('loaded', mainElems);
    console.log("event");
  }
}

function mainElems() {

  changeAttr(nextSceneBtn, 'mouseenter', 'scale');
  changeAttr(setStar, 'mouseenter', 'color')

  nextSceneBtn.addEventListener('click', function() {
    background.setAttribute('src', 'https://cdn.glitch.me/fa20d258-b208-457b-9e8c-bae8447177b0/mainBG.jpg?v=1696957399159');
  });
  
  let sceneEl = document.querySelector('a-scene');
  {
    let el = sceneEl.querySelector('[camera]');
    el.addEventListener('drag-controls:changed', event => {
      event.target.setAttribute('orbit-controls', 'enabled', !event.detail.active);
    });
  }
  {
    let onDragStart = (event => {
      event.target.setAttribute('color', 'DeepSkyBlue');
    });
    let onDragEnd = (event => {
      event.target.removeAttribute('color');
    });
    let els = sceneEl.querySelectorAll('a-box.draggable');
    for (let el of els) {
      el.addEventListener('dragstart', onDragStart);
      el.addEventListener('dragend', onDragEnd);
    }
  }
}


function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function changeAttr(obj, mouseAction, action) {
  if (mouseAction == "mouseenter") {
    if (action == "scale") {
      obj.addEventListener(mouseAction, function() {
        obj.object3D.scale.set(4, 4, 4);
      });
      obj.addEventListener('mouseleave', function() {
        obj.object3D.scale.set(3, 3, 3);
      });
    } else if (action == "color") {
      obj.addEventListener(mouseAction, function() {
        let rndColor = arrayRandElement(colors);
        obj.setAttribute('color', rndColor);
      });
      obj.addEventListener('mouseleave', function() {
        obj.setAttribute('color', 'red');  
      });
    };
  }
}

function moveObject() {
  car.setAttribute('rotation', startPoint.rotation);
  
  car.setAttribute('animation', {
    property: 'position',
    to: endPoint.x + ' ' + endPoint.y + ' ' + endPoint.z,
    dur: 2000
  });
  
  setTimeout(function() {
    car.setAttribute('rotation', endPoint.rotation);
  }, 2000);
  
  setTimeout(function() {
    var temp = startPoint;
    startPoint = endPoint;
    endPoint = temp;
  }, 4000);
}

var camera = document.querySelector('a-camera');      
var nextSceneBtn = document.querySelector('#directionArrow');
var setStar = document.querySelector('a-sphere');
var infoTor = document.querySelector('a-torus');
var car = document.querySelector('#moving_car');
var background = document.querySelector('a-sky');
var colors = ['green', 'blue', 'orange', 'cyan', 'purple', 'black', 'white'];
var carPos = car.getAttribute("position");

var startPoint = { x: 5.667, y: -8.711, z: -6.987, rotation: "16.778 -135.970 -1.314" };
var endPoint = { x: 2.385, y: -8.711, z: -10.863, rotation: "-14.489 43.104 -18.936" };

start();
moveObject();
setInterval(moveObject, 3000);
