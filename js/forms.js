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
  var propertyType = document.querySelector('#type');
  var propertyPrice = document.querySelector('#price');

  var uploadData = function () {
    window.pageMode.set();
    window.message.renderSuccess();
  };

  var getSelectedPropertyType = function () {
    var selectedOption = propertyType.options[propertyType.selectedIndex].value;
    return selectedOption;
  };

  var setMinPropertyPrice = function () {
    var currentTypeValue = getSelectedPropertyType();
    propertyPrice.min = TYPE_TO_MIN_PRICE[currentTypeValue];
    propertyPrice.placeholder = TYPE_TO_MIN_PRICE[currentTypeValue];
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
    var timeoutOptions = document.querySelector('#timeout').querySelectorAll('option');
    var timeInAvailable = TIME_IN_OUT[timeIn];
    timeoutOptions[timeInAvailable].selected = true;
  };

  var setTimeIn = function (evt) {
    var timeOut = evt.target.value;
    var timeinOptions = document.querySelector('#timein').querySelectorAll('option');
    var timeOutAvailable = TIME_IN_OUT[timeOut];
    timeinOptions[timeOutAvailable].selected = true;
  };

  form.addEventListener('submit', function (evt) {
    window.dataUpload(new FormData(form), uploadData, window.message.renderError);
    evt.preventDefault();
  });

  window.pageMode.changeFormCondition(true);

  window.forms = {
    MAIN_PIN: {
      SIDE: 62,
      HEIGHT: 84,
      ARROW_HEIGHT: 22,
    },
    setValidation: function () {
      var roomsSelection = document.querySelector('#room_number');
      var timeIn = document.querySelector('#timein');
      var timeOut = document.querySelector('#timeout');
      setMinPropertyPrice();
      propertyType.addEventListener('change', setMinPropertyPrice);
      roomsSelection.addEventListener('change', setGuestsNumber);
      timeIn.addEventListener('change', setTimeOut);
      timeOut.addEventListener('change', setTimeIn);
    },
    setAddress: function () {
      var adrressCoords = window.forms.getMainPinCoords(window.forms.chcekMapStatus);
      var address = document.querySelector('#address');
      address.value = adrressCoords.x + ', ' + adrressCoords.y;
    },
    getMainPinCoords: function (callback) {
      var map = document.querySelector('.map');
      var mainPin = document.querySelector('.map__pin--main');
      var mapCoords = map.getBoundingClientRect();
      var mainPinCoord = mainPin.getBoundingClientRect();
      var mainPinCoords = {
        x: Math.round(mainPinCoord.x) - Math.round(mapCoords.x) + window.forms.MAIN_PIN.SIDE / 2,
        y: Math.round(mainPinCoord.y - mapCoords.y) + window.forms.MAIN_PIN.SIDE / 2 + callback()
      };
      return mainPinCoords;
    },
    chcekMapStatus: function () {
      var mapFaded = document.querySelector('.map--faded');
      var mainPinHwight = mapFaded ? 0 : window.forms.MAIN_PIN.ARROW_HEIGHT + window.forms.MAIN_PIN.SIDE / 2;
      return mainPinHwight;
    },
    uploadData: uploadData
  };
})();

