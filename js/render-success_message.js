'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success');
  var successDiv = successTemplate.content.querySelector('.success');
  var successElement = successDiv.cloneNode(true);

  var renderSuccessMessage = function () {
    document.addEventListener('keydown', window.renderErrorMessag.onDocumentEscPress);
    main.appendChild(successElement);
  };

  var closeSuccessMessage = function () {
    main.removeChild(successElement);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', window.renderErrorMessag.onDocumentEscPress);
  };

  window.renderSuccessMessage = {
    renderSuccessMessage: renderSuccessMessage,
    closeSuccessMessage: closeSuccessMessage
  };
})();
