'use strict';
(function () {
  window.form = {
    MAIN_PIN_HEIGHT: 84,
    MAIN_PIN_SIDE: 62,
    openPopup: function () {
      var mapCard = document.querySelector('.map__card');
      mapCard.classList.remove('hidden');
      window.addEventListener('keydown', onPopupEscPress);
    }
  };
  var COORDINATION_LIMIT_TOP = window.map.ADDRESS_Y_INT_MIN - window.form.MAIN_PIN_HEIGHT;
  var COORDINATION_LIMIT_BOTTOM = window.map.ADDRESS_Y_INT_MAX - window.form.MAIN_PIN_HEIGHT;
  var MAIN_PIN_ARROW_HEIGHT = 22;
  var ESC_KEYCODE = 27;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var TYPE_TO_MIN_PRICE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var ROOMS_TO_AVAILABLE_GUESTS = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var TIME_IN_OUT = {
    '12:00': 0,
    '13:00': 1,
    '14:00': 2,
  };

  var closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.classList.add('hidden');
    window.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  function removePins() {
    var mapPins = document.querySelector('.map__pins');
    var buttons = mapPins.querySelectorAll('button');
    for (var i = 1; i < buttons.length; i++) {
      mapPins.removeChild(buttons[i]);
    }
  }

  function changeFormCondition(isHidden) {
    var adFormDiv = document.querySelector('.ad-form');
    var fieldsets = adFormDiv.querySelectorAll('fieldset');
    var adForm = document.querySelector('.notice').querySelector('form');
    adForm.classList.toggle('ad-form--disabled', isHidden);
    var resetForm = adForm.querySelector('.ad-form__reset');
    if (isHidden) {
      resetForm.removeEventListener('click', onResetClick);
    } else {
      resetForm.addEventListener('click', onResetClick);
    }
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isHidden;
    }
  }

  var onResetClick = function (evt) {
    evt.preventDefault();
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    removePins();
    changeFormCondition(true);
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
    map.classList.add('map--faded');
    var startMainPinCoords = getStartMainPinCoords();
    setAddress(startMainPinCoords.x, startMainPinCoords.y);
  };

  function getStartMainPinCoords() {
    var map = document.querySelector('.map');
    var mapCoords = map.getBoundingClientRect();
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinRect = mainPin.getBoundingClientRect();
    var mainPinCoords = {
      x: Math.round(mainPinRect.x - mapCoords.x + window.form.MAIN_PIN_SIDE / 2),
      y: Math.round(mainPinRect.y - mapCoords.y + window.form.MAIN_PIN_SIDE / 2)
    };
    return mainPinCoords;
  }

  function getMainPinCoords() {
    var map = document.querySelector('.map');
    var mapCoords = map.getBoundingClientRect();
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinRect = mainPin.getBoundingClientRect();
    var mainPinCoords = {
      x: Math.round(mainPinRect.x - mapCoords.x + window.form.MAIN_PIN_SIDE / 2),
      y: Math.round(mainPinRect.y - mapCoords.y + MAIN_PIN_ARROW_HEIGHT + window.form.MAIN_PIN_SIDE)
    };
    return mainPinCoords;
  }

  function setAddress(x, y) {
    var address = document.querySelector('#address');
    address.value = x + ', ' + y;
  }

  function setElementsValidation() {
    var type = document.querySelector('#type');
    var roomsSelection = document.querySelector('#room_number');
    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');

    type.addEventListener('change', setMinPropertyPrice);
    roomsSelection.addEventListener('change', setGuestsNumber);
    timeIn.addEventListener('change', setTimeOut);
    timeOut.addEventListener('change', setTimeIn);
  }

  var setMinPropertyPrice = function (event) {
    var price = document.querySelector('#price');
    var typeValue = event.target.value;
    price.min = TYPE_TO_MIN_PRICE[typeValue];
    price.placeholder = TYPE_TO_MIN_PRICE[typeValue];
  };

  var setGuestsNumber = function (event) {
    var roomsNumber = event.target.value;
    var capacity = document.querySelector('#capacity');
    var capacityOptions = capacity.querySelectorAll('option');
    var guestsNumberAvailable = ROOMS_TO_AVAILABLE_GUESTS[roomsNumber];
    capacityOptions.forEach(function (option) {
      var idx = guestsNumberAvailable.indexOf(option.value);
      option.disabled = idx === -1;
    });
    capacity.disabled = false;
    capacityOptions[0].selected = true;
  };

  var setTimeOut = function (event) {
    var timeIn = event.target.value;
    var timeout = document.querySelector('#timeout');
    var timeoutOptions = timeout.querySelectorAll('option');
    var timeInAvailable = TIME_IN_OUT[timeIn];
    timeoutOptions[timeInAvailable].selected = true;
  };

  var setTimeIn = function (event) {
    var timeOut = event.target.value;
    var timein = document.querySelector('#timein');
    var timeinOptions = timein.querySelectorAll('option');
    var timeOutAvailable = TIME_IN_OUT[timeOut];
    timeinOptions[timeOutAvailable].selected = true;
  };

  function removeMapFading() {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  }

  function activatePage() {
    setElementsValidation();
    window.map.createPropertyMap();
    changeFormCondition(false);
    removeMapFading();
  }

  function initializeMap() {
    var startMainPinCoords = getStartMainPinCoords();
    var mapMainPin = document.querySelector('.map__pin--main');
    var mapPn = document.querySelector('.map');
    var mapCoord = mapPn.getBoundingClientRect();
    var mapWidthLim = mapCoord.width - window.form.MAIN_PIN_SIDE;

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

        changeFormCondition(false);
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

  changeFormCondition(true);
  initializeMap();
})();

