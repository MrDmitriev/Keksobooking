'use strict';
(function () {
  var PROPERTIES_NUMBER_LIMIT = 5;
  var housingPrice = document.querySelector('#housing-price');
  var housingGuests = document.querySelector('#housing-guests');
  var propertiesBeforeFilter = [];

  function checkSelectedFeatures(item, massive) {
    for (var i = 0; i < massive.length; i++) {
      if (item.offer.features.includes(massive[i])) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  var filterPropertiesNumber = function (data) {
    var filteredDatas = [];
    if (data.length > PROPERTIES_NUMBER_LIMIT) {
      for (var i = 0; i < PROPERTIES_NUMBER_LIMIT; i++) {
        filteredDatas[i] = data[i];
      }
    } else {
      filteredDatas = data;
    }
    return filteredDatas;
  };

  function filterPrice(item) {
    switch (housingPrice.value) {
      case 'low':
        return item.offer.price < 10000;
      case 'middle':
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      default:
        return item.offer.price > 50000;
    }
  }

  function filterGuests(item, filterValues) {
    return housingGuests.value === '0' ? item.offer.guests <= parseInt(filterValues[2], 10) : item.offer.guests >= parseInt(filterValues[2], 10);
  }

  function getChoosedValues() {
    var housingType = document.querySelector('#housing-type');
    var housingRooms = document.querySelector('#housing-rooms');
    var filters = [housingType, housingRooms, housingGuests, housingPrice];
    var filtersValues = [];
    filters.forEach(function (item) {
      filtersValues.push(item.value);
    });
    return filtersValues;
  }

  function filterProperties(properties) {
    var filtersValues = getChoosedValues();
    var housingFeatures = document.querySelector('#housing-features');
    var checkboxes = housingFeatures.querySelectorAll('.map__checkbox');
    var checkboxesChecked = [].filter.call(checkboxes, function (el) {
      return el.checked;
    });
    var checkboxesCheckedValues = [];
    checkboxesChecked.forEach(function (item) {
      checkboxesCheckedValues.push(item.value);
    });
    var filteredProperties = properties.filter(function (item) {
      return filtersValues[0] === 'any' ? true : item.offer.type === filtersValues[0];
    }).filter(function (item) {
      return filtersValues[1] === 'any' ? true : item.offer.rooms === parseInt(filtersValues[1], 10);
    }).filter(function (item) {
      return filtersValues[2] === 'any' ? true : filterGuests(item, filtersValues);
    }).filter(function (item) {
      return filtersValues[3] === 'any' ? true : filterPrice(item);
    }).filter(function (item) {
      return checkboxesCheckedValues.length < 1 ? true : checkSelectedFeatures(item, checkboxesCheckedValues);
    });
    return filteredProperties;
  }

  var filterChooseHandler = function () {
    var filteredData = filterProperties(propertiesBeforeFilter);
    window.renderPopups.removeCard();
    window.renderPins.updatePins(filteredData);
  };

  window.filterData = {
    filterPropertiesNumber: filterPropertiesNumber,
    filterProperties: filterProperties,
    filterChooseHandler: filterChooseHandler
  };
})();
