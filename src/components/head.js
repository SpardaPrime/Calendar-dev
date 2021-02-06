export default (arr) => {
  if (arr.length) {
    const div = document.createElement('div');
    let html = `
<div class="head">
<div class="logo"><h1 class="unselectable">Calendar</h1></div>
<div class="actions">
<button id="rewrite-table" class="btn btn-outline-info">New table</button>
<select id="select-member" class="form-select users-select">
<option value="all" selected >All members</option>
`;
    arr.forEach(
      ({ name }) => { html += `<option value="${name}">${name}</option>`; },
    );
    html += `</select>
<button id="event-btn" type="button" class="btn btn-outline-info event-btn">New event +</button>
</div>
</div>`;

    div.innerHTML = html;

    document.addEventListener('click', (e) => {
      const targ = e.target.closest('#event-btn');
      if (!targ) {
        return;
      }
      document.querySelector('.event-window').style.display = 'flex';
    });

    return div;
  }
};
