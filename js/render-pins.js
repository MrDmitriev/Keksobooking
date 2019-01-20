'use strict';
(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84
  };
  var pinsWrapper = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');
  var properties = [];

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
  function updatePins(propertiesAfterFilter) {
    removePins();
    var properties = window.filterData.filterPropertiesNumber(propertiesAfterFilter);
    var fragment = document.createDocumentFragment();
    properties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(properties[i]));
    });
    pinsWrapper.appendChild(fragment);
  }

  var renderSamePins = function () {
    var filteredData = window.filterData.filterProperties(properties);
    window.renderPopups.removeCard();
    window.setTimeout(function () {
      updatePins(filteredData);
    }, 500)
  };

  function renderPins(data) {
    properties = data;
    var filteredProperties = window.filterData.filterPropertiesNumber(properties);
    var mapFilters = document.querySelector('.map__filters').querySelectorAll('.map__filter');
    var fragment = document.createDocumentFragment();
    var housingFeatures = document.querySelector('#housing-features');

    mapFilters.forEach(item => item.addEventListener('change', renderSamePins));
    housingFeatures.addEventListener('click', renderSamePins);
    filteredProperties.forEach((value, i) => fragment.appendChild(createPinElement(filteredProperties[i])));

    removePins();
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
    removePins: removePins,
    updatePins: updatePins
  };
})();

