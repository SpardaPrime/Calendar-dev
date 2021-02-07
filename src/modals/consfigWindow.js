export default () => {
  const configWindow = document.createElement('div');
  configWindow.classList.add('conf-wind');
  const html = `
   <div class="logo-config-w"><h1>Calendar</h1></div>
   <div class="conf-main">
   <div><h1>Create calendar</h1></div>
   
   <div class="input-group input-group-lg person-name">
   <span class="input-group-text">Person name</span>
   <input type="text" class="form-control conf-name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
   </div>
   <div class="conf-add-inp">
   <button id="conf-add-person" class="btn btn-outline-info" >Add person +</button>
   </div>
   <div class="input-group input-group-lg">
   <span class="input-group-text">Time from</span>
   <select id="t-from" class="form-select" aria-label="Default select example">
   <option value="08">08:00</option>
   <option value="09">09:00</option>
   <option value="10">10:00</option>
   <option value="11">11:00</option>
   <option value="12">12:00</option>
   </select>   
   <span class="input-group-text">To</span>
   <select id="t-to" class="form-select" aria-label="Default select example">
   <option value="16">16:00</option>
   <option value="17">17:00</option>
   <option value="18">18:00</option>
   <option value="19">19:00</option>
   <option value="20">20:00</option>
   <option value="21">21:00</option>
   </select>  
   </div>
   <div class="input-group input-group-lg">
   <span class="input-group-text">Days</span>
   <select id="d-from-to" class="form-select" aria-label="Default select example">
   <option value="Monday,Tuesday,Wednesday,Thursday,Friday">Monday - Friday</option>
   <option value="Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday">Monday - Sunday</option>
   </select>   
   </div>
   <div class="conf-actions">
   <button id="create-cal-con" class="btn btn-outline-info btn-lg" disabled>Create</button>
   </div>
   </div>
   `;
  configWindow.innerHTML = html;
  document.body.append(configWindow);

  const addPersBtn = document.getElementById('conf-add-person');
  const createCalBtn = document.getElementById('create-cal-con');
  addPersBtn.addEventListener('click', () => {
    const elements = document.querySelectorAll('.person-name');
    const div = document.createElement('div');
    div.classList.add('input-group', 'input-group-lg', 'person-name');
    div.innerHTML = `
      <span class="input-group-text">Person name</span>
      <input type="text" class="form-control conf-name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
      `;

    elements[elements.length - 1].after(div);
  });

  document.addEventListener('change', (e) => {
    const targ = e.target.closest('.conf-name');
    if (!targ) return;
    let res = false;
    const elems = document.querySelectorAll('.conf-name');
    elems.forEach((item) => {
      if (item.value) res = true;
    });
    if (res) {
      createCalBtn.removeAttribute('disabled');
    } else {
      createCalBtn.setAttribute('disabled', true);
    }
  });
};
