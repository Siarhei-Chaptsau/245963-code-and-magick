'use strict';

// модуль функций для работаты с сервером данных
(function () {
  var SERVER_URL = 'https://1510.dump.academy/code-and-magick';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // обработчик для успешного запроса
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response); // функция обратного вызова, которая срабатывает при успешном выполнении запроса, response - Ответ сервера
      } else {
        onError(xhr.response); // функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
      }
    });

    // обработчик для ошибки при запросе
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () { // обработчик для истечения заданного времени
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 2000; // 2s
    return xhr;
  };

  // функции для глобальной области видимости
  window.backend = {
    // метод для отправки данных форм на сервер
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data); // объект FormData, содержит данные формы
    },

    // метод для загрузки данных
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
