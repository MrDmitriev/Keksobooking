'use strict';
(function () {
  var PHOTO = {
    WIDTH: '45',
    HEIGHT: '40'
  };
  var map = document.querySelector('.map');
  var card = map.querySelector('.map__card');

  var getPropertyType = function (property) {
    var textContent = '';
    switch (property.offer.type) {
      case 'flat':
        textContent = 'Квартира';
        break;
      case 'bungalo':
        textContent = 'Бунгало';
        break;
      case 'house':
        textContent = 'Дом';
        break;
      case 'palace':
        textContent = 'Дворец';
    }

    return textContent;
  };

  var replacePhotos = function (conteiner, oldPhotos, newPhotos) {
    var fragment = document.createDocumentFragment();
    oldPhotos.forEach(function (item) {
      conteiner.removeChild(item);
    });
    newPhotos.forEach(function (item) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = item;
      img.width = PHOTO.WIDTH;
      img.height = PHOTO.HEIGHT;
      fragment.appendChild(img);
    });

    conteiner.appendChild(fragment);
  };

  var replaceFeatures = function (conteiner, oldFeatures, newFeatures) {
    var fragment = document.createDocumentFragment();
    oldFeatures.forEach(function (item) {
      conteiner.removeChild(item);
    });
    newFeatures.forEach(function (item) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + item);
      fragment.appendChild(li);
    });

    conteiner.appendChild(fragment);
  };

  var createCardElement = function (property) {
    var similarCardTemplate = document.querySelector('#card').content.card;
    var cardElement = similarCardTemplate.cloneNode(true);
    var mapClose = cardElement.querySelector('.popup__close');
    var featuresConteiner = cardElement.querySelector('.popup__features');
    var features = cardElement.querySelectorAll('.popup__feature');
    var photosConteiner = cardElement.querySelector('.popup__photos');
    var photos = cardElement.querySelectorAll('.popup__photo');
    cardElement.querySelector('.popup__title').textContent = property.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = property.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getPropertyType(property);
    cardElement.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = property.offer.description;
    cardElement.querySelector('.popup__avatar').src = property.author.avatar;
    replaceFeatures(featuresConteiner, features, property.offer.features);
    replacePhotos(photosConteiner, photos, property.offer.photos);
    mapClose.addEventListener('click', function () {
      remove();
    });

    return cardElement;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      remove();
    }
  };

  var remove = function () {
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
    remove: remove,
    createList: createList
  };
})();

