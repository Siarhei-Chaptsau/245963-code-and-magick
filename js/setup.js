'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф']; // Массив имён магов

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden'); //  показываем окно настроек пользователя

var similarListElement = userDialog.querySelector('.setup-similar-list'); // находим элемент, в который мы будем вставлять похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Находим шаблон-мага, который мы будем копировать (мы используем весь DocumentFragment, находящийся в шаблоне)

var wizards = [ // Массив магов с именами и цветами плащей
  {
    name: WIZARD_NAMES[0],
    coatColor: 'rgb(101, 137, 164)'
  },
  {
    name: WIZARD_NAMES[1],
    coatColor: 'rgb(241, 43, 107)'
  },
  {
    name: WIZARD_NAMES[2],
    coatColor: 'rgb(146, 100, 161)'
  },
  {
    name: WIZARD_NAMES[3],
    coatColor: 'rgb(56, 159, 117)'
  }
];

var renderWizard = function (wizard) { // Отрисуем шаблон-мага
  var wizardElement = similarWizardTemplate.cloneNode(true); // клонируем содержимое шаблон-мага

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // вставляем массив имён магов в шаблон-мага
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавляем цвет плащей в шаблон-мага

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment); // вставляем склонированного шаблон-мага в нужное поле

document.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
