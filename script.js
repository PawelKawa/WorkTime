// document.body.innerHTML = "JS is working";

const fullDate = new Date();
const dayName = fullDate.toLocaleString('en-us', { weekday: 'long' });
const myDateFormatted = formatDate(fullDate);
function formatDate(obj) {
  const parts = {
    date: obj.getDate(),
    month: obj.getMonth() + 1,
    year: obj.getFullYear()
  };
  return `${parts.date}/${parts.month}/${parts.year}`
}

const dayOfWeek = document.getElementById('dayNames');
const date = document.getElementById('date');
dayOfWeek.append(dayName);
date.append(myDateFormatted)

const addDay = document.querySelector('.add');
addDay.addEventListener('click', function () {
  let userInterface = document.querySelector('.userInterface');
  userInterface.classList.toggle('none');
});

const showOptions = document.querySelector('.options');
showOptions.addEventListener('click', function () {
  let options = document.getElementsByClassName('tools');
  for (let i = 0; i < options.length; i++) {
    options[i].classList.toggle('none');
  }
})

const clearSchedule = () => {
  $('#schedule').empty();
};

//------------get all days-----------------------------------------------

function getAll() {
  $.ajax({
    type: 'POST',
    url: 'php/getAll.php',
    data: {},
    dataType: 'json',
    success: function (results) {
      let data = results['data'];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let id = data[i]['id'];
        let date = data[i]['date'];
        let wifeStart = data[i]['wStart'];
        let wifeEnd = data[i]['wEnd'];
        let husbandStart = data[i]['hStart'];
        let husbandEnd = data[i]['hEnd'];
        let note = data[i]['note'];
        newDay(id, date, wifeStart, wifeEnd, husbandStart, husbandEnd, note);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
getAll();

//------------add new day with data----------------------------------------------

function addNewDay(date, wifeStart, wifeEnd, husbandStart, husbandEnd, note) {
  $.ajax({
    type: 'POST',
    url: 'php/addNewDay.php',
    data: {
      date: date,
      wStart: wifeStart,
      wEnd: wifeEnd,
      hStart: husbandStart,
      hEnd: husbandEnd,
      note: note,
    },
    dataType: 'json',
    success: function () {
      clearSchedule();
      getAll();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

$('#form').on('submit', function (e) {
  e.preventDefault();
  let date = document.getElementById('date').value;
  let wifeStart = document.getElementById('wifeStart').selectedOptions[0].text;
  let wifeEnd = document.getElementById('wifeEnd').selectedOptions[0].text;
  let husbandStart =
    document.getElementById('husbandStart').selectedOptions[0].text;
  let husbandEnd =
    document.getElementById('husbandEnd').selectedOptions[0].text;
  let note = document.getElementById('note').value;

  if (date === '') {
    alert('pick a date');
  } else {
    addNewDay(date, wifeStart, wifeEnd, husbandStart, husbandEnd, note);
  }
});


const newDay = (id, data, ws, we, hs, he, note) => {
  const fieldset = document.createElement('fieldset');
  fieldset.id = id;

  const legend = document.createElement('legend');
  const inLegend = document.createTextNode(data);
  legend.append(inLegend);

  const p = document.createElement('p');
  const inP = document.createTextNode(`Andzia ${ws} - ${we}`);
  p.append(inP);

  const p2 = document.createElement('p');
  const inP2 = document.createTextNode(`Pawel ${hs} - ${he}`);
  p2.append(inP2);

  const notka = document.createElement('p');
  const inNotka = document.createTextNode(note);
  notka.append(inNotka);

  const tools = document.createElement('div');
  tools.id = 'tools';
  tools.classList.add('tools', 'none');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn', 'btn');
  deleteBtn.id = `delete${id}`;
  const deleteBtnTxt = document.createTextNode('DELETE');
  deleteBtn.append(deleteBtnTxt);

  const editBtn = document.createElement('button');
  editBtn.classList.add('editBtn', 'btn');
  editBtn.id = `edit${id}`;
  const editBtnTxt = document.createTextNode('EDIT');
  editBtn.append(editBtnTxt);

  tools.append(deleteBtn, editBtn);
  fieldset.append(legend, p, p2, notka, tools);

  document.getElementById('schedule').append(fieldset);
};

// ----------------------BUTTONS ALL-IN-1 -------------------

const schedule = document.getElementById('schedule');
schedule.addEventListener('click', function (e) {
  // e.preventDefault;
  // e.stopPropagation;
  if (e.target.classList.contains('deleteBtn')) {
    const deleteThisDayId = e.target.closest('fieldset').id;
    const deleteThisDayText =
      e.target.closest('fieldset').childNodes[0].textContent;
    if (confirm(`Are you sure you want to delete ${deleteThisDayText}?`)) {
      deleteDay(deleteThisDayId);
    } else {
      alert('nie, to nie');
    }
  } else if (e.target.classList.contains('editBtn')) {
    console.log('edit btn');
  }
});

const deleteDay = (dayId) => {
  $.ajax({
    type: 'POST',
    url: 'php/deleteDay.php',
    data: { id: dayId },
    dataType: 'json',
    success: function () {
      console.log('deleted');
      // location.reload();
      clearSchedule();
      getAll();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
};
