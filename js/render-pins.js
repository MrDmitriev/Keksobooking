'use strict';
(function () {
  var NUMBER_OF_PROPERTY_CARDS = 8;
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
      window.renderPopups.removeCard();
      window.renderPopups.createCardsList(property);
    });

    return similarPinTemplateButton;
  }
  function updatePins(props) {
    removePins();
    var fragment = document.createDocumentFragment();
    props.forEach(function (value, i) {
      fragment.appendChild(createPinElement(props[i]));
    });
    pinsWrapper.appendChild(fragment);
  }

  function renderPins(data) {
    var properties = data;
    var housingType = document.querySelector('#housing-type');
    housingType.addEventListener('change', function (event) {
      var propertyType = event.target.value;
      var filteredData = window.filterData(properties, propertyType);
      updatePins(filteredData);
    });
    removePins();
    var fragment = document.createDocumentFragment();
    properties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(properties[i]));
    });
    pinsWrapper.appendChild(fragment);
  }

  function removePins() {
    var mapPins = document.querySelector('.map__pins');
    var buttons = mapPins.querySelectorAll('button');
    for (var i = 1; i < buttons.length; i++) {
      mapPins.removeChild(buttons[i]);
    }
  }

  window.renderPins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();

