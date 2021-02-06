export const countHours = (h) => {
  const data = h.split('-');
  const hours = [];
  for (let i = +data[0]; i <= data[1]; i += 1) {
    hours.push(`${i}:00`);
  }
  return hours;
};

export const tableConstructor = (headers, hours) => {
  const header = [...headers.slice(1)];
  let table = `
    <table class="table ">
    <tr>
    `;
  headers.forEach((item) => { table += `<th class="unselectable">${item}</th>`; });
  for (let i = 0; i < hours.length; i += 1) {
    table += `<tr data-time="${hours[i]}"><td  class="time-colum unselectable">${hours[i]}</td>`;
    for (let j = 0; j < header.length; j += 1) {
      table += `<td data-day="${header[j]}"></td>`;
    }
    table += '</tr>';
  }

  table += `</tr>
    </table>`;
  return table;
};

export const clearEvent = ({
  eventData,
  checkboxes,
  closeAlertBtn,
  target = null,
  days,
  hoursArr,
}) => {
  const eventWindow = document.querySelector('.event-window');
  const empty = '';
  const [fistDays] = days;
  const [fistHour] = hoursArr;
  eventData.titleEvent.value = empty;
  eventData.participants.textContent = empty;
  eventData.eventDay.value = fistDays;
  eventData.eventTime.value = fistHour;
  Array.from(checkboxes).forEach((item) => {
    if (item.checked) item.checked = false;
  });
  target.setAttribute('disabled', true);
  eventWindow.style.display = 'none';
  closeAlertBtn.parentElement.classList.remove('show');
};

export const fillTable = ({ member = 'all', allEvents, users }) => {
  const table = document.querySelector('.table');
  const fillDiv = document.querySelectorAll('.div-fill-table');
  if (fillDiv) {
    fillDiv.forEach((item) => {
      if (item.nextElementSibling) {
        item.nextElementSibling.remove();
      }
      item.parentElement.classList.remove('color');
      item.remove();
    });
  }

  if (member === 'all' && allEvents.length) {
    allEvents.forEach(({ title, day, time }) => {
      const elem = table
        .querySelector(`[data-time="${time}"]`)
        .querySelector(`[data-day="${day}"]`);
      const html = `<div class="div-fill-table unselectable" title="${title}" data-time="${time}" data-day="${day}"><h5>${title}</h5></div><button class="btn btn-light btn-sm div-fill-table-close">X</button>`;
      elem.classList.add('color');
      elem.innerHTML = html;
    });
  } else if (member !== 'all' && allEvents.length) {
    allEvents.forEach(({  day, time }) => {
      const el = table
        .querySelector(`[data-time="${time}"]`)
        .querySelector(`[data-day="${day}"]`);
        el.classList.add('color');
    });
    const userEvent = users.find(({ name }) => name === member);
    userEvent.events.forEach(({ title, day, time }) => {
      const elem = table
        .querySelector(`[data-time="${time}"]`)
        .querySelector(`[data-day="${day}"]`);
      elem.classList.add('color');
      elem.innerHTML = `<div class="div-fill-table unselectable" title="${title}" data-time="${time}" data-day="${day}"><h5>${title}</h5></div><button class="btn btn-light btn-sm div-fill-table-close">X</button>`;
    });
  }
};

export const saveLocalStorage = ({
  users, days, hours, allEvents,
}) => {
  localStorage.setItem('dataCalUsers', JSON.stringify(users));
  localStorage.setItem('dataCalDays', JSON.stringify(days));
  localStorage.setItem('dataCalHours', JSON.stringify(hours));
  localStorage.setItem('dataCalAllEvents', JSON.stringify(allEvents));
};

export const remoteLocalStorage = () => {
  localStorage.removeItem('dataCalUsers');
  localStorage.removeItem('dataCalDays');
  localStorage.removeItem('dataCalHours');
  localStorage.removeItem('dataCalAllEvents');
};

export const enterDroppable = (elem) => {
  const e = elem;
  e.style.background = '#c5c6c7';
};

export const leaveDroppable = (elem) => {
  const e = elem;
  e.style.background = 'white';
};
