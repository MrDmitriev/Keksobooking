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

  var form = document.querySelector('.ad-form');

  var uploadFormData = function () {
    window.pageMode.setPageMode();
    window.renderMessage.renderSuccessMessage();
  };

  var getSelectedPropertyType = function () {
    var propertyType = document.querySelector('#type');
    var selectedOption = propertyType.options[propertyType.selectedIndex].value;
    return selectedOption;
  };

  var setMinPropertyPrice = function () {
    var price = document.querySelector('#price');
    var currentTypeValue = getSelectedPropertyType();
    price.min = TYPE_TO_MIN_PRICE[currentTypeValue];
    price.placeholder = TYPE_TO_MIN_PRICE[currentTypeValue];
  };

  var setGuestsNumber = function (evt) {
    var roomsNumber = evt.target.value;
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

  var setTimeOut = function (evt) {
    var timeIn = evt.target.value;
    var timeout = document.querySelector('#timeout');
    var timeoutOptions = timeout.querySelectorAll('option');
    var timeInAvailable = TIME_IN_OUT[timeIn];
    timeoutOptions[timeInAvailable].selected = true;
  };

  var setTimeIn = function (evt) {
    var timeOut = evt.target.value;
    var timein = document.querySelector('#timein');
    var timeinOptions = timein.querySelectorAll('option');
    var timeOutAvailable = TIME_IN_OUT[timeOut];
    timeinOptions[timeOutAvailable].selected = true;
  };

  form.addEventListener('submit', function (evt) {
    window.dataUpload(new FormData(form), uploadFormData, window.renderMessage.renderErrorMessage);
    evt.preventDefault();
  });

  window.pageMode.changeFormCondition(true);

  window.manageForms = {
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
      setMinPropertyPrice();
      type.addEventListener('change', setMinPropertyPrice);
      roomsSelection.addEventListener('change', setGuestsNumber);
      timeIn.addEventListener('change', setTimeOut);
      timeOut.addEventListener('change', setTimeIn);
    },
    setAddress: function () {
      var adrressCoords = window.manageForms.getMainPinCoords(window.manageForms.checkMapStatus);
      var address = document.querySelector('#address');
      address.value = adrressCoords.x + ', ' + adrressCoords.y;
    },
    getMainPinCoords: function (callback) {
      var map = document.querySelector('.map');
      var mainPin = document.querySelector('.map__pin--main');
      var mapCoords = map.getBoundingClientRect();
      var mainPinCoord = mainPin.getBoundingClientRect();
      var mainPinCoords = {
        x: Math.round(mainPinCoord.x) - Math.round(mapCoords.x) + window.manageForms.MAIN_PIN.SIDE / 2,
        y: Math.round(mainPinCoord.y - mapCoords.y) + window.manageForms.MAIN_PIN.SIDE / 2 + callback()
      };
      return mainPinCoords;
    },
    checkMapStatus: function () {
      var mapFaded = document.querySelector('.map--faded');
      var mainPinHeight = mapFaded ? 0 : window.manageForms.MAIN_PIN.ARROW_HEIGHT + window.manageForms.MAIN_PIN.SIDE / 2;
      return mainPinHeight;
    },
    uploadFormData: uploadFormData
  };
})();

