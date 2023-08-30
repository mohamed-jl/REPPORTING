import * as XLSX from 'xlsx';

self.onmessage = (event) => {
  const { rows, columns, title } = event.data;
  const sheetName = 'Sheet1';

  const totalRows = rows.length;
  const chunkSize = 1000; // Number of rows to export per chunk
  const totalChunks = Math.ceil(totalRows / chunkSize);

  const workbook = XLSX.utils.book_new();

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalRows);
    const chunkRows = rows.slice(start, end);

    const ws = XLSX.utils.json_to_sheet(chunkRows, { header: columns });
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);

    const progress = Math.ceil(((i + 1) / totalChunks) * 100);
    self.postMessage({ progress });
  }

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  self.postMessage({ progress: -1, blob });
};
