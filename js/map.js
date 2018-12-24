'use strict';
(function () {
  window.map = {
    ADDRESS_Y_INT_MIN: 130,
    ADDRESS_Y_INT_MAX: 630,
    createPropertyMap: function () {
      var properties = window.data.getRandomPropertyConfigs();
      for (var i = 0; i < window.data.NUMBER_OF_PROPERTY_CARDS; i++) {
        createPinsList(properties[i]);
      }
      createCardsList(properties[1]);
    }
  };

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

  function createPinElement(property) {
    var similarPinTemplate = document.querySelector('#pin');
    var pinElement = similarPinTemplate.cloneNode(true);
    var similarPinTemplateButton = pinElement.content.querySelector('.map__pin');
    var buttonAvatar = similarPinTemplateButton.querySelector('img');
    similarPinTemplateButton.style.left = property.location.x - window.form.MAIN_PIN_SIDE / 2 + 'px';
    similarPinTemplateButton.style.top = property.location.y - window.form.MAIN_PIN_HEIGHT + 'px';
    buttonAvatar.src = property.author.avatar;
    buttonAvatar.alt = property.offer.title;
    similarPinTemplateButton.addEventListener('click', function () {
      rewriteCardElement(property);
      window.form.openPopup();
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

  function rewriteCardElement(property) {
    var oldArticle = document.querySelector('.map__card');
    var newArticle = createCardElement(property);
    var parentArticle = document.querySelector('.map');
    parentArticle.replaceChild(newArticle, oldArticle);
  }
})();

