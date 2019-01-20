'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.dataUpload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.timeout = 1000;
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();


