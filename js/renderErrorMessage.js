'use strict';
(function () {
  window.renderErrorMessage = function (errMessage) {
    var errorTemplate = document.querySelector('#error');
    var errorDiv = errorTemplate.content.querySelector('.error');
    var errorElement = errorDiv.cloneNode(true);
    var main = document.querySelector('main');
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      window.dataLoad(window.renderPins.renderPins, window.renderErrorMessage);
      errorElement.classList.add('hidden');
    });
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
  };
})();

