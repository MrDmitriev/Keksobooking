'use strict';
(function () {
  var MAIN_PIN = {
    SIDE: 62,
    HEIGHT: 84,
    ARROW_HEIGHT: 22,
  };
  var COORDINATION_LIMIT_TOP = window.data.ADDRESS_Y_INT_MIN - MAIN_PIN.HEIGHT;
  var COORDINATION_LIMIT_BOTTOM = window.data.ADDRESS_Y_INT_MAX - MAIN_PIN.HEIGHT;

  function chcekMapStatus() {
    var mapFaded = document.querySelector('.map--faded');
    var mainPinHwight = mapFaded ? 0 : MAIN_PIN.ARROW_HEIGHT + MAIN_PIN.SIDE / 2;
    return mainPinHwight;
  }

  function setAddress() {
    var adrressCoords = getMainPinCoords(chcekMapStatus);
    var address = document.querySelector('#address');
    address.value = adrressCoords.x + ', ' + adrressCoords.y;
  }

  function getMainPinCoords(callback) {
    var map = document.querySelector('.map');
    var mapCoords = map.getBoundingClientRect();
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinRect = mainPin.getBoundingClientRect();
    var mainPinCoords = {
      x: Math.round(mainPinRect.x - mapCoords.x + MAIN_PIN.SIDE / 2),
      y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN.SIDE / 2 + callback())
    };
    return mainPinCoords;
  }

  function removeMapFading() {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  }

  function activatePage() {
    window.form.setElementsValidation();
    window.renderPopups.createPropertyMap();
    window.form.changeFormCondition(false);
    removeMapFading();
  }

  function initializeMap() {
    // var startMainPinCoords = getMainPinCoords(chcekMapStatus);
    var mapMainPin = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapCoord = map.getBoundingClientRect();
    var mapWidthLim = mapCoord.width - MAIN_PIN.SIDE;

    setAddress();

    mapMainPin.addEventListener('mousedown', function (evt) {
      // var activatedMainPinCoords = getMainPinCoords(chcekMapStatus);
      setAddress();
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        // var mainPinCoords = getMainPinCoords(chcekMapStatus);
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
        setAddress();
      };

      var onMouseUp = function (upEvt, moveEvt) {
        var isMapDeactivated = document.querySelector('.map--faded');
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (moveEvt === 0) {
          setAddress();
        }
        if (isMapDeactivated) {
          activatePage();
          // var mainPinCoords = getMainPinCoords(chcekMapStatus);
          setAddress();
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  initializeMap();

  window.movings = {
    setAddress: function (x, y) {
      var address = document.querySelector('#address');
      address.value = x + ', ' + y;
    },
    getMainPinCoords: function (callback) {
      var map = document.querySelector('.map');
      var mapCoords = map.getBoundingClientRect();
      var mainPin = document.querySelector('.map__pin--main');
      var mainPinRect = mainPin.getBoundingClientRect();
      var mainPinCoords = {
        x: Math.round(mainPinRect.x - mapCoords.x + MAIN_PIN.SIDE / 2),
        y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN.SIDE + callback())
      };
      return mainPinCoords;
    },
    chcekMapStatus: function () {
      var mapFaded = document.querySelector('.map--faded');
      var mainPinHwight = mapFaded ? 0 : MAIN_PIN.ARROW_HEIGHT + MAIN_PIN.SIDE / 2;
      return mainPinHwight;
    }
  };
})();

