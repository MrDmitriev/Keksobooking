'use strict';
(function () {
  var SUCCESS_LOAD = 200;
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', 'load');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_LOAD) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, 'load');
      }
    });

    xhr.timeout = TIMEOUT_VALUE;
    xhr.open('GET', URL);
    xhr.send();
  };
})();


