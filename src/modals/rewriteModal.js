export default () => {
  const modal = document.createElement('div');
  modal.classList.add('rewrite-modal');
  const html = `
    <div class="main-modal-field">
    <div>
    <h4 class="rewrite-text">Сreate a new table (all previous data will be lost)</h4>
    </div>
        <div class="del-modal-cations">
        <button id="rewrite-no" class="btn btn-outline-danger btn-lg">No</button>
        <button id="rewrite-yes" class="btn btn-outline-info btn-lg">Yes</button>

        </div>
    </div>
    `;
  modal.innerHTML = html;
  return modal;
};
