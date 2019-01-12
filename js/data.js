'use strict';
(function () {
  var NUMBER_OF_PROPERTY_CARDS = 8;
  var PHOTOS_NUMBER = 3;
  var URL = 'https://js.dump.academy/keksobooking/data';


  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.data = {
     PHOTOS_NUMBER: PHOTOS_NUMBER,
    ADDRESS_Y_INT_MIN: 130,
    ADDRESS_Y_INT_MAX: 630,
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    NUMBER_OF_PROPERTY_CARDS: NUMBER_OF_PROPERTY_CARDS
  };
})();


