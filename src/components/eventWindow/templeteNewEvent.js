export default (users, days, hoursArr) => {
  const eventWindow = document.createElement('div');
  eventWindow.classList.add('event-window');

  const partOptionsHtml = users
    .map(
      (item) => `<div><input class="form-check-input check-event-users" type="checkbox" value="${item.name}"/><span class="unselectable">${item.name}</span></div>`,
    )
    .join('');
  const dayOptionsHtml = days
    .map((item) => `<option value="${item}">${item}</option>`)
    .join('');
  const hoursOptionsHtml = hoursArr
    .map((item) => `<option value="${item}">${item}</option>`)
    .join('');
  const html = `
    <div id="alert" class="alert alert-warning alert-dismissible fade " role="alert">
        <strong>Ops!</strong> Failed to create an event.Time slot already booked.
        <button id="close-alert-btn" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="event-pole">
        <h1 class="unselectable">Create new event</h1>
        <div class="input-group input-group-lg">
            <span class="input-group-text event-span unselectable" >Name of the event</span>
            <input type="text" id="event-title" class="form-control" aria-label="Sizing example input" aria-describedby="event-title">
        </div>
        <div class="participants-parent">
            <div class="input-group input-group-lg">
                  <span class="input-group-text event-span event-span-s unselectable">Participants</span>
                  <div class="partipals-text"></div>
            </div>
<div class="participants-fild">
${partOptionsHtml}
</div>
</div>
<div class="input-group input-group-lg">
<span class="input-group-text event-span unselectable">Day</span>
<select id="event-day" class="form-select">
${dayOptionsHtml}
</select>
</div>
<div class="input-group input-group-lg">
<span class="input-group-text event-span unselectable">Time</span>
<select id="event-time" class="form-select">
${hoursOptionsHtml}
</select>
</div>
<div class="event-actions">
<button id="cancel-window-btn" class="btn btn-outline-danger btn-lg">Cancel</button>
<button id="create-window-btn" class="btn btn-outline-info btn-lg" disabled>Create</button>
</div>
</div>

`;
  eventWindow.innerHTML = html;

  return eventWindow;
};
