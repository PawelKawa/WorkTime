// document.body.innerHTML = "JS is working";



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

$('#form').on('submit', function (e) {
  e.preventDefault();
  let date = document.getElementById('date').value;
  let wifeStart = document.getElementById('wifeStart').selectedOptions[0].text;
  let wifeEnd = document.getElementById('wifeEnd').selectedOptions[0].text;
  let husbandStart = document.getElementById('husbandStart').selectedOptions[0].text;
  let husbandEnd = document.getElementById('husbandEnd').selectedOptions[0].text;
  let note = document.getElementById('note').value;
  
  // if (date === '') {
  //   alert('pick a date first');
  // } else {
  //   addNewDay(date, wifeStart, wifeEnd, husbandStart, husbandEnd, note);
  // }
})




