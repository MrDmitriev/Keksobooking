'use strict';
(function () {
  var onSelectClick = function () {};
  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('select', function () {
    var propertyType = event.target.value;
    var filteredData = window.filterData(newData, propertyType);
    window.renderPins.renderPins(filteredData);
  });

  window.filterData = function (data, propertyType) {
    var selectedPropertType = data.filter(function (property) {
      return property.offer.type === propertyType;
    });
    return selectedPropertType;
  };

  window.dataSort = {
    filterData: filterData
  };
})();

