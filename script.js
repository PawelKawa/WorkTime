// document.body.innerHTML = "JS is working";

let aStartHours = document.getElementById('aStartHours');
let aStartMinutes = document.getElementById('aStartMinutes');
let aFinishHours = document.getElementById('aFinishHours');
let aFinishMinutes = document.getElementById('aFinishMinutes');

let pStartHours = document.getElementById('pStartHours');
let pStartMinutes = document.getElementById('pStartMinutes');
let pFinishHours = document.getElementById('pFinishHours');
let pFinishMinutes = document.getElementById('pFinishMinutes');

let passwordInput = document.getElementById('password');

let aSaveButton = document.getElementById('aSaveTime');
let pSaveButton = document.getElementById('pSaveTime');
let inButton = document.getElementById('in');
let outButton = document.getElementById('out');

let aHide = document.getElementById('aHide');
let pHide = document.getElementById('pHide');

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

function checkPassword(password) {
  if (password === 'a') {
    aHide.classList.remove('aHide');
    outButton.classList.remove('hide');
    inButton.classList.add('hide');
  } else if (password === 'p') {
    pHide.classList.remove('pHide');
    outButton.classList.remove('hide');
    inButton.classList.add('hide');
  } else {
    alert('Wrong Password')
}
}

function hideIt() {
  outButton.classList.add('hide');
  aHide.classList.add('aHide');
  pHide.classList.add('pHide');
}

aSaveButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById(
    'aWorkingTime'
  ).textContent = `${aStartHours.value} : ${aStartMinutes.value} - ${aFinishHours.value} : ${aFinishMinutes.value} `;

  let width =
    totalWorkTime(
      Number(aStartHours.value),
      Number(aStartMinutes.value),
      Number(aFinishHours.value),
      Number(aFinishMinutes.value)
    ) * 4.1666;
  
  document.querySelector('.wife').style.width = width + '%';

  let marginLeft = startTime(Number(aStartHours.value), Number(aStartMinutes.value)) * 4.1666;

  document.querySelector('.wife').style.marginLeft = marginLeft + '%';
});

pSaveButton.addEventListener('click', function (e) {

  e.preventDefault();

  document.getElementById(
    'pWorkingTime'
  ).textContent = `${pStartHours.value} : 00 - ${pFinishHours.value} : 00`;

  let width =
    totalWorkTime(
      Number(pStartHours.value),
      00,
      Number(pFinishHours.value),
      00
    ) * 4.1666;
  
  document.querySelector('.husband').style.width = width + '%';

  let marginLeft = startTime(Number(pStartHours.value), 00) * 4.1666;

  document.querySelector('.husband').style.marginLeft = marginLeft + '%';
});


inButton.addEventListener('click', function (e) {
  e.preventDefault();
  checkPassword(passwordInput.value)
})

outButton.addEventListener('click', function (e) {
  e.preventDefault();
  inButton.classList.remove('hide');
  hideIt();
  passwordInput.value = '';
})