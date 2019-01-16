'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('select', function () {
    var propertyType = event.target.value;
    filterData(data, propertyType);
  });

  var filterData = function (data, propertyType) {
    var selectedPropertType = data.filter(function (property) {
      return property.offer.type === propertyType;
    });
    return selectedPropertType;
  };

  window.dataSort = {
    filterData: filterData
  };
})();

