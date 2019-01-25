'use strict';
(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84
  };
  var pinsWrapper = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin');
  var housingFeatures = document.querySelector('#housing-features');
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
      window.popups.remove();
      window.popups.createList(property);
    });

    return similarPinTemplateButton;
  };

  var update = function (propertiesAfterFilter) {
    remove();
    var filteredProperties = window.filters.filterPropertiesNumber(propertiesAfterFilter);
    var fragment = document.createDocumentFragment();
    filteredProperties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProperties[i]));
    });
    pinsWrapper.appendChild(fragment);
  };

  var renderSamePins = window.debounce(function () {
    var filteredData = window.filters.filterProperties(properties);
    window.popups.remove();
    update(filteredData);
  });

  var render = function (data) {
    properties = data;
    var filteredProperties = window.filters.filterPropertiesNumber(properties);
    var mapFilters = document.querySelectorAll('.map__filter');
    var fragment = document.createDocumentFragment();

    mapFilters.forEach(function (item) {
      item.addEventListener('change', renderSamePins);
    });
    housingFeatures.addEventListener('click', renderSamePins);
    filteredProperties.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProperties[i]));
    });

    remove();
    pinsWrapper.appendChild(fragment);
  };

  var remove = function () {
    var buttons = pinsWrapper.querySelectorAll('button');
    [].forEach.call(buttons, function (it) {
      if (!it.classList.contains('map__pin--main')) {
        pinsWrapper.removeChild(it);
      }
    });
  };

  window.pins = {
    render: render,
    remove: remove,
    update: update
  };
})();

