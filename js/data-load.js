'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var successHandler = function (properties) {
    window.renderPins.renderPins(properties);
  };

  var errorHandler = function (errMessage) {
    var errorTemplate = document.querySelector('#error');
    var errorDiv = errorTemplate.content.querySelector('.error');
    var errorElement = errorDiv.cloneNode(true);
    var main = document.querySelector('main');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });


    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  window.data = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();


