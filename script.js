// document.body.innerHTML = "JS is working";
const showInterfaceBtn = document.getElementById('showInterfaceButton');
const interface = document.getElementById('userInterface');
const editBtn = document.getElementById('editBtn');
const saveNewDayBtn = document.getElementById('saveNewDay');
const wEnd = document.getElementById('wEnd');
const hEnd = document.getElementById('hEnd');

showInterfaceBtn.addEventListener('click', function (e) {
  e.preventDefault();
  interface.classList.remove('none');
  // editBtn.classList.remove('none'); not working
  editBtn.classList.add('husband')
});

getAll();


document.getElementById('wStart').addEventListener('change', function () {
  let e = document.getElementById('wStart').value;
  if (e == 6) {
    wEnd.classList.add('none');
    document.getElementById('wEnd').value = 6;
  } else if (e == 0) {
    wEnd.classList.add('none');
    document.getElementById('wEnd').value = 0;
  } else {
    wEnd.classList.remove('none');

  }
});

document.getElementById('wEnd').addEventListener('change', function () {
  let e = document.getElementById('wEnd').value;
  if (e == 6) {
    document.getElementById('wStart').value = 6;
  } else if (e == 0) {
    document.getElementById('wStart').value = 0;
  }
})

document.getElementById('hStart').addEventListener('change', function () {
  let e = document.getElementById('hStart').value;
  if (e == 6) {
    hEnd.classList.add('none');
    document.getElementById('hEnd').value = 6;
  } else if (e == 0) {
    document.getElementById('hEnd').value = 0;
    hEnd.classList.add('none');
  } else {
    hEnd.classList.remove('none')
  }
});

document.getElementById('hEnd').addEventListener('change', function () {
  let e = document.getElementById('hEnd').value;
  if (e == 6) {
    document.getElementById('hStart').value = 6;
  } else if (e == 0) {
    document.getElementById('hStart').value = 0;
  }
})

//------------add new day with data----------------------------------------------

function addNewDay(date, wStart, wEnd, hStart, hEnd, note) {
  $.ajax({
    type: 'POST',
    url: 'php/addNewDay.php',
    data: {
      date: date,
      wStart: wStart,
      wEnd: wEnd,
      hStart: hStart,
      hEnd: hEnd,
      note: note,
    },
    dataType: 'json',
    success: function () {
      console.log(date);
      console.log(wStart);
      console.log(wEnd);
      console.log(hStart);
      console.log(hEnd);
      console.log(note);
      alert('added');
      getAll();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

saveNewDayBtn.addEventListener('click', function () {
  let date = document.getElementById('date').value;
  let wStart = document.getElementById('wStart').value;
  let wEnd = document.getElementById('wEnd').value;
  let hStart = document.getElementById('hStart').value;
  let hEnd = document.getElementById('hEnd').value;
  let note = document.getElementById('note').value;


  addNewDay(date, wStart, wEnd, hStart, hEnd, note);

});

//------------get all days-----------------------------------------------

let wifeWidth = (Start, End) => {
  return (End - Start + 0.5) * 5.555 + '%';
};

let husbandWidth = (Start, End) => {
  return (End - Start) * 5.555 + '%';
};

let marginLeft = (Start) => {
  return (Start - 6) * 5.555 + '%';
};

function getAll() {
  $.ajax({
    type: 'POST',
    url: 'php/getAll.php',
    data: {},
    dataType: 'json',
    success: function (results) {
      let data = results['data'];
      let days = [];
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        let wStart = data[i].wStart;
        let wEnd = data[i].wEnd;
        let hStart = data[i].hStart;
        let hEnd = data[i].hEnd;
        
        let finalWifeWidth = wifeWidth(wStart, wEnd);
        let finalHusbandWidth = husbandWidth(hStart, hEnd);
        let finalWifeMarginLeft = marginLeft(wStart);
        let finalHusbandMarginLeft = marginLeft(hStart);


        days += `
        <fieldset id="${data[i].id}">
        <legend>${data[i].date}</legend>
        <div class="time">
        <div class="six">6</div>
        <div class="nine">9</div>
        <div class="midday">12</div>
        <div class="fiveteen">15</div>
        <div class="eightenn">18</div>
        <div class="twenty-one">21</div>
        <div class="midnight">24</div>
      </div>
      <div class="time">
      <div class="six">|</div>
      <div class="nine">|</div>
      <div class="midday">|</div>
      <div class="fiveteen">|</div>
      <div class="eightenn">|</div>
      <div class="twenty-one">|</div>
      <div class="midnight">|</div>
      </div>
        <div class="wife" style="width: ${finalWifeWidth}; margin-left:${finalWifeMarginLeft}">
          <span id="aWorkingTime">${data[i].wStart} - ${data[i].wEnd}:30</span>
        </div>
        <div class="husband" style="width: ${finalHusbandWidth}; margin-left:${finalHusbandMarginLeft}">
          <span id="pWorkingTime">${data[i].hStart} - ${data[i].hEnd}</span>
        </div>
        <p>${data[i].note}</p>
        <button id="editBtn" class="">Edit</button>
      </fieldset>
        `;
        $('#schedule').html(days);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

//----------------------------------------------------------
