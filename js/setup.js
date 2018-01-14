'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var similarListElement = setup.querySelector('.setup-similar-list'); // находим элемент, в который мы будем вставлять похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Находим шаблон-мага, который мы будем копировать (мы используем весь DocumentFragment, находящийся в шаблоне)

  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // Массив цветов плащей магов
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green']; // Массив цветов очей магов
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']; // Массив цветов фаерболла
  var QUANTITY_WIZARDS = 4;

  // функция генерации случайных элементов массива
  var getRandom = function (arr) {
    var randomIndex = Math.round(Math.random() * (arr.length - 1)); // получаем случайное число от 0 до индекса последнего элемента
    return arr[randomIndex];
  };

  setup.classList.remove('hidden'); // показываем окно настроек пользователя

  // Отрисуем шаблон-мага - функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true); // клонируем содержимое шаблон-мага
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя в шаблон-мага
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // добавляем цвет плаща в шаблон-мага
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // добавляем цвет глаз мага в шаблон-мага
    return wizardElement;
  };

  // Функция загрузки данных
  var addWizards = function (wizard) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizard.length > QUANTITY_WIZARDS ? QUANTITY_WIZARDS : wizard.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) { // отображать-вставлять будем только 4 мага из загруженных или меньше
      fragment.appendChild(renderWizard(wizard[i]));
    }
    similarListElement.appendChild(fragment); // вставляем отрисованного мага в нужное поле
  };

  // Функция при успешном результате загрузки
  var successHandler = function () {
    setup.classList.add('hidden');
  };

  // Функция вывода ошибки при отправке и загрузке
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successHandler, errorHandler); // при загрузке
  });

  // ----- Drag and drop ----- //

  var shopElement = document.querySelector('.setup-artifacts-shop'); // магазин артефактов
  var artifactsElement = document.querySelector('.setup-artifacts'); // рюкзак артефактов
  var draggedItem = null;

  // cрабатывает когда элемент начал перемещаться
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  // срабатывает каждые несколько сотен милисекунд когда перемещаемый элемент оказывается над зоной, принимающей перетаскиваемые элементы
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // cрабатывает, когда перемещаемый элемент попадает на элемент-назначение
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow'; // подсветка эл-та-поля над которым перемащается объект
    evt.preventDefault();
  });

  // событие запускается при перемещении элемента
  artifactsElement.addEventListener('drag', function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  // запускается при перемещении элемента
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.appendChild(draggedItem);
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  // запускается в момент перетаскивания, когда курсор мыши выходит за пределы элемента
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = ''; // убираем подсветку эл-та-поля над которым перемащался объект
    evt.preventDefault();
  });

  // ----- фильтрация данных с сервера ----- //

  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;
  // функция для устранения 'дребезг'
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var coatColor; // цвет пальто
  var eyesColor;
  var fireballColor;
  var wizards = []; // массив загруженных волшебников

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }
    return rank;
  };

  // функция фильтрации
  var updateWizards = function () {
    addWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // Функция при успешном результате отправки
  var successHandlerLoad = function (data) {
    wizards = data.slice(0); // массив волшебников берётся из загруженных данных
    updateWizards(); // фильтрация данных
    setup.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
  };
  window.backend.load(successHandlerLoad, errorHandler); // при отправке

  // ----- использование callbacks ----- //

  // Функция изменения цвета
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  // Функция изменения фона
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // Обработчик событий - изменение цвета мантии персонажа по нажатию
  wizardCoat.addEventListener('click', function () {
    coatColor = getRandom(WIZARD_COAT_COLOR);
    window.colorizeElement(wizardCoat, coatColor, fillElement);
    debounce(updateWizards, DEBOUNCE_INTERVAL); // фильтрация данных
  });

  // Обработчик событий - изменение цвета глаз персонажа по нажатию
  wizardEyes.addEventListener('click', function () {
    eyesColor = getRandom(WIZARD_EYES_COLOR);
    window.colorizeElement(wizardEyes, eyesColor, fillElement);
    debounce(updateWizards, DEBOUNCE_INTERVAL); // фильтрация данных
  });

  // Обработчик событий - изменение цвета фаерболов по нажатию
  wizardFireball.addEventListener('click', function () {
    fireballColor = getRandom(WIZARD_FIREBALL_COLOR);
    window.colorizeElement(wizardFireball, fireballColor, changeElementBackground);
    debounce(updateWizards, DEBOUNCE_INTERVAL); // фильтрация данных
  });
})();
