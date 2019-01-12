'use strict';
(function () {
  var NUMBER_OF_PROPERTY_CARDS = 8;
  var PHOTOS_NUMBER = 3;
  var ROOMS_MIN = 1;
   var ROOMS_MAX = 5;

  var GUESTS_MIN = 1;
  var GUESTS_MAX = 3;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ADDRESS_X_INT_MIN = 100;
  var ADDRESS_X_INT_MAX = 500;
  var PHOTOS = getPhotoUrls();
  var CHECK_IN_OUT_OPTIONS = ['12:00', '13:00', '14:00'];
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var AVATARS = getAvatarUrls();
  var PROPERTY_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  function getRandomItem(items) {
    return (Math.floor(Math.random() * items.length));
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function getRandomElementOrder(massive) {
    var sortedMassive = massive.slice();
    sortedMassive.sort(compareRandom);
    return sortedMassive;
  }

  function getPhotoUrls() {
    var orderedMass = [];
    for (var i = 1; i <= PHOTOS_NUMBER; i++) {
      orderedMass.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
    }
    return orderedMass;
  }

  function getAvatarUrls() {
    var orderedMassive = [];
    for (var i = 1; i <= NUMBER_OF_PROPERTY_CARDS; i++) {
      orderedMassive.push('img/avatars/user0' + i + '.png');
    }
    return orderedMassive;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomLengthMassive(massive) {
    var randomLength = getRandomInt(1, massive.length);
    var randomLengthMassive = [];
    for (var j = 0; j < randomLength; j++) {
      randomLengthMassive.push(massive[j]);
    }
    return randomLengthMassive;
  }

  window.data = {
    PHOTOS_NUMBER: PHOTOS_NUMBER,
    ADDRESS_Y_INT_MIN: 130,
    ADDRESS_Y_INT_MAX: 630,
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    NUMBER_OF_PROPERTY_CARDS: NUMBER_OF_PROPERTY_CARDS,
    getRandomPropertyConfigs: function () {
      var randomAvatars = getRandomElementOrder(AVATARS);
      var randomTitles = getRandomElementOrder(PROPERTY_TITLES);
      var randomPhoto = getRandomElementOrder(PHOTOS);
      var randomPropertyMassive = [];

      for (var i = 0; i < NUMBER_OF_PROPERTY_CARDS; i++) {
        randomPropertyMassive.push({
          'author': {
            'avatar': randomAvatars[i],
          },
          'offer': {
            'title': randomTitles[i],
            'address': (getRandomInt(ADDRESS_X_INT_MIN, ADDRESS_X_INT_MAX) + ', ' + getRandomInt(window.data.ADDRESS_Y_INT_MIN, window.data.ADDRESS_Y_INT_MAX)),
            'price': getRandomInt(PRICE_MIN, PRICE_MAX),
            'type': PROPERTY_TYPES[getRandomItem(PROPERTY_TYPES)],
            'rooms': getRandomInt(ROOMS_MIN, ROOMS_MAX),
            'guests': getRandomInt(GUESTS_MIN, GUESTS_MAX),
            'checkin': CHECK_IN_OUT_OPTIONS[getRandomItem(CHECK_IN_OUT_OPTIONS)],
            'checkout': CHECK_IN_OUT_OPTIONS[getRandomItem(CHECK_IN_OUT_OPTIONS)],
            'features': getRandomLengthMassive(window.data.FEATURES),
            'description': ' ',
            'photos': randomPhoto
          },
          'location': {
            'x': getRandomInt(ADDRESS_X_INT_MIN, ADDRESS_X_INT_MAX),
            'y': getRandomInt(window.data.ADDRESS_Y_INT_MIN, window.data.ADDRESS_Y_INT_MAX)
          }
        });
      }
      return randomPropertyMassive;
    }
  };
})();
