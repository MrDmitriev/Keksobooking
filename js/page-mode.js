'use strict';
(function () {
  var MAIN_PIN_Y = 375;
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  window.pageMode = {
    onResetClick: function (evt) {
      evt.preventDefault();
      window.pageMode.set();
    },
    changeFormCondition: function (isHidden) {
      var formsConteiner = document.querySelector('.ad-form');
      var fieldsets = formsConteiner.querySelectorAll('fieldset');
      formsConteiner.classList.toggle('ad-form--disabled', isHidden);
      var resetButton = formsConteiner.querySelector('.ad-form__reset');
      if (isHidden) {
        resetButton.removeEventListener('click', window.pageMode.onResetClick);
        formsConteiner.reset();
      } else {
        resetButton.addEventListener('click', window.pageMode.onResetClick);
      }
      fieldsets.forEach(function (item) {
        item.disabled = isHidden;
      });
    },
    activate: function () {
      map.classList.remove('map--faded');
    },

    set: function (active) {
      if (active) {
        window.forms.setValidation();
        window.loadData(window.pins.render, window.message.renderError);
        window.pageMode.changeFormCondition(false);
        window.pageMode.activate();
      } else {
        window.pins.remove();
        window.popups.remove();
        window.pageMode.changeFormCondition(true);
        mainPin.style.left = '';
        mainPin.style.top = MAIN_PIN_Y + 'px';
        map.classList.add('map--faded');
        window.forms.setAddress();
        mainPin.addEventListener('keydown', window.onMainPinEnterPress);
      }
    }
  };
})();
