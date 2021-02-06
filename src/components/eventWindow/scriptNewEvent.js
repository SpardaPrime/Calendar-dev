import { clearEvent } from '../../func/other';

export default ({
  createBtn,
  closeAlertBtn,
  eventTitle,
  eventData,
  checkboxes,
  days,
  hoursArr,
  target,
}) => {
  const cancelWindowBtn = document.getElementById('cancel-window-btn');

  const textField = document.querySelector('.partipals-text');
  let users = [];

  const togleDisabled = () => {
    if (textField.textContent.length && eventTitle.value) {
      createBtn.removeAttribute('disabled');
    } else {
      createBtn.setAttribute('disabled', true);
    }
  };

  cancelWindowBtn.addEventListener('click', () => clearEvent({
    eventData,
    closeAlertBtn,
    checkboxes,
    target,
    days,
    hoursArr,
  }));

  closeAlertBtn.addEventListener('click', (e) => e.target.parentNode.classList.remove('show'));

  eventTitle.addEventListener('input', togleDisabled);

  document.addEventListener('change', (e) => {
    const targ = e.target.closest('.check-event-users');
    if (!targ) return;
    if (targ.checked) {
      users.push(targ.value);
    } else {
      const idx = users.findIndex((item) => item === targ.value);
      users = [...users.slice(0, idx), ...users.slice(idx + 1)];
    }
    textField.textContent = users.join('; ');
    togleDisabled();
  });

  createBtn.addEventListener('click', () => { users = []; });
};
