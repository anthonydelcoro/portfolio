/**
 * Make .reading-page table sortable by column. Click header to sort; click again to reverse.
 * # and Stars: numeric. Book Title and Author: alphabetical.
 */
(function () {
  const table = document.querySelector('.reading-page table');
  const thead = table?.querySelector('thead');
  const tbody = table?.querySelector('tbody');
  if (!table || !thead || !tbody) return;

  const headers = thead.querySelectorAll('th');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  let sortCol = -1;
  let sortAsc = true;

  function getCellValue(row, colIndex) {
    const cell = row.cells[colIndex];
    if (!cell) return '';
    const text = (cell.textContent || '').trim();
    if (colIndex === 0) return parseInt(text, 10) || 0;
    if (colIndex === 3) {
      const stars = (text.match(/\u2606|\u2605/g) || []).length;
      return stars;
    }
    return text;
  }

  function compare(a, b, colIndex) {
    const va = getCellValue(a, colIndex);
    const vb = getCellValue(b, colIndex);
    if (typeof va === 'number' && typeof vb === 'number') return va - vb;
    return String(va).localeCompare(String(vb), undefined, { sensitivity: 'base' });
  }

  function sort(colIndex) {
    if (sortCol === colIndex) sortAsc = !sortAsc;
    else {
      sortCol = colIndex;
      sortAsc = true;
    }
    const mult = sortAsc ? 1 : -1;
    rows.sort((a, b) => mult * compare(a, b, colIndex));
    rows.forEach((r) => tbody.appendChild(r));
    updateCarets();
  }

  function updateCarets() {
    headers.forEach((th, i) => {
      const caret = th.querySelector('.sort-caret');
      if (!caret) return;
      caret.textContent = i === sortCol ? (sortAsc ? '\u25B2' : '\u25BC') : '\u25B2\u25BC';
      caret.className = 'sort-caret' + (i === sortCol ? (sortAsc ? ' sort-caret--asc' : ' sort-caret--desc') : '');
    });
  }

  headers.forEach((th, colIndex) => {
    th.style.cursor = 'pointer';
    th.style.userSelect = 'none';
    const caret = document.createElement('span');
    caret.className = 'sort-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.textContent = '\u25B2\u25BC';
    th.appendChild(document.createTextNode(' '));
    th.appendChild(caret);
    th.addEventListener('click', () => sort(colIndex));
  });
})();
