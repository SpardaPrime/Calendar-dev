import { countHours, tableConstructor } from '../func/other';

export default (arr, h) => {
  const headers = ['Time', ...arr];
  const hours = countHours(h);
  const table = document.createElement('div');
  table.classList.add('parent-table');
  const html = tableConstructor(headers, hours);

  table.innerHTML = html;

  return table;
};
