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


    selectedPropertType.splice(PROPERTIES_NUMBER_LIMIT);

    return selectedPropertType;
  };

})();

