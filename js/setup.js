'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // Массив имён магов
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // Массив фамилий магов
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // Массив цветов плащей магов
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green']; // Массив цветов очей магов

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden'); //  показываем окно настроек пользователя

var similarListElement = userDialog.querySelector('.setup-similar-list'); // находим элемент, в который мы будем вставлять похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Находим шаблон-мага, который мы будем копировать (мы используем весь DocumentFragment, находящийся в шаблоне)

/*
var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
*/

var getRandom = function (arr) { // функция генерации случайных элементов массива
  var randomIndex = Math.round(Math.random() * (arr.length - 1)); // получаем случайное число от 0 до индекса последнего элемента
  return arr[randomIndex];
};

var wizards = [ // Массив магов с именами и цветами
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

var renderWizard = function (wizard) { // Отрисуем шаблон-мага - функция создания DOM-элемента на основе JS-объекта
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

similarListElement.appendChild(fragment); // вставляем склонированного шаблон-мага в нужное поле

document.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
