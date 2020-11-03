const { GoogleSpreadsheet } = require("google-spreadsheet");

/**
 * Return Google Sheet data
 * @param {Object} context
 * @param {String} event.sheetId - google sheet id
 * @param {String} event.query - name of the column to search
 * @param {String} event.search - value to search for
 * @param {*} callback
 */
exports.handler = async (context, event, callback) => {
  const doc = new GoogleSpreadsheet(event.sheetId);

  doc.useApiKey(context.GOOGLE_API_KEY);
  try {
    await doc.loadInfo(); // loads document properties and worksheets
  } catch (err) {
    callback(err);
  }

  let sheet = doc.sheetsByIndex[0];
  let data = await sheet.getRows();
  let rawSheet = data.find((s) => s[event.query] == event.search);

  let result = {};
  rawSheet._sheet.headerValues.forEach(
    (header, i) => (result[header] = rawSheet._rawData[i] || null)
  );

  callback(null, result);
};
