export default () => {
  const modal = document.createElement('div');
  modal.classList.add('del-modal');
  const html = `
    <div class="main-modal-field">
    <div>
    <h4 id="del-modal-text">text</h4>
    </div>
        <div class="del-modal-cations">
        <button id="del-modal-no" class="btn btn-outline-danger btn-lg">No</button>
        <button id="del-modal-yes" class="btn btn-outline-info btn-lg">Yes</button>

        </div>
    </div>
    `;
  modal.innerHTML = html;
  return modal;
};
