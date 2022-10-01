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
 
aSaveButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById(
    'aWorkingTime'
  ).textContent = `${aStartHours.value}:00  - ${aFinishHours.value}:30 `;

  let width =
    totalWorkTime(
      Number(aStartHours.value),
      00,
      Number(aFinishHours.value),
      30
    ) * 5.555;

  document.querySelector('.wife').style.width = width + '%';

  let marginLeft = (aStartHours.value - 6) * 5.555;

  document.querySelector('.wife').style.marginLeft = marginLeft + '%';
});

pSaveButton.addEventListener('click', function (e) {
  e.preventDefault();

  document.getElementById(
    'pWorkingTime'
  ).textContent = `${pStartHours.value}:00 - ${pFinishHours.value}:00`;

  let width =
    totalWorkTime(
      Number(pStartHours.value),
      00,
      Number(pFinishHours.value),
      00
    ) * 5.555;

  document.querySelector('.husband').style.width = width + '%';

  let marginLeft = (pStartHours.value - 6) * 5.555;

  document.querySelector('.husband').style.marginLeft = marginLeft + '%';
});


const readButton = document.getElementById('read');

readButton.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('test');

})


$('#read').on('click', function () {
  console.log('jquery');
})


function getAllUsers(){

  $.ajax({
      type: 'POST',
      url: "php/getAll.php",
      data: {},
      dataType: 'json',
      success: function (results) {
          console.log(results);

      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      }
  })
};

getAllUsers();