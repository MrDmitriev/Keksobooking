'use strict';
(function () {
  var MAIN_PIN_Y = 375;
  window.pageMode = {
    onResetClick: function (evt) {
      evt.preventDefault();
      window.pageMode.pageMode();
    },
    changeFormCondition: function (isHidden) {
      var adFormDiv = document.querySelector('.ad-form');
      var fieldsets = adFormDiv.querySelectorAll('fieldset');
      var form = document.querySelector('.notice').querySelector('form');
      form.classList.toggle('ad-form--disabled', isHidden);
      var resetButton = form.querySelector('.ad-form__reset');
      if (isHidden) {
        resetButton.removeEventListener('click', window.pageMode.onResetClick);
        form.reset();
      } else {
        resetButton.addEventListener('click', window.pageMode.onResetClick);
      }
      fieldsets.forEach(function (item) {
        item.disabled = isHidden;
      });
    },
    removeMapFading: function () {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
    },

    pageMode: function (active) {
      if (active) {
        window.form.setElementsValidation();
        window.dataLoad(window.renderPins.renderPins, window.renderErrorMessage);
        window.pageMode.changeFormCondition(false);
        window.pageMode.removeMapFading();
      } else {
        var map = document.querySelector('.map');
        var mainPin = document.querySelector('.map__pin--main');
        window.renderPins.removePins();
        window.renderPopups.removeCard();
        window.pageMode.changeFormCondition(true);
        mainPin.style.left = '';
        mainPin.style.top = MAIN_PIN_Y + 'px';
        map.classList.add('map--faded');
        window.form.setAddress();
      }
    }
  };
})();
