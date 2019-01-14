'use strict';

window.pageMode = {
  onResetClick: function (evt) {
    evt.preventDefault();
    window.pageMode.pageMode();
  },
  changeFormCondition: function (isHidden) {
    var adFormDiv = document.querySelector('.ad-form');
    var fieldsets = adFormDiv.querySelectorAll('fieldset');
    var adForm = document.querySelector('.notice').querySelector('form');
    adForm.classList.toggle('ad-form--disabled', isHidden);
    var resetForm = adForm.querySelector('.ad-form__reset');
    if (isHidden) {
      resetForm.removeEventListener('click', window.pageMode.onResetClick);
    } else {
      resetForm.addEventListener('click', window.pageMode.onResetClick);
    }
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isHidden;
    }
  },
  removeMapFading: function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  },
  pageMode: function (active) {
    if (active) {
      window.form.setElementsValidation();
      window.loadData(window.data.successHandler, window.data.errorHandler);
      window.pageMode.changeFormCondition(false);
      window.pageMode.removeMapFading();
    } else {
      var map = document.querySelector('.map');
      window.renderPins.removePins();
      window.renderPopups.removeCard();
      window.pageMode.changeFormCondition(true);
      map.classList.add('map--faded');
      window.form.setAddress();
    }
  }
};

