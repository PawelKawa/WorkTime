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
const date = document.getElementById('date2');
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

const length = (start, end) => {
  let startHours = Number(start.slice(0, 2));
  let endHours = Number(end.slice(0, 2));
  let endMinutes = end.slice(3, 5);

  if (endMinutes == '30') {
    return (endHours + 0.5 - startHours)*5.555 +'%';
  } else {
    return (endHours - startHours)*5.555 +'%';
  }
};

const marginLeft = (start) => {
  let startHours = Number(start.slice(0, 2));
  return (startHours - 6) *5.555 +'%'
}


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
        let wifeLength = length(wifeStart, wifeEnd);
        let husbandLength = length(husbandStart, husbandEnd);
        let wifeMarginLeft = marginLeft(wifeStart);
        let husbandMarginLeft = marginLeft(husbandStart);
        newDay(id, date, wifeStart, wifeEnd, husbandStart, husbandEnd, note, wifeLength, husbandLength, wifeMarginLeft, husbandMarginLeft);

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


const newDay = (id, data, ws, we, hs, he, note, wifeLength,husbandLength,wifeMarginLeft,husbandMarginLeft) => {
  const fieldset = document.createElement('fieldset');
  fieldset.id = id;

  const legend = document.createElement('legend');
  const inLegend = document.createTextNode(data);
  legend.append(inLegend);

  const div = document.createElement('div');
  div.classList.add('wife');
  div.style.width = wifeLength;
  div.style.marginLeft = wifeMarginLeft;
  const inDiv = document.createTextNode(`${ws} - ${we}`);
  div.append(inDiv);

  const div2 = document.createElement('div');
  const inDiv2 = document.createTextNode(`${hs} - ${he}`);
  div2.classList.add('husband');
  div2.style.width = husbandLength;
  div2.style.marginLeft = husbandMarginLeft;
  div2.append(inDiv2);

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
  fieldset.append(legend, div, div2, notka, tools);

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
      alert('No means NO!');
    }
  } else if (e.target.classList.contains('editBtn')) {
    console.log('edit btn');
  }
});

//----------------------------delete day --------------------------

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

//----------------------------------------------------------------








