'use strict';
(function () {
  var PROPERTIES_NUMBER_LIMIT = 5;
  window.filterData = function (data, propertyType) {
    var selectedPropertType = [];
    if (propertyType === 'any') {
      selectedPropertType = data;
    } else {
      selectedPropertType = data.filter(function (property) {
        return property.offer.type === propertyType;
      });
    }
    var filteredData = window.basicFilter(selectedPropertType);
    return filteredData;
  };

  window.basicFilter = function (data) {
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
})();

