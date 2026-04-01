// SARIAJI LOGAM – Google Apps Script
// Deploy sebagai Web App: Execute as Me, Access: Anyone

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName('Pesanan');
    if (!sheet) {
      sheet = ss.insertSheet('Pesanan');
      const h = ['No','Tanggal','Nama','No HP','Email','Layanan','Lokasi','Keterangan','Status'];
      sheet.getRange(1,1,1,h.length).setValues([h]);
      const hr = sheet.getRange(1,1,1,h.length);
      hr.setBackground('#0f1117'); hr.setFontColor('#ffffff'); hr.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([sheet.getLastRow(), data.tanggal||new Date().toLocaleString('id-ID'), data.nama||'-', data.hp||'-', data.email||'-', data.layanan||'-', data.lokasi||'-', data.keterangan||'-', 'Menunggu']);
    return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error',message:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Sariaji Logam Script OK').setMimeType(ContentService.MimeType.TEXT);
}
