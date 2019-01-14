'use strict';
(function () {
  window.renderErrorMessage = function (errMessage) {
    var errorTemplate = document.querySelector('#error');
    var errorDiv = errorTemplate.content.querySelector('.error');
    var errorElement = errorDiv.cloneNode(true);
    var main = document.querySelector('main');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
  };
})();

