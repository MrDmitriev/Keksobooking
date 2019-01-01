'use strict';
(function () {
  var MAIN_PIN = {
    SIDE: 62,
    HEIGHT: 84,
    ARROW_HEIGHT: 22,
  };
  var COORDINATION_LIMIT_TOP = window.data.ADDRESS_Y_INT_MIN - MAIN_PIN.HEIGHT;
  var COORDINATION_LIMIT_BOTTOM = window.data.ADDRESS_Y_INT_MAX - MAIN_PIN.HEIGHT;

  function moveMainPin() {
    var mapMainPin = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapCoord = map.getBoundingClientRect();
    var mapWidthLim = mapCoord.width - MAIN_PIN.SIDE;

    window.form.setAddress();

    mapMainPin.addEventListener('mousedown', function (evt) {
      window.form.setAddress();
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

        if (newCoordX < 0) {
          newCoordX = 0;
        } else if (newCoordX > mapWidthLim) {
          newCoordX = mapWidthLim;
        }

        mapMainPin.style.top = newCoordY + 'px';
        mapMainPin.style.left = newCoordX + 'px';

        window.pageMode.changeFormCondition(false);
        window.form.setAddress();
      };

      var onMouseUp = function (upEvt, moveEvt) {
        var isMapDeactivated = document.querySelector('.map--faded');
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (moveEvt === 0) {
          window.form.setAddress();
        }
        if (isMapDeactivated) {
          window.pageMode.pageMode('active');
          window.form.setAddress();
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  moveMainPin();
})();

