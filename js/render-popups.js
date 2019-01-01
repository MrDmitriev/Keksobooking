'use strict';
(function () {
  var ESC_KEYCODE = 27;

  function hideUnusedFeatures(property, template) {
    for (var i = 0; i < window.data.FEATURES.length; i++) {
      var array = property.offer.features;
      var element = window.data.FEATURES[i];
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
    for (var j = 0; j < window.data.PHOTOS_NUMBER; j++) {
      similarPhotoTemplate.removeChild(similarPhotoTemplate.firstChild);
      fragmentPhotos.appendChild(makePhotoImg(similarPhotoTemplate, property, j));
    }
    similarPhotoTemplate.appendChild(fragmentPhotos);
    template.appendChild(similarPhotoTemplate);
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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.classList.add('hidden');
    window.removeEventListener('keydown', onPopupEscPress);
  };

  window.renderPopups = {
    openPopup: function () {
      var mapCard = document.querySelector('.map__card');
      mapCard.classList.remove('hidden');
      window.addEventListener('keydown', window.pageMode.onPopupEscPress);
    },
    createCardsList: function (properties) {
      var similarCardsListElement = document.querySelector('.map');
      var fragmentCards = document.createDocumentFragment();
      fragmentCards.appendChild(createCardElement(properties));
      similarCardsListElement.insertBefore(fragmentCards, similarCardsListElement.children[1]);
    },
    createPropertyMap: function () {
      var properties = window.data.getRandomPropertyConfigs();
      window.renderPins.renderPins(properties);
      window.renderPopups.createCardsList(properties[1]);
    }
  };
})();

