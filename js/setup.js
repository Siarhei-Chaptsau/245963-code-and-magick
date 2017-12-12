'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // Массив имён магов
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // Массив фамилий магов
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // Массив цветов плащей магов
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green']; // Массив цветов очей магов
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']; // Массив цветов фаерболла

  var setup = document.querySelector('.setup');
  var userWizard = setup.querySelector('.setup-wizard');
  var fireball = setup.querySelector('.setup-fireball-wrap');

  var similarListElement = setup.querySelector('.setup-similar-list'); // находим элемент, в который мы будем вставлять похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Находим шаблон-мага, который мы будем копировать (мы используем весь DocumentFragment, находящийся в шаблоне)

  /* var getRandomNumber = function (min, max) { // функция рандома возвращает случайное число в заданном пределе
    return Math.round(Math.random() * (max - min) + min);
  }; */

  var getRandom = function (arr) { // функция генерации случайных элементов массива
    var randomIndex = Math.round(Math.random() * (arr.length - 1)); // получаем случайное число от 0 до индекса последнего элемента
    return arr[randomIndex];
  };

  // показываем окно настроек пользователя
  setup.classList.remove('hidden');

  // Массив магов с именами и цветами
  var wizards = [
    {
      name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
      coatColor: getRandom(WIZARD_COAT_COLOR),
      eyesColor: getRandom(WIZARD_EYES_COLOR)
    },
    {
      name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
      coatColor: getRandom(WIZARD_COAT_COLOR),
      eyesColor: getRandom(WIZARD_EYES_COLOR)
    },
    {
      name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
      coatColor: getRandom(WIZARD_COAT_COLOR),
      eyesColor: getRandom(WIZARD_EYES_COLOR)
    },
    {
      name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
      coatColor: getRandom(WIZARD_COAT_COLOR),
      eyesColor: getRandom(WIZARD_EYES_COLOR)
    }
  ];

  // Отрисуем шаблон-мага - функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true); // клонируем содержимое шаблон-мага
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя в шаблон-мага
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавляем цвет плаща в шаблон-мага
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавляем цвет глаз мага в шаблон-мага
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  // вставляем склонированного шаблон-мага в нужное поле
  similarListElement.appendChild(fragment);
  // показываем блок с похожими персонажами
  document.querySelector('.setup-similar').classList.remove('hidden');

  // ============ Обработчики событий ============ //

  // Изменение цвета мантии персонажа по нажатию
  userWizard.querySelector('.wizard-coat').addEventListener('click', function () {
    event.target.style.fill = getRandom(WIZARD_COAT_COLOR);
  });

  // Изменение цвета глаз персонажа по нажатию
  userWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
    event.target.style.fill = getRandom(WIZARD_EYES_COLOR);
  });

  // Изменение цвета фаерболов по нажатию
  fireball.addEventListener('click', function () {
    fireball.style.background = getRandom(WIZARD_FIREBALL_COLOR);
  });
})();
