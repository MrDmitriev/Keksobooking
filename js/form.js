'use strict';
(function () {
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

  window.pageMode.changeFormCondition(true);

  window.form = {
    MAIN_PIN: {
      SIDE: 62,
      HEIGHT: 84,
      ARROW_HEIGHT: 22,
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
    setAddress: function () {
      var adrressCoords = window.form.getMainPinCoords(window.form.chcekMapStatus);
      var address = document.querySelector('#address');
      address.value = adrressCoords.x + ', ' + adrressCoords.y;
    },
    getMainPinCoords: function (callback) {
      var map = document.querySelector('.map');
      var mainPin = document.querySelector('.map__pin--main');
      var mapCoords = map.getBoundingClientRect();
      var mainPinCoord = mainPin.getBoundingClientRect();
      var mainPinCoords = {
        x: Math.round(mainPinCoord.x) - Math.round(mapCoords.x) + window.form.MAIN_PIN.SIDE / 2,
        y: Math.round(mainPinCoord.y - mapCoords.y) + window.form.MAIN_PIN.SIDE / 2 + callback()
      };
      return mainPinCoords;
    },
    chcekMapStatus: function () {
      var mapFaded = document.querySelector('.map--faded');
      var mainPinHwight = mapFaded ? 0 : window.form.MAIN_PIN.ARROW_HEIGHT + window.form.MAIN_PIN.SIDE / 2;
      return mainPinHwight;
    }
  };
})();

