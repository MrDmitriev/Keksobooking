'use strict';
(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84
  };
  var pinsWrapper = document.querySelector('.map__pins');
  var mainPin = pinsWrapper.querySelector('.map__pin--main');
  var similarPinTemplate = document.querySelector('#pin');
  var properties = [];

  var createPinElement = function (property) {
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
  };

  var updatePins = function (propertiesAfterFilter) {
    removePins();
    var filteredProperties = window.filterData.filterPropertiesNumber(propertiesAfterFilter);
    var fragment = document.createDocumentFragment();
    filteredProperties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProperties[i]));
    });
    pinsWrapper.appendChild(fragment);
  };

  var renderSamePins = window.debounce(function () {
    var filteredData = window.filterData.filterProperties(properties);
    window.renderPopups.removeCard();
    updatePins(filteredData);
  });

  var renderPins = function (data) {
    properties = data;
    var filteredProperties = window.filterData.filterPropertiesNumber(properties);
    var mapFilters = document.querySelector('.map__filters').querySelectorAll('.map__filter');
    var fragment = document.createDocumentFragment();
    var housingFeatures = document.querySelector('#housing-features');

    mapFilters.forEach(function (item) {
      item.addEventListener('change', renderSamePins);
    });
    housingFeatures.addEventListener('click', renderSamePins);
    filteredProperties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProperties[i]));
    });

    removePins();
    pinsWrapper.appendChild(fragment);
  };

  var removePins = function () {
    var buttons = pinsWrapper.querySelectorAll('button');
    for (var i = 1; i < buttons.length; i++) {
      pinsWrapper.removeChild(buttons[i]);
    }
  };

  window.renderPins = {
    renderPins: renderPins,
    removePins: removePins,
    updatePins: updatePins
  };
})();

