'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success');
  var successDiv = successTemplate.content.querySelector('.success');
  var successElement = successDiv.cloneNode(true);

  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeSuccessMessage();
    }
  };

  var renderSuccessMessage = function () {
    document.addEventListener('keydown', onDocumentEscPress);
    main.appendChild(successElement);
  };

  var closeSuccessMessage = function () {
    main.removeChild(successElement);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  window.renderSuccessMessage = {
    renderSuccessMessage: renderSuccessMessage,
    closeSuccessMessage: closeSuccessMessage,
    onDocumentEscPress: onDocumentEscPress
  };
})();
