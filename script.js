// document.body.innerHTML = "JS is working";

let id = '';

//----------------day & date-----------------
const fullDate = new Date();
const dayName = fullDate.toLocaleString('en-us', { weekday: 'long' });
const myDateFormatted = formatDate(fullDate);
function formatDate(obj) {
  const parts = {
    date: obj.getDate(),
    month: obj.getMonth() + 1,
    year: obj.getFullYear(),
  };
  return `${parts.date}/${parts.month}/${parts.year}`;
}

const dayOfWeek = document.getElementById('dayNames');
const date = document.getElementById('date2');
dayOfWeek.append(dayName);
date.append(myDateFormatted);

//--------------------------two main buttons at top --------------

const addDay = document.querySelector('.addDayBtn');
addDay.addEventListener('click', function () {
  let userInterface = document.querySelector('.userInterface');
  userInterface.classList.toggle('none');
  addDay.classList.add('none');
});

//------------get all days-----------------------------------------------

const length = (start, end) => {
  let startHours = Number(start.slice(0, 2));
  let endHours = Number(end.slice(0, 2));
  let endMinutes = end.slice(3, 5);

  if (endMinutes == '30') {
    return (endHours + 0.5 - startHours) * 5.555 + '%';
  } else {
    return (endHours - startHours) * 5.555 + '%';
  }
};

const marginLeft = (start) => {
  let startHours = Number(start.slice(0, 2));
  return (startHours - 6) * 5.555 + '%';
};

function getAll() {
  $.ajax({
    type: 'POST',
    url: 'php/getAll.php',
    data: {},
    dataType: 'json',
    success: function (results) {
      let data = results['data'];
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        let id = data[i]['id'];
        let day = data[i]['date'].slice(8, 11);
        // console.log(day);
        const th = () => {
          let day = data[i]['date'].slice(8, 11);
          if (day == 01) {
            return 'st';
          } else if (day == 02) {
            return 'nd';
          } else if (day == 03) {
            return 'rd';
          } else {
            return 'th';
          }
        };
        const months = () => {
          let month = data[i]['date'].slice(5, 7);
          if (month == 1) {
            return 'January';
          } else if (month == 2) {
            return 'February';
          } else if (month == 3) {
            return 'March';
          } else if (month == 4) {
            return 'April';
          } else if (month == 5) {
            return 'May';
          } else if (month == 6) {
            return 'June';
          } else if (month == 7) {
            return 'July';
          } else if (month == 8) {
            return 'August';
          } else if (month == 9) {
            return 'September';
          } else if (month == 10) {
            return 'October';
          } else if (month == 11) {
            return 'November';
          } else if (month == 12) {
            return 'December';
          }
        };

        const fullDate = new Date(data[i]['date']);
        let date = fullDate.toLocaleString('en-us', { weekday: 'long' });
        date += ', ' + day + th() + ' ' + months();
        let wifeStart = data[i]['wStart'];
        let wifeEnd = data[i]['wEnd'];
        let husbandStart = data[i]['hStart'];
        let husbandEnd = data[i]['hEnd'];
        let note = data[i]['note'];
        let wifeLength = length(wifeStart, wifeEnd);
        let husbandLength = length(husbandStart, husbandEnd);
        let wifeMarginLeft = marginLeft(wifeStart);
        let husbandMarginLeft = marginLeft(husbandStart);

        newDay(
          id,
          date,
          wifeStart,
          wifeEnd,
          husbandStart,
          husbandEnd,
          note,
          wifeLength,
          husbandLength,
          wifeMarginLeft,
          husbandMarginLeft
        );
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

const clearSchedule = () => {
  $('#schedule').empty();
};

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
      addDay.classList.remove('none');
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
    document.querySelector('.userInterface').classList.add('none');
  }
});

const newDay = (
  id,
  data,
  wifeStart,
  wifeEnd,
  husbandStart,
  husbandEnd,
  note,
  wifeLength,
  husbandLength,
  wifeMarginLeft,
  husbandMarginLeft
) => {
  const fieldset = document.createElement('fieldset');
  fieldset.id = id;

  const legend = document.createElement('legend');
  const inLegend = document.createTextNode(data);
  legend.append(inLegend);

  const div = document.createElement('div');
  div.classList.add('wife');
  div.style.width = wifeLength;
  div.style.marginLeft = wifeMarginLeft;
  const inDiv = document.createTextNode(`${wifeStart} - ${wifeEnd}`);
  div.append(inDiv);

  const div2 = document.createElement('div');
  const inDiv2 = document.createTextNode(`${husbandStart} - ${husbandEnd}`);
  div2.classList.add('husband');
  div2.style.width = husbandLength;
  div2.style.marginLeft = husbandMarginLeft;
  div2.append(inDiv2);

  const div3 = document.createElement('div');
  const inDiv3 = document.createTextNode(`6 9 12 15 18 21 24`);
  div3.style.textAlignLast = 'justify';
  div3.classList.add('scale');
  div3.append(inDiv3);

  const notka = document.createElement('p');
  const inNotka = document.createTextNode(note);
  notka.classList.add('note');

  notka.append(inNotka);

  fieldset.append(legend, div3, div, div2, notka);

  document.getElementById('schedule').append(fieldset);
};

// ----------------------BUTTONS DELETE & EDIT -------------------

const schedule = document.getElementById('schedule');
schedule.addEventListener('click', function (e) {
  const editSHow = document.getElementById('background');
  editSHow.classList.remove('none');
  const editThisDayId = e.target.closest('fieldset').id;
  getDay(editThisDayId);
});
//------delete button---
const deleteBtn = document.querySelector('.deleteBtn');
deleteBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (confirm(`Are you sure you want to delete this day?`)) {
    deleteDay(id);
  }
});

//---close ( X ) button---

const cancelEditBtn = document.querySelector('.cancelEditDayBtn');
cancelEditBtn.addEventListener('click', function () {
  const editSHow = document.getElementById('background');
  editSHow.classList.add('none');
});

const cancelDaybtn = document.querySelector('.cancelDayBtn');
cancelDaybtn.addEventListener('click', function () {
  let userInterface = document.querySelector('.userInterface');
  userInterface.classList.add('none');
  addDay.classList.remove('none');

})

const modal = document.getElementById('background');
window.onclick = function (event) {
  if (event.target == modal) {
  const editSHow = document.getElementById('background');
  editSHow.classList.add('none');
  }
}


//-----save edited day button --------

$('#editForm').on('submit', function (e) {
  e.preventDefault();

  const date = document.getElementById('editDate').value;
  const wifeStart =
    document.getElementById('editWifeStart').selectedOptions[0].text;
  const wifeEnd =
    document.getElementById('editWifeEnd').selectedOptions[0].text;
  const husbandStart =
    document.getElementById('editHusbandStart').selectedOptions[0].text;
  const husbandEnd =
    document.getElementById('editHusbandEnd').selectedOptions[0].text;
  const note = document.getElementById('editNote').value;
  document.getElementById('background').classList.add('none');

  updateDay(id, date, wifeStart, wifeEnd, husbandStart, husbandEnd, note);
});

//----------------------------delete day --------------------------

const deleteDay = (dayId) => {
  $.ajax({
    type: 'POST',
    url: 'php/deleteDay.php',
    data: { id: dayId },
    dataType: 'json',
    success: function () {
      clearSchedule();
      getAll();
      const editSHow = document.getElementById('background');
      editSHow.classList.add('none');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
};

//-------------------------- get day for edit--------------------------------------

const getDay = (dayId) => {
  $.ajax({
    type: 'POST',
    url: 'php/getDay.php',
    data: { id: dayId },
    dataType: 'json',
    success: function (results) {
      let data = results['data'];
      console.log(data);

      id = data[0]['id'];

      const date = data[0]['date'];
      document.getElementById('editDate').value = date;

      const wifeStart = data[0]['wStart'].slice(0, 2);
      if (wifeStart === 'St') {
        document.getElementById('editWifeStart').value = 0;
      } else if (wifeStart === 'RE') {
        document.getElementById('editWifeStart').value = 1;
      } else {
        document.getElementById('editWifeStart').value = wifeStart;
      }

      const wifeEnd = data[0]['wEnd'].slice(0, 2);
      if (wifeEnd === 'Fi') {
        document.getElementById('editWifeEnd').value = 0;
      } else if (wifeEnd === 'RE') {
        document.getElementById('editWifeEnd').value = 1;
      } else {
        document.getElementById('editWifeEnd').value = wifeEnd;
      }

      const husbandStart = data[0]['hStart'].slice(0, 2);
      if (husbandStart === 'St') {
        document.getElementById('editHusbandStart').value = 0;
      } else if (husbandStart === 'RE') {
        document.getElementById('editHusbandStart').value = 1;
      } else {
        document.getElementById('editHusbandStart').value = husbandStart;
      }

      const husbandEnd = data[0]['hEnd'].slice(0, 2);
      if (husbandEnd === 'Fi') {
        document.getElementById('editHusbandEnd').value = 0;
      } else if (husbandEnd === 'RE') {
        document.getElementById('editHusbandEnd').value = 1;
      } else {
        document.getElementById('editHusbandEnd').value = husbandEnd;
      }

      const note = data[0]['note'];
      document.getElementById('editNote').value = note;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
};

//---------------------save edited day-----------------

function updateDay(
  id,
  date,
  wifeStart,
  wifeEnd,
  husbandStart,
  husbandEnd,
  note
) {
  $.ajax({
    type: 'POST',
    url: './php/updateDay.php',
    data: {
      id: id,
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

//-----------------shopping / working------------------
getShoppingList();
const shoppingBtn = document.querySelector('.shoppingBtn');
const workingBtn = document.querySelector('.workingBtn');
const shoppingList = document.querySelector('.shoppingList');

shoppingBtn.addEventListener('click', function () {
  workingBtn.classList.remove('none');
  shoppingBtn.classList.add('none');
  addDay.classList.add('none');
  schedule.classList.add('none');
  shoppingList.classList.remove('none');
  document.querySelector('.userInterface').classList.add('none');
});

workingBtn.addEventListener('click', function () {
  workingBtn.classList.add('none');
  shoppingBtn.classList.remove('none');
  addDay.classList.remove('none');
  schedule.classList.remove('none');
  shoppingList.classList.add('none');
});

function getShoppingList() {
  $.ajax({
    type: 'POST',
    url: 'php/getShoppingList.php',
    data: {},
    dataType: 'json',
    success: function (results) {
      let data = results['data'];
      // console.log(data);
      let shoppingList = [];
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        shoppingList += `<li><button data-id=${data[i].id}  class="shoppingDelBtn" >X</button> ${data[i].name}</li>`;
      }
      document.getElementById('shoppingList').innerHTML = shoppingList;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
//------add------
function addToShoppingList(item) {
  $.ajax({
    type: 'POST',
    url: 'php/addShoppingItem.php',
    data: {
      item: item,
    },
    dataType: 'json',
    success: function () {
      getShoppingList();
      document.querySelector('.inputProduct').value = '';
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

const addToShoppingListBtn = document.querySelector('.addShoppingListFrom');
addToShoppingListBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.querySelector('.inputProduct').value;
  addToShoppingList(input);
});

//-------delete item-------

$('#shoppingList').on('click', 'button', function () {
  const delItem = this.getAttribute('data-id');
  deleteItem(delItem);
});

const deleteItem = (itemId) => {
  $.ajax({
    type: 'POST',
    url: 'php/deleteItem.php',
    data: { id: itemId },
    dataType: 'json',
    success: function () {
      getShoppingList();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
};
