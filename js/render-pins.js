'use strict';
(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84
  };
  var pinsWrapper = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');

  function createPinElement(property) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var similarPinTemplateButton = pinElement.content.querySelector('.map__pin');
    var buttonAvatar = similarPinTemplateButton.querySelector('img');
    similarPinTemplateButton.style.left = property.location.x - PIN.WIDTH / 2 + 'px';
    similarPinTemplateButton.style.top = property.location.y - PIN.HEIGHT + 'px';
    buttonAvatar.src = property.author.avatar;
    buttonAvatar.alt = property.offer.title;
    similarPinTemplateButton.addEventListener('click', function () {
      window.renderPins.removeCard();
      window.renderPopups.createCardsList(property);
      window.form.openPopup();
    });

    return similarPinTemplateButton;
  }

  window.renderPins = {
    renderPins: function (properties) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.NUMBER_OF_PROPERTY_CARDS; i++) {
        fragment.appendChild(createPinElement(properties[i]));
      }
      pinsWrapper.appendChild(fragment);
    },
    removeCard: function () {
      var map = document.querySelector('.map');
      var card = map.querySelector('.map__card');
      while (map.querySelector('.map__card')) {
        map.removeChild(card);
      }
    }
  };
})();

