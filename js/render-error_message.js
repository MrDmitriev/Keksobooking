'use strict';
(function () {
  var errorTemplate = document.querySelector('#error');
  var errorDiv = errorTemplate.content.querySelector('.error');
  var errorElement = errorDiv.cloneNode(true);
  var main = document.querySelector('main');
  var errorMessage = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeErrorMessage();
    }
  };

  var renderErrorMessage = function (errMessage) {
    errorButton.addEventListener('click', onErrorButtonClick);
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
  };

  var onErrorButtonClick = function () {
    window.dataLoad(window.renderPins.renderPins, renderErrorMessage);
    closeErrorMessage();
  };

  var closeErrorMessage = function () {
    main.removeChild(errorElement);
  };

  window.renderErrorMessage = {
    renderErrorMessage: renderErrorMessage,
    onDocumentEscPress: onDocumentEscPress
  };

})();

