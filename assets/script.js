var today = moment();
var currentDayEl = $('#currentDay');
var timeBlockContainer = $('.container');
var time;
var formEl;
var labelEl;
var inputEl;
var buttonEl;

currentDayEl.text('For: '+today.format("MMM Do, YYYY"));
timeBlockContainer.attr('class', 'container time-block');
for (var i = 0; i <= 23; i++) {
    formEl = $('<form>');
    labelEl = $('<label>');
    if (i < 10) {
        labelEl.text('0'+i+" AM");
    } else if (i === 10 || i === 11) {
        labelEl.text(i+' AM');
    } else if (i === 12) {
        labelEl.text(i+' PM');
    }
    else if (i <= 21) {
        labelEl.text('0'+(i-12)+' PM');
    } else {
        labelEl.text((i-12)+' PM');
    }
    buttonEl = $('<button>');
    inputEl = $('<input>');
    formEl.append(labelEl);
    formEl.append(inputEl);
    formEl.append(buttonEl);
    buttonEl.text('Save');
    formEl.attr('class', 'input-box');
    labelEl.attr('class', 'hour');
    inputEl.attr('id', i);
    inputEl.attr('class', 'input-box');
    inputEl.css('width', '70%');
    buttonEl.attr('class', 'saveBtn');
    timeBlockContainer.append(formEl);
}

var storedData = JSON.parse(localStorage.getItem("dataSchedule"));
if (storedData == null) {
    storedData = [];
    for (var i = 0; i <= 23; i++) {
        storedData.push("-");
    }
    localStorage.setItem("dataSchedule", JSON.stringify(storedData));
}

function storeEvents() {
    for (var i = 0; i <= 23; i++) {
        storedData[i] = timeBlockContainer.children().eq(i).children('input').val();
    }
    localStorage.setItem('dataSchedule', JSON.stringify(storedData));
}

function renderEvents() {
    storedData = JSON.parse(localStorage.getItem('dataSchedule'));
    for (var i = 0; i <= 23; i++) {
        //timeBlockContainer.children().eq(i).children('input').val() = storedData[i];
        timeBlockContainer.children().eq(i).children('input').attr('value', storedData[i]);
    }
}

function renderCurrentTime() {
    time = parseInt(moment().format('H'));
    console.log(time);
    for (var i = 0; i < time; i++) {
        $('#'+i).attr('class', 'input-box past');
    }
    $('#'+time).attr('class', 'input-box present');
    for (var j = (time+1); j <= 23; j++) {
        $('#'+j).attr('class', 'input-box future');
    }
}

$('.saveBtn').on("click", function(event){
    event.preventDefault();
    storeEvents();
    renderEvents();
})
renderEvents();
renderCurrentTime();
setInterval(renderCurrentTime, 60000);