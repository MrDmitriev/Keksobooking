'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.dataLoad = function (onSuccess, onError) {
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

  window.saveData = function (data) {
    var newData = data;
    return newData;
  };
})();


