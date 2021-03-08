const currentYear = moment().get('year');
let currentMood = '';
const moodList = {
  'mood-1': '#2d6b5f',
  'mood-2': '#72e3a6',
  'mood-3': '#dff4c7',
  'mood-4': '#edbf98',
  'mood-5': '#ea3d36'
};
console.log(moodList[currentMood]);
const MoodRegex = /(mood-[0-9])/gi;
const moodBtn = document.querySelectorAll('.mood-container button');

function clearBtnSelect() {
  moodBtn.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected');
      currentMood = '';
    }
  });
}

moodBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    let check = e.target.parentNode.classList.contains('selected');

    // clear select of all buttons
    clearBtnSelect();
    if (e.target.tagName === 'I' && !check) {
      currentMood = e.target.parentNode.className.match(MoodRegex)[0];
      e.target.parentNode.classList.add('selected');
    }

    // console.log(currentMood);
  });
});

function renderDaysEvent() {
  const days = document.querySelectorAll('.days span');
  days.forEach((day) => {
    day.addEventListener('click', (e) => {
      if (!currentMood) {
        e.target.style.backgroundColor = '#333';
      }
      // console.log(currentMood);
      e.target.style.backgroundColor = moodList[currentMood];
    });
  });
}

// render calendar
function renderMonth(currentYear) {
  // firstWeekDayOfMonth- the first weekday of the month
  //0: Sun 1: Mon .... 6: Sat
  let firstWeekDayOfMonth;
  // lastDayOfMonth - the last date of the month
  //30 31 or 28 29
  let lastDayOfMonth;
  let output = '';
  let calendarList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  for (let i = 1; i <= 12; i++) {
    firstWeekDayOfMonth = moment(`${currentYear}/${i}`)
      .startOf('month')
      .format('d');
    lastDayOfMonth = moment(`${currentYear}/${i}`).endOf('month').format('DD');

    output += `<div class="months">
        <h3>${calendarList[i - 1]}</h3>
        <div class="week_days_container">
          <div class="week_days">Sun</div>
          <div class="week_days">Mon</div>
          <div class="week_days">Tue</div>
          <div class="week_days">Wed</div>
          <div class="week_days">Thu</div>
          <div class="week_days">Fri</div>
          <div class="week_days">Sat</div>
        </div>
        <div class="days_container">${renderDays(
          firstWeekDayOfMonth,
          lastDayOfMonth
        )}</div>
      </div>`;
  }

  document.querySelector('.months_container').innerHTML = output;
}

function renderDays(firstWeekDay, lastDay) {
  // firstWeekDay - the first weekday of the month
  // lastDay - the last date of the month
  let output = '';
  // days - calculate how many block the calendar need in a month
  let days = lastDay + firstWeekDay + 1 > 35 ? 42 : 35;
  for (let i = 0; i < days; i++) {
    // generate the empty block in the month
    // beginning || the end of the calendar return empty block
    if (firstWeekDay > i || i - firstWeekDay + 1 > lastDay) {
      output += '<div class="days"></div>';
    } else {
      output += `<div class="days"><span>${i - firstWeekDay + 1}</span></div>`;
    }
  }

  return output;
}

renderMonth(currentYear);
renderDaysEvent();
