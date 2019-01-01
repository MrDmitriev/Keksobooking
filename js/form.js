'use strict';
(function () {
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
    window.renderPins.removeCard();
    changeFormCondition(true);
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
    map.classList.add('map--faded');
    var startMainPinCoords = window.movings.getStartMainPinCoords();
    window.movings.setAddress(startMainPinCoords.x, startMainPinCoords.y);
  };

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

  window.form = {
    MAIN_PIN_SIDE: 62,
    MAIN_PIN_HEIGHT: 84,
    openPopup: function () {
      var mapCard = document.querySelector('.map__card');
      mapCard.classList.remove('hidden');
      window.addEventListener('keydown', onPopupEscPress);
    },
    setElementsValidation: function () {
      var type = document.querySelector('#type');
      var roomsSelection = document.querySelector('#room_number');
      var timeIn = document.querySelector('#timein');
      var timeOut = document.querySelector('#timeout');

      type.addEventListener('change', setMinPropertyPrice);
      roomsSelection.addEventListener('change', setGuestsNumber);
      timeIn.addEventListener('change', setTimeOut);
      timeOut.addEventListener('change', setTimeIn);
    },
    changeFormCondition: function (isHidden) {
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
  };
})();

