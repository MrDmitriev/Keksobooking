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
  var form = document.querySelector('.ad-form');

  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeErrorMessage();
    }
  };

  var renderError = function (errMessage, type) {
    errorButton.addEventListener('click', function () {
      if (type === 'load') {
        window.loadData(window.pins.render, renderError);
      } else if (type === 'upload') {
        window.dataUpload(new FormData(form), window.forms.uploadFormData, renderError);
      }
      closeErrorMessage();
    });
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
    document.addEventListener('keydown', onDocumentEscPress);
  };

  var closeErrorMessage = function () {
    if (main.querySelector('.success')) {
      main.removeChild(successElement);
    } else if (main.querySelector('.error')) {
      main.removeChild(errorElement);
    }
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  var renderSuccess = function () {
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', closeSuccessMessage);
    main.appendChild(successElement);
  };

  var closeSuccessMessage = function () {
    main.removeChild(successElement);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  window.message = {
    renderError: renderError,
    renderSuccess: renderSuccess
  };
})();

