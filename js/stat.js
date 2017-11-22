'use strict';

//функция поиска максимального элемента в массиве
/*
var getMaxElement = function (arr) {
  var max = -1;       // будет принимать максим/худшее значение. По умолчанию = -1
  var maxIndex = -1;  // игрок

  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }
  return max;
};
*/

// функция вызывается когда игрок проходит уровень
window.renderStatistics = function (ctx, names, times) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10; // смещение тени по горизонтали
  ctx.shadowOffsetY = 10;

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270); /* beginPath, moveTo, closePath, fill */

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40); /* проблема с тенью*/
  ctx.fillText('Список результатов:', 120, 60);


    var max = -1;       // будет принимать максим/худшее значение. По умолчанию = -1
    var maxIndex = -1;  // игрок

    for (var i = 0 ; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
        maxIndex = i;
      }
    }



  var histogramHeigth = 150;              // px; - высота гистограммы
  var step = histogramHeigth / (max - 0); // px; - расчёт шага пропорции для масштабирования резалта в пределах окна канваса

  /*ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 80);*/

  var barHeigth = 150; // px; высота столбца
  var indent = 50;     // px; отступ между столбцами
  var initialX = 140;  // px; начало по оси абсцисс, откуда идёт начало рисования
  var initialY = 100;  // px; начало по оси ординат, откуда идёт начало рисования
  var lineWidth = 40; // px; ширина столбца - ??

  for(var i = 0; i < times.length; i++) {
    /*ctx.fillText(times.toFixed(i), 120, 80);*/
    ctx.fillRect(initialX + lineWidth * i + indent * i, initialY, lineWidth, times[i] * step); // отступ по горизонт-ли, вертикали, ширина эл-та, высота эл-та
    ctx.fillText(names[i], initialX + lineWidth * i + indent * i, initialY + histogramHeigth); // имя игрока + отступ по горизонт-ли, вертикали
  }
};
