'use strict';
(function () {
  var PROPERTIES_NUMBER_LIMIT = 5;

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

  var filterMap = {
    housingType: 'offer'.type,

  };

  function isAnyPropertyType(value) {
    if (value === 'any') {
      return true;
    }
  }
  function getChoosedValues() {
    var housingType = document.querySelector('#housing-type');
    // var housingPrice = document.querySelector('#housing-price');
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');

    var filters = [housingType, housingRooms, housingGuests];
    var filtersValue = [];
    filters.forEach(function (item) {
      filtersValue.push(item.value);
    });
    return filtersValue;
  }

  // filterValues = ['house', '2', 'any']
  /* property = [property.offer.type, property.offer.price, property.offer.rooms, property.offer.guests] */

  function mainFilter(properties) {
    var filterValues = getChoosedValues();
    var filter1 = properties.filter(function (item) {
      return filterValues[0] === 'any' ? true : item.offer.type === filterValues[0];
    });
    var filter2 = filter1.filter(function (item) {
      return filterValues[1] === 'any' ? true : item.offer.rooms === parseInt(filterValues[1], 10);
    });
    var filter3 = filter2.filter(function (item) {
      return filterValues[2] === 'any' ? true : item.offer.guests >= parseInt(filterValues[2], 10);
    });

    return filter3;
  }

  var filterHousingType = function (data, housingType) {
    var selectedHousingType = [];
    if (housingType === 'any') {
      selectedHousingType = data;
    } else {
      selectedHousingType = data.filter(function (property) {
        return property.offer.type === housingType;
      });
    }
    var filteredData = window.dataSort.basicFilter(selectedHousingType);
    return filteredData;
  };

  var filterHousingPrice = function (data, housingPrice) {
    // -var
  };

  window.dataSort = {
    filterHousingType: filterHousingType,
    basicFilter: basicFilter,
    mainFilter: mainFilter
  };
})();

