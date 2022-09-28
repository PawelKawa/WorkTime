// document.body.innerHTML = "JS is working";

let aStartHours = document.getElementById('aStartHours');
let aStartMinutes = document.getElementById('aStartMinutes');
let aFinishHours = document.getElementById('aFinishHours');
let aFinishMinutes = document.getElementById('aFinishMinutes');

let aSaveButton = document.getElementById('aSaveTime');

let totalWorkTime = (startHour, startMinutes, finishHour, finishMinutes) => {
  if (startMinutes === 30 && finishMinutes === 0) {
    return finishHour - 0.5 - startHour;
  } else if (startMinutes === 0 && finishMinutes === 30) {
    return finishHour + 0.5 - startHour;
  } else {
    return finishHour - startHour;
  }
};

let startTime = (h, min) => {
  if (min === 30) {
    return h + 0.5;
  } else {
    return h;
  }
};

aSaveButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById(
    'aWorkingTime'
  ).textContent = `${aStartHours.value} : ${aStartMinutes.value} - ${aFinishHours.value} : ${aFinishMinutes.value} `;

  //   document.querySelector('#qwe').textContent =
  //     'Total working time:' +
  //     totalWorkTime(
  //       Number(aStartHours.value),
  //       Number(aStartMinutes.value),
  //       Number(aFinishHours.value),
  //       Number(aFinishMinutes.value)
  //     ) +
  //     'h';
  //   document.querySelector('#qwe1').textContent =
  //     'Andzia start time: ' + aStartHours.value + ':' + aStartMinutes.value;
  //   document.querySelector('#qwe2').textContent =
  //     'Andzia finish time: ' + aFinishHours.value + ':' + aFinishMinutes.value;

  let width =
    totalWorkTime(
      Number(aStartHours.value),
      Number(aStartMinutes.value),
      Number(aFinishHours.value),
      Number(aFinishMinutes.value)
    ) * 4.166;
  document.querySelector('.wife').style.width = width + '%';

  let marginLeft =
    startTime(Number(aStartHours.value), Number(aStartMinutes.value)) * 4.166;

  document.querySelector('.wife').style.marginLeft = marginLeft + '%';
});
