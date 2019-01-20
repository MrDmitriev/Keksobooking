'use strict';
(function () {
  var errorTemplate = document.querySelector('#error');
  var errorDiv = errorTemplate.content.querySelector('.error');
  var errorElement = errorDiv.cloneNode(true);
  var main = document.querySelector('main');
  var errorMessage = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  var successTemplate = document.querySelector('#success');
  var successDiv = successTemplate.content.querySelector('.success');
  var successElement = successDiv.cloneNode(true);

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
    if (main.querySelector('.success')) {
      main.removeChild(successElement);
    } else if (main.querySelector('.error')) {
      main.removeChild(errorElement);
    }
  };

  var renderSuccessMessage = function () {
    document.addEventListener('keydown', window.renderMessage.onDocumentEscPress);
    main.appendChild(successElement);
  };

  var closeSuccessMessage = function () {
    main.removeChild(successElement);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', window.renderMessage.onDocumentEscPress);
  };

  window.renderMessage = {
    renderErrorMessage: renderErrorMessage,
    onDocumentEscPress: onDocumentEscPress,
    renderSuccessMessage: renderSuccessMessage,
    closeSuccessMessage: closeSuccessMessage
  };

})();

