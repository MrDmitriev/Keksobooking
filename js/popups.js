'use strict';
(function () {
  var PHOTO = {
    WIDTH: '45',
    HEIGHT: '40'
  };
  var AccomodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };
  var map = document.querySelector('.map');

  var getPropertyType = function (property) {
    var textContent = '';
    switch (property.offer.type) {
      case 'flat':
        textContent = AccomodationType.FLAT;
        break;
      case 'bungalo':
        textContent = AccomodationType.BUNGALO;
        break;
      case 'house':
        textContent = AccomodationType.HOUSE;
        break;
      case 'palace':
        textContent = AccomodationType.PALACE;
    }

    return textContent;
  };

  var replacePhotos = function (container, oldPhotos, newPhotos) {
    var fragment = document.createDocumentFragment();
    oldPhotos.forEach(function (item) {
      container.removeChild(item);
    });
    newPhotos.forEach(function (item) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = item;
      img.width = PHOTO.WIDTH;
      img.height = PHOTO.HEIGHT;
      fragment.appendChild(img);
    });

    container.appendChild(fragment);
  };

  var replaceFeatures = function (container, oldFeatures, newFeatures) {
    var fragment = document.createDocumentFragment();
    oldFeatures.forEach(function (item) {
      container.removeChild(item);
    });
    newFeatures.forEach(function (item) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + item);
      fragment.appendChild(li);
    });

    container.appendChild(fragment);
  };

  var createCardElement = function (property) {
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = similarCardTemplate.cloneNode(true);
    var mapClose = cardElement.querySelector('.popup__close');
    var featuresContainer = cardElement.querySelector('.popup__features');
    var features = cardElement.querySelectorAll('.popup__feature');
    var photosContainer = cardElement.querySelector('.popup__photos');
    var photos = cardElement.querySelectorAll('.popup__photo');
    cardElement.querySelector('.popup__title').textContent = property.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = property.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getPropertyType(property);
    cardElement.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = property.offer.description;
    cardElement.querySelector('.popup__avatar').src = property.author.avatar;
    replaceFeatures(featuresContainer, features, property.offer.features);
    replacePhotos(photosContainer, photos, property.offer.photos);
    mapClose.addEventListener('click', function () {
      removeCard();
    });

    return cardElement;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeCard();
    }
  };

  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var createList = function (properties) {
    document.addEventListener('keydown', onPopupEscPress);
    map.insertBefore(createCardElement(properties), map.children[1]);
  };

  window.popups = {
    remove: removeCard,
    createList: createList
  };
})();

