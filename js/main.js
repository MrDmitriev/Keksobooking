'use strict';
function getRandomItem(items) {
  return (Math.floor(Math.random() * items.length));
}

function compareRandom() {
  return Math.random() - 0.5;
}

function getRandomElementOrder(massive) {
  var sortedMassive = massive.slice(0, massive.length);
  sortedMassive.sort(compareRandom);
  return sortedMassive;
}

function getPhotosUrls() {
  var orderedMassive = [];
  for (var i = 1; i <= PROPERTY_NUMBER; i++) {
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
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 15;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ADDRES_X_INT_MIN = 100;
var ADDRES_X_INT_MAX = 500;
var ADDRES_Y_INT_MIN = 130;
var ADDRES_Y_INT_MAX = 630;
var PROPERTY_NUMBER = 8;
var PHOTOS_NUMBER = 3;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var CHECK_IN_OUT_OPTIONS = ['12:00', '13:00', '14:00'];
var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AVATARS = getPhotosUrls();
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

function getRandomPropertyConfigs() {
  var randomAvatars = getRandomElementOrder(AVATARS);
  var randomTitles = getRandomElementOrder(PROPERTY_TITLES);
  var randomPhoto = getRandomElementOrder(PHOTOS);
  var randomPropertyMassive = [];
  for (var i = 0; i < PROPERTY_NUMBER; i++) {

    randomPropertyMassive.push({
      'author': {
        'avatar': randomAvatars[i],
      },
      'offer': {
        'title': randomTitles[i],
        'address': (getRandomInt(ADDRES_X_INT_MIN, ADDRES_X_INT_MAX) + ', ' + getRandomInt(ADDRES_Y_INT_MIN, ADDRES_Y_INT_MAX)),
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
        'x': getRandomInt(ADDRES_X_INT_MIN, ADDRES_X_INT_MAX),
        'y': getRandomInt(ADDRES_Y_INT_MIN, ADDRES_Y_INT_MAX)
      }
    });
  }
  return randomPropertyMassive;
}

var properties = getRandomPropertyConfigs();

// Функция для отрисовки списка Features
function renderFeaturesLists(property, template) {
  for (var i = 0; i < FEATURES.length; i++) {
    var array = properties[i].offer.features;
    var element = FEATURES[i];
    var idx = array.indexOf(element);
    if (idx === -1) {
      var toRemove = 'popup__feature--' + element;
      var featureToRemove = template.querySelector('.' + toRemove);
      featureToRemove.classList.remove('popup__feature');
    }
  }
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

  return similarPinTemplateButton;
}

function createPinsList() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var similarListElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < properties.length; i++) {
    fragment.appendChild(createPinElement(properties[i]));
  }

  similarListElement.appendChild(fragment);
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

function createCardElement(property) {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = property.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = property.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getPropertyType(property);
  cardElement.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
  renderFeaturesLists(property, cardElement);
  cardElement.querySelector('.popup__description').textContent = property.offer.description;
  createPhotosLibrary(property, cardElement);
  cardElement.querySelector('.popup__avatar').src = property.author.avatar;

  return cardElement;
}

function createCardsList() {
  var similarCardsListElement = document.querySelector('.map');
  var fragmentCards = document.createDocumentFragment();
  for (var i = 0; i < properties.length; i++) {
    fragmentCards.appendChild(createCardElement(properties[i]));
  }

  similarCardsListElement.insertBefore(fragmentCards, similarCardsListElement.children[1]);
}

createPinsList();
createCardsList();
