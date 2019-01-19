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
      window.renderPopups.removeCard();
      window.renderPopups.createCardsList(property);
    });

    return similarPinTemplateButton;
  }
  function updatePins(props) {
    removePins();
    var filteredProps = window.dataSort.basicFilter(props);
    var fragment = document.createDocumentFragment();
    filteredProps.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProps[i]));
    });
    pinsWrapper.appendChild(fragment);
  }

  function renderPins(data) {
    var properties = data;
    var filteredProps = window.dataSort.basicFilter(properties);
    var housingType = document.querySelector('#housing-type');
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');
    var housingPrice = document.querySelector('#housing-price');
    // var housingFeatures = document.querySelector('#housing-features');
    /*housingFeatures.addEventListener('click', function () {
      var filteredData = window.dataSort.mainFilter(properties);
      window.renderPopups.removeCard();
      updatePins(filteredData);
    });*/
    housingType.addEventListener('change', function () {
      var filteredData = window.dataSort.mainFilter(properties);
      window.renderPopups.removeCard();
      updatePins(filteredData);
    });
    housingRooms.addEventListener('change', function () {
      var filteredData = window.dataSort.mainFilter(properties);
      window.renderPopups.removeCard();
      updatePins(filteredData);
    });
    housingGuests.addEventListener('change', function () {
      var filteredData = window.dataSort.mainFilter(properties);
      window.renderPopups.removeCard();
      updatePins(filteredData);
    });
    housingPrice.addEventListener('change', function () {
      var filteredData = window.dataSort.mainFilter(properties);
      window.renderPopups.removeCard();
      updatePins(filteredData);
    });
    removePins();
    var fragment = document.createDocumentFragment();
    filteredProps.forEach(function (value, i) {
      fragment.appendChild(createPinElement(filteredProps[i]));
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

