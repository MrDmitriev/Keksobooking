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
  }

  function makePhotoImg(property, i) {
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
      fragmentPhotos.appendChild(makePhotoImg(property, j));
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
    mapClose.addEventListener('click', function () {
      cardElement.classList.add('hidden');
    });

    return cardElement;
  }

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  function removeCard() {
    var map = document.querySelector('.map');
    var card = map.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  }

  function createCardsList(properties) {
    var similarCardsListElement = document.querySelector('.map');
    var fragmentCards = document.createDocumentFragment();
    document.addEventListener('keydown', window.renderPopups.onPopupEscPress);
    fragmentCards.appendChild(createCardElement(properties));
    similarCardsListElement.insertBefore(fragmentCards, similarCardsListElement.children[1]);
  }

  window.renderPopups = {
    removeCard: removeCard,
    createCardsList: createCardsList
  };
})();

