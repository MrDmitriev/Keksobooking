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

    while (selectedPropertType.length > PROPERTIES_NUMBER_LIMIT) {
      selectedPropertType.splice(PROPERTIES_NUMBER_LIMIT);
      break;
    }
    return selectedPropertType;
  };

})();

