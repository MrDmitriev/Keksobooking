'use strict';

(function () {
  var MAIN_PIN_SIDE = 62;
  var MAIN_PIN_ARROW_HEIGHT = 22;
  var MAIN_PIN_HEIGHT = 84;
  var COORDINATION_LIMIT_TOP = window.map.ADDRESS_Y_INT_MIN - MAIN_PIN_HEIGHT;
  var COORDINATION_LIMIT_BOTTOM = window.map.ADDRESS_Y_INT_MAX - MAIN_PIN_HEIGHT;

  function getMainPinCoords() {
    var map = document.querySelector('.map');
    var mapCoords = map.getBoundingClientRect();
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinRect = mainPin.getBoundingClientRect();
    var mainPinCoords = {
      x: Math.round(mainPinRect.x - mapCoords.x + MAIN_PIN_SIDE / 2),
      y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN_ARROW_HEIGHT + MAIN_PIN_SIDE)
    };
    return mainPinCoords;
  }

  function setAddress(x, y) {
    var address = document.querySelector('#address');
    address.value = x + ', ' + y;
  }

  function getStartMainPinCoords() {
    var map = document.querySelector('.map');
    var mapCoords = map.getBoundingClientRect();
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinRect = mainPin.getBoundingClientRect();
    var mainPinCoords = {
      x: Math.round(mainPinRect.x - mapCoords.x + MAIN_PIN_SIDE / 2),
      y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN_SIDE / 2)
    };
    return mainPinCoords;
  }

  function removeMapFading() {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  }

  function activatePage() {
    window.form.setElementsValidation();
    window.map.createPropertyMap();
    window.form.changeFormCondition(false);
    removeMapFading();
  }

  function initializeMap() {
    var startMainPinCoords = getStartMainPinCoords();
    var mapMainPin = document.querySelector('.map__pin--main');
    var mapPn = document.querySelector('.map');
    var mapCoord = mapPn.getBoundingClientRect();
    var mapWidthLim = mapCoord.width - MAIN_PIN_SIDE;

    setAddress(startMainPinCoords.x, startMainPinCoords.y);

    mapMainPin.addEventListener('mousedown', function (evt) {

      var activatedMainPinCoords = getMainPinCoords();
      setAddress(activatedMainPinCoords.x, activatedMainPinCoords.y);
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        var mainPinCoords = getMainPinCoords();
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var newCoordY = mapMainPin.offsetTop - shift.y;
        var newCoordX = mapMainPin.offsetLeft - shift.x;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (newCoordY < COORDINATION_LIMIT_TOP) {
          newCoordY = COORDINATION_LIMIT_TOP;
        } else if (newCoordY > COORDINATION_LIMIT_BOTTOM) {
          newCoordY = COORDINATION_LIMIT_BOTTOM;
        }

        if (newCoordX < 0) {
          newCoordX = 0;
        } else if (newCoordX > mapWidthLim) {
          newCoordX = mapWidthLim;
        }

        mapMainPin.style.top = newCoordY + 'px';
        mapMainPin.style.left = newCoordX + 'px';

        window.form.changeFormCondition(false);
        setAddress(mainPinCoords.x, mainPinCoords.y);
      };

      var onMouseUp = function (upEvt, moveEvt) {
        var isMapActivated = document.querySelector('.map--faded');
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (moveEvt === 0) {
          setAddress(startCoords.x, startCoords.y);
        }
        if (isMapActivated) {
          activatePage();
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  window.form.changeFormCondition(true);
  initializeMap();

  window.movings = {
    setAddress: function (x, y) {
      var address = document.querySelector('#address');
      address.value = x + ', ' + y;
    },
    getStartMainPinCoords: function () {
      var map = document.querySelector('.map');
      var mapCoords = map.getBoundingClientRect();
      var mainPin = document.querySelector('.map__pin--main');
      var mainPinRect = mainPin.getBoundingClientRect();
      var mainPinCoords = {
        x: Math.round(mainPinRect.x - mapCoords.x + MAIN_PIN_SIDE / 2),
        y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN_SIDE / 2)
      };
      return mainPinCoords;
    }
  };
})();

