'use strict';
(function () {
  var ADDRESS_Y_INT_MIN = 130;
  var ADDRESS_Y_INT_MAX = 630;
  var MAIN_PIN = {
    SIDE: 62,
    HEIGHT: 84,
    ARROW_HEIGHT: 22,
    PEAK: 1
  };
  var COORDINATION_LIMIT_TOP = ADDRESS_Y_INT_MIN - MAIN_PIN.HEIGHT;
  var COORDINATION_LIMIT_BOTTOM = ADDRESS_Y_INT_MAX - MAIN_PIN.HEIGHT;

  var moveMainPin = function () {
    var mapMainPin = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapCoord = map.getBoundingClientRect();
    var mapWidthLimRight = mapCoord.width + MAIN_PIN.PEAK;
    var mapWidthLimLeft = MAIN_PIN.PEAK;

    window.manageForms.setAddress();

    mapMainPin.addEventListener('mousedown', function (evt) {
      window.manageForms.setAddress();
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
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

        if (newCoordX < mapWidthLimLeft) {
          newCoordX = mapWidthLimLeft;
        } else if (newCoordX > mapWidthLimRight) {
          newCoordX = mapWidthLimRight;
        }

        mapMainPin.style.top = newCoordY + 'px';
        mapMainPin.style.left = newCoordX + 'px';

        window.pageMode.changeFormCondition(false);
        window.manageForms.setAddress();
      };

      var onMouseUp = function (upEvt) {
        var isMapDeactivated = document.querySelector('.map--faded');
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (isMapDeactivated) {
          window.pageMode.setPageMode('active');
          window.manageForms.setAddress();
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  moveMainPin();
})();

