'use strict';

// функция вызывается когда игрок проходит уровень
window.renderStatistics = function (ctx, names, times) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10; // смещение тени по горизонтали
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.shadowOffsetX = 0; // убираю тень
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // функция поиска максимального элемента в массиве
  var getMaxElement = function () {
    var max = -1; // будет принимать максим/худшее значение, по умолчанию = -1

    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  var histogramHeigth = 150; // px; - высота гистограммы
  var step = histogramHeigth / (getMaxElement() - 0); // px; - расчёт шага пропорции для масштабирования резалта в пределах окна канваса

  var lineWidth = 40; // px; ширина столбца
  var indent = 50; // px; отступ между столбцами
  var indentHeigth = 20; // px; вертикальный отступ
  var initialX = 140; // px; начало по оси абсцисс, откуда идёт начало рисования
  var initialY = 240; // px; начало по оси ординат, откуда идёт начало рисования

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'blue';
      ctx.globalAlpha = Math.random(); // задаёт прозрачность
    }
    ctx.fillRect(initialX + lineWidth * i + indent * i, initialY, lineWidth, times[i] * -step); // отступ по горизонт-ли, вертикали, ширина эл-та, высота эл-та

    ctx.fillStyle = 'rgb(0, 0, 0)'; // устанавливает тексту цвет
    ctx.globalAlpha = 1; // убирает прозрачность

    ctx.fillText(Math.round(times[i]), initialX + lineWidth * i + indent * i, initialY - times[i] * step - indentHeigth / 2); // время игрока, отступ по горизонт-ли, отступ по вертикали
    ctx.fillText(names[i], initialX + lineWidth * i + indent * i, initialY + indentHeigth); // имя игрока, отступ по горизонт-ли, отступ по вертикали
  }
};
