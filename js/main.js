'use strict';
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_WIDTH = 62;
var ESC_KEYCODE = 27;
var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 357;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 3;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ADDRESS_X_INT_MIN = 100;
var ADDRESS_X_INT_MAX = 500;
var ADDRESS_Y_INT_MIN = 130;
var ADDRESS_Y_INT_MAX = 630;
var NUMBER_OF_PROPERTY_CARDS = 8;
var PHOTOS_NUMBER = 3;
var PHOTOS = getPhotoUrls();
var CHECK_IN_OUT_OPTIONS = ['12:00', '13:00', '14:00'];
var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AVATARS = getAvatarUrls();
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

function getRandomPropertyConfigs() {
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
        'address': (getRandomInt(ADDRESS_X_INT_MIN, ADDRESS_X_INT_MAX) + ', ' + getRandomInt(ADDRESS_Y_INT_MIN, ADDRESS_Y_INT_MAX)),
        'price': getRandomInt(PRICE_MIN, PRICE_MAX),
        'type': PROPERTY_TYPES[getRandomItem(PROPERTY_TYPES)],
        'rooms': getRandomInt(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomInt(GUESTS_MIN, GUESTS_MAX),
        'checkin': CHECK_IN_OUT_OPTIONS[getRandomItem(CHECK_IN_OUT_OPTIONS)],
        'checkout': CHECK_IN_OUT_OPTIONS[getRandomItem(CHECK_IN_OUT_OPTIONS)],
        'features': getRandomLengthMassive(FEATURES),
        'description': ' ',
        'photos': randomPhoto
      },
      'location': {
        'x': getRandomInt(ADDRESS_X_INT_MIN, ADDRESS_X_INT_MAX),
        'y': getRandomInt(ADDRESS_Y_INT_MIN, ADDRESS_Y_INT_MAX)
      }
    });
  }
  return randomPropertyMassive;
}

function hideUnusedFeatures(property, template) {
  for (var i = 0; i < FEATURES.length; i++) {
    var array = property.offer.features;
    var element = FEATURES[i];
    var idx = array.indexOf(element);
    if (idx === -1) {
      var toRemove = 'popup__feature--' + element;
      var featureToRemove = template.querySelector('.' + toRemove);
      featureToRemove.classList.remove('popup__feature');
    }
  }
}

function getPropertyType(property) {
  var textContent = '';
  if (property.offer.type === 'flat') {
    textContent = 'Квартира';
  } else if (property.offer.type === 'bungalo') {
    textContent = 'Бунгало';
  } else if (property.offer.type === 'house') {
    textContent = 'Дом';
  } else if (property.offer.type === 'palace') {
    textContent = 'Дворец';
  }

  return textContent;
}

function makePhotoImg(elem, property, i) {
  var photoImg = document.createElement('img');
  photoImg.classList.add('popup__photo');
  photoImg.src = property.offer.photos[i];
  photoImg.width = '45';
  photoImg.height = '40';

  return photoImg;
}

function createPhotosLibrary(property, template) {
  var similarPhotoTemplate = template.querySelector('.popup__photos');
  var fragmentPhotos = document.createDocumentFragment();
  for (var j = 0; j < PHOTOS_NUMBER; j++) {
    similarPhotoTemplate.removeChild(similarPhotoTemplate.firstChild);
    fragmentPhotos.appendChild(makePhotoImg(similarPhotoTemplate, property, j));
  }
  similarPhotoTemplate.appendChild(fragmentPhotos);
  template.appendChild(similarPhotoTemplate);
}

function openPopup() {
  var mapCard = document.querySelector('.map__card');
  mapCard.classList.remove('hidden');
  window.addEventListener('keydown', onPopupEscPress);
}

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

function rewriteCardElement(property) {
  var oldArticle = document.querySelector('.map__card');
  var newArticle = createCardElement(property);
  var parentArticle = document.querySelector('.map');
  parentArticle.replaceChild(newArticle, oldArticle);
}

function createPinElement(property) {
  var similarPinTemplate = document.querySelector('#pin');
  var pinElement = similarPinTemplate.cloneNode(true);
  var similarPinTemplateButton = pinElement.content.querySelector('.map__pin');
  var buttonAvatar = similarPinTemplateButton.querySelector('img');
  similarPinTemplateButton.style.left = property.location.x + 'px';
  similarPinTemplateButton.style.top = property.location.y + 'px';
  buttonAvatar.src = property.author.avatar;
  buttonAvatar.alt = property.offer.title;
  similarPinTemplateButton.addEventListener('click', function () {
    rewriteCardElement(property);
    openPopup();
  });

  return similarPinTemplateButton;
}

function createPinsList(properties) {
  var similarListElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createPinElement(properties));
  similarListElement.appendChild(fragment);
}

function createCardElement(property) {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  var mapClose = cardElement.querySelector('.popup__close');
  cardElement.querySelector('.popup__title').textContent = property.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = property.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getPropertyType(property);
  cardElement.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
  hideUnusedFeatures(property, cardElement);
  cardElement.querySelector('.popup__description').textContent = property.offer.description;
  createPhotosLibrary(property, cardElement);
  cardElement.querySelector('.popup__avatar').src = property.author.avatar;
  cardElement.classList.add('hidden');
  mapClose.addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });

  return cardElement;
}

function createCardsList(properties) {
  var similarCardsListElement = document.querySelector('.map');
  var fragmentCards = document.createDocumentFragment();

  fragmentCards.appendChild(createCardElement(properties));
  similarCardsListElement.insertBefore(fragmentCards, similarCardsListElement.children[1]);
}

var onResetClick = function (evt) {
  evt.preventDefault();
  location.reload();
};

function changeFormCondition(isHidden) {
  var adFormDiv = document.querySelector('.ad-form');
  var fieldsets = adFormDiv.querySelectorAll('fieldset');
  var adForm = document.querySelector('.notice').querySelector('form');
  adForm.classList.toggle('ad-form--disabled', isHidden);
  var resetForm = adForm.querySelector('.ad-form__reset');
  resetForm.addEventListener('click', onResetClick);
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = isHidden;
  }
}

function setAddress(x, y) {
  var address = document.querySelector('#address');
  address.value = x + ', ' + y;
}

function createPropertyMap() {
  var properties = getRandomPropertyConfigs();
  for (var i = 0; i < NUMBER_OF_PROPERTY_CARDS; i++) {
    createPinsList(properties[i]);
  }
  createCardsList(properties[1]);
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

function removerMapFading() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

function activatePage() {
  setElementsValidation();
  createPropertyMap();
  changeFormCondition(false);
  removerMapFading();
}

function isMapActivated() {
  if (document.querySelector('.map--faded')) {
    activatePage();
  }
}

function initializeMap() {
  var mapMainPin = document.querySelector('.map__pin--main');
  setAddress(MAIN_PIN_X, MAIN_PIN_Y);

  mapMainPin.addEventListener('mousedown', function (evt) {
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

      var map = document.querySelector('.map');
      var mapWidth = map.width;
      var newCoordY = mapMainPin.offsetTop - shift.y;
      var newCoordX = mapMainPin.offsetLeft - shift.x;
      var mapCoords = map.getBoundingClientRect();
      var coordinationLimitTop = ADDRESS_Y_INT_MIN;
      var coordinationLimitBottom = ADDRESS_Y_INT_MAX;
      var coordinationLimitLeft = mapCoords.left;
      var coordinationLimitRight = 1100;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (newCoordY < coordinationLimitTop) {
        newCoordY = coordinationLimitTop;
      } else if (newCoordY > coordinationLimitBottom) {
        newCoordY = coordinationLimitBottom;
      }

      if (newCoordX < coordinationLimitLeft) {
        newCoordX = coordinationLimitLeft;
      } else if (newCoordX > coordinationLimitRight) {
        newCoordX = coordinationLimitRight;
      }

      mapMainPin.style.top = newCoordY + 'px';
      mapMainPin.style.left = newCoordX + 'px';
      setAddress(newCoordX, newCoordY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      isMapActivated();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

initializeMap();

