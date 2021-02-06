import mountComponent from './mountComponent';
import scriptNewEvent from './components/eventWindow/scriptNewEvent';
import {
  countHours,
  clearEvent,
  fillTable,
  saveLocalStorage,
  remoteLocalStorage,
  enterDroppable,
  leaveDroppable,
} from './func/other';
import configWindow from './modals/consfigWindow';
import  './style/style.css';

let users = JSON.parse(localStorage.getItem('dataCalUsers')) || [];
let days = JSON.parse(localStorage.getItem('dataCalDays')) || [];
let hours = JSON.parse(localStorage.getItem('dataCalHours')) || '';
let member = 'all';
let allEvents = JSON.parse(localStorage.getItem('dataCalAllEvents')) || [];
let hoursArr = hours && countHours(hours);

configWindow();

const confWind = {
  createBtnCal: document.getElementById('create-cal-con'),
  createModCal: document.querySelector('.conf-wind'),
};

const start = () => {
  const buttons = {
    createBtn: document.getElementById('create-window-btn'),
    closeAlertBtn: document.getElementById('close-alert-btn'),
    rewriteBtn: document.getElementById('rewrite-table'),
  };
  const checkboxes = document.querySelectorAll('.check-event-users');
  const eventData = {
    titleEvent: document.getElementById('event-title'),
    participants: document.querySelector('.partipals-text'),
    eventDay: document.getElementById('event-day'),
    eventTime: document.getElementById('event-time'),
  };
  const selectMember = document.getElementById('select-member');
  const delModal = {
    modal: document.querySelector('.del-modal'),
    text: document.getElementById('del-modal-text'),
    yesBtn: document.getElementById('del-modal-yes'),
    noBtn: document.getElementById('del-modal-no'),
  };

  const rewriteModal = {
    modal: document.querySelector('.rewrite-modal'),
    noBtn: document.getElementById('rewrite-no'),
    yesBtn: document.getElementById('rewrite-yes'),
  };

  buttons.rewriteBtn.addEventListener('click', () => {
    rewriteModal.modal.style.display = 'flex';
  });
  rewriteModal.noBtn.addEventListener('click', () => {
    rewriteModal.modal.style.display = 'none';
  });
  rewriteModal.yesBtn.addEventListener('click', () => {
    rewriteModal.modal.style.display = 'none';
    remoteLocalStorage();
    document.location.reload();
  });

  buttons.createBtn.addEventListener('click', (e) => {
    const event = {
      title: eventData.titleEvent.value,
      day: eventData.eventDay.value,
      time: eventData.eventTime.value,
    };
    const reply = allEvents.find(
      ({ day, time }) => day === event.day && time === event.time,
    );

    if (reply) {
      buttons.closeAlertBtn.parentElement.classList.add('show');
      return;
    }
    const usersOnEvent = eventData.participants.textContent.split('; ');
    usersOnEvent.forEach((item) => {
      const idx = users.findIndex(({ name }) => name === item);
      if (idx !== -1) {
        users[idx].events.push(event);
      }
    });
    allEvents.push(event);
    clearEvent({
      eventData,
      closeAlertBtn: buttons.closeAlertBtn,
      checkboxes,
      target: e.target,
      days,
      hoursArr,
    });
    fillTable({ member, allEvents, users });
    saveLocalStorage({
      users, days, hours, allEvents,
    });
  });

  let delElement = {};

  document.addEventListener('click', (e) => {
    const targ = e.target.closest('.div-fill-table-close');
    if (!targ) return;
    const textDiv = targ.previousElementSibling;
    const parentDiv = targ.parentElement;
    const { time } = textDiv.dataset;
    const { day } = textDiv.dataset;
    delElement = {
      textDiv,
      parentDiv,
      time,
      day,
      targ,
    };

    const text = `<${textDiv.textContent}>`;
    const textForDelModal = `Are you sure you want to delete ${text} event ?`;

    delModal.modal.style.display = 'flex';
    delModal.text.textContent = textForDelModal;
  });

  delModal.noBtn.addEventListener('click', () => {
    delModal.modal.style.display = 'none';
  });
  delModal.yesBtn.addEventListener('click', () => {
    const {
      textDiv, parentDiv, time, day, targ,
    } = delElement;

    const idx = allEvents.findIndex(
      (item) => item.time === time && item.day === day,
    );
    allEvents = [...allEvents.slice(0, idx), ...allEvents.slice(idx + 1)];
    users.forEach((item, i) => {
      const idxU = item.events.findIndex(
        (items) => items.time === time && items.day === day,
      );
      if (idxU !== -1) {
        users[i].events = [
          ...users[i].events.slice(0, idxU),
          ...users[i].events.slice(idxU + 1),
        ];
      }
    });

    textDiv.remove();
    targ.remove();
    parentDiv.classList.remove('color');
    delModal.modal.style.display = 'none';
    saveLocalStorage({
      users, days, hours, allEvents,
    });
  });

  selectMember.addEventListener('change', (e) => {
    member = e.target.value;
    fillTable({ member, allEvents, users });
  });

  scriptNewEvent({
    createBtn: buttons.createBtn,
    closeAlertBtn: buttons.closeAlertBtn,
    eventTitle: eventData.titleEvent,
    eventData,
    checkboxes,
    days,
    hoursArr,
    target: buttons.createBtn,
  });

  let currentDroppable = null;

  document.addEventListener('mousedown', (event) => {
    const targ = event.target.closest('.div-fill-table');
    if (!targ) return;
    const shiftX = event.clientX - targ.getBoundingClientRect().left;
    const shiftY = event.clientY - targ.getBoundingClientRect().top;
    let replaceField;

    targ.style.position = 'absolute';
    targ.style.zIndex = 1000;

    targ.style.height = `${targ.offsetHeight}px`;
    targ.style.width = `${targ.offsetWidth}px`;
    targ.parentElement.classList.remove('color');
    targ.nextElementSibling.remove();

    document.body.append(targ);

    const moveAt = (pageX, pageY) => {
      targ.style.left = `${pageX - shiftX}px`;
      targ.style.top = `${pageY - shiftY}px`;
    };

    moveAt(event.pageX, event.pageY);

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);

      targ.hidden = true;

      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      targ.hidden = false;

      if (!elemBelow) return;

      const droppableBelow = elemBelow.closest('td[data-day]');
      if (droppableBelow && droppableBelow.classList.contains('color')) {
        return;
      }
      replaceField = droppableBelow;

      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) {
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    targ.addEventListener('mouseup', () => {
      const { day } = targ.dataset;
      const { time } = targ.dataset;
      const { title } = targ;

      const changedDay = replaceField.dataset.day;
      const changedTime = replaceField.parentElement.dataset.time;
      replaceField.style.background = 'white';

      const idx = allEvents.findIndex(
        (item) => item.day === day && item.time === time,
      );
      allEvents = [
        ...allEvents.slice(0, idx),
        { title, day: changedDay, time: changedTime },
        ...allEvents.slice(idx + 1),
      ];

      users.forEach(({ events }, i) => {
        const idxU = events.findIndex(
          (item) => item.day === day && item.time === time,
        );
        if (idxU !== -1) {
          users[i].events = [
            ...users[i].events.slice(0, idxU),
            { title, day: changedDay, time: changedTime },
            ...users[i].events.slice(idxU + 1),
          ];
        }
      });
      saveLocalStorage({
        users, days, hours, allEvents,
      });
      document.removeEventListener('mousemove', onMouseMove);
      targ.onmouseup = null;
      fillTable({ member, allEvents, users });
    });
  });
};

if (!users.length) {
  confWind.createBtnCal.addEventListener('click', () => {
    const inpNames = document.querySelectorAll('.conf-name');
    const timeFrom = document.getElementById('t-from');
    const timeTo = document.getElementById('t-to');
    const daysFromTo = document.getElementById('d-from-to');
    const namesUsers = [];
    inpNames.forEach((item) => {
      if (item.value) {
        namesUsers.push({ name: item.value, events: [] });
      }
    });
    users = [...namesUsers];
    days = [...daysFromTo.value.split(',')];
    hours = `${timeFrom.value}-${timeTo.value}`;
    member = 'all';
    allEvents = [];
    hoursArr = countHours(hours);
    saveLocalStorage({
      users, days, hours, allEvents,
    });

    mountComponent({
      users, days, hours, hoursArr,
    });
    fillTable({ member, allEvents, users });
    confWind.createModCal.style.display = 'none';
    start();
  });
} else {
  confWind.createModCal.style.display = 'none';
  mountComponent({
    users, days, hours, hoursArr,
  });
  fillTable({ member, allEvents, users });
  start();
}
