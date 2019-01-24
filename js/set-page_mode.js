'use strict';
(function () {
  var MAIN_PIN_Y = 375;
  var mainPin = document.querySelector('.map__pin--main');

  window.pageMode = {
    onResetClick: function (evt) {
      evt.preventDefault();
      window.pageMode.setPageMode();
    },
    changeFormCondition: function (isHidden) {
      var formsContainer = document.querySelector('.ad-form');
      var filtersContainerForm = document.querySelector('.map__filters');
      var fieldsets = formsContainer.querySelectorAll('fieldset');
      var resetButton = formsContainer.querySelector('.ad-form__reset');
      var filters = document.querySelector('.map').querySelectorAll('.map__filter');
      var checkboxes = document.querySelector('.map').querySelectorAll('.map__checkbox');
      formsContainer.classList.toggle('ad-form--disabled', isHidden);
      filtersContainerForm.classList.toggle('map__filters--disabled', isHidden);
      if (isHidden) {
        resetButton.removeEventListener('click', window.pageMode.onResetClick);
        formsContainer.reset();
      } else {
        resetButton.addEventListener('click', window.pageMode.onResetClick);
      }
      fieldsets.forEach(function (item) {
        item.disabled = isHidden;
      });
      filters.forEach(function (item) {
        item.disabled = isHidden;
      });
      checkboxes.forEach(function (item) {
        item.disabled = isHidden;
      });
    },
    removeMapFading: function () {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
    },

    setPageMode: function (active) {
      if (active) {
        window.manageForms.setElementsValidation();
        window.loadData(window.renderPins.renderPins, window.renderMessage.renderErrorMessage);
        window.pageMode.changeFormCondition(false);
        window.pageMode.removeMapFading();
      } else {
        var map = document.querySelector('.map');
        window.renderPins.removePins();
        window.renderPopups.removeCard();
        window.pageMode.changeFormCondition(true);
        mainPin.style.left = '';
        mainPin.style.top = MAIN_PIN_Y + 'px';
        map.classList.add('map--faded');
        window.manageForms.setAddress();
        mainPin.addEventListener('keydown', window.onMainPinEnterPress);
      }
    }
  };
})();
