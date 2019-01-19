'use strict';
(function () {
  var PROPERTIES_NUMBER_LIMIT = 5;
  var housingPrice = document.querySelector('#housing-price');
  var housingGuests = document.querySelector('#housing-guests');


  // var choosedCheckbxs = ['wifi', 'parking', 'washer'];
  // var properties[1] = ["wifi","dishwasher", "parking", "washer", "elevator", "conditioner"];
  /*
    var filter2 = filter1.filter(function (item) {
      return checkedBoxesValues.length === 0 ? true : controlFeatures(item, checkedBoxesValues);
    });

    */

  function controlFeatures(item, massive) {
    for (var i = 0; i < massive.length; i++) {
      if (item.offer.features.includes(massive[i])) {
        continue;
      } else {
        return false;
      }
    }
  }

  var basicFilter = function (data) {
    var filteredData = [];
    if (data.length > PROPERTIES_NUMBER_LIMIT) {
      for (var i = 0; i < PROPERTIES_NUMBER_LIMIT; i++) {
        filteredData[i] = data[i];
      }
    } else {
      filteredData = data;
    }
    return filteredData;
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
    var filtersValue = [];
    filters.forEach(function (item) {
      filtersValue.push(item.value);
    });
    return filtersValue;
  }

  function mainFilter(properties) {
    var filterValues = getChoosedValues();
    var housingFeatures = document.querySelector('#housing-features');
    var checkBoxes = housingFeatures.querySelectorAll('.map__checkbox');
    var checkBoxesChecked = [].filter.call(checkBoxes, function (el) {
      return el.checked;
    });
    var checkBoxesCheckedValues = [];
    checkBoxesChecked.forEach(function (item) {
      checkBoxesCheckedValues.push(item.value);
    });
    var filter1 = properties.filter(function (item) {
      return filterValues[0] === 'any' ? true : item.offer.type === filterValues[0];
    }).filter(function (item) {
      return filterValues[1] === 'any' ? true : item.offer.rooms === parseInt(filterValues[1], 10);
    }).filter(function (item) {
      return filterValues[2] === 'any' ? true : filterGuests(item, filterValues);
    }).filter(function (item) {
      return filterValues[3] === 'any' ? true : filterPrice(item);
    }).filter(function (item) {
      return checkBoxesCheckedValues.length < 1 ? true : controlFeatures(item, checkBoxesCheckedValues);
    });
    return filter1;
  }

  window.dataSort = {
    basicFilter: basicFilter,
    mainFilter: mainFilter
  };
})();

