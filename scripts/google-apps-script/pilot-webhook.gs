/**
 * FitPrint pilot-request webhook.
 *
 * Deploy this file as a Web app from Google Apps Script:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Set these Script Properties before deployment:
 * - FITPRINT_SHEET_ID: 1l2iyFcacAYlvso_n_oGq6VzqOTWCGINaNQRZzfZc3ns
 * - FITPRINT_SHEET_NAME: Pilot Leads
 * - FITPRINT_SHARED_SECRET: a long random secret shared with Vercel
 */

function doPost(e) {
  var properties = PropertiesService.getScriptProperties();
  var expectedSecret = properties.getProperty('FITPRINT_SHARED_SECRET');
  var receivedSecret = e && e.parameter && e.parameter.secret;

  // Apps Script web apps do not reliably expose custom headers in every deployment.
  // The Next.js proxy sends the secret in the JSON body as a fallback.
  var body = {};
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (error) {
    return jsonResponse({ success: false, message: 'Invalid JSON payload.' }, 400);
  }

  if (!expectedSecret || (receivedSecret !== expectedSecret && body.secret !== expectedSecret)) {
    return jsonResponse({ success: false, message: 'Unauthorized.' }, 401);
  }

  if (body.website) {
    return jsonResponse({ success: true });
  }

  var requiredFields = ['name', 'email', 'brand', 'category', 'challenge'];
  for (var i = 0; i < requiredFields.length; i += 1) {
    if (!body[requiredFields[i]]) {
      return jsonResponse({ success: false, message: 'Missing required field.' }, 400);
    }
  }

  var sheetId = properties.getProperty('FITPRINT_SHEET_ID');
  var sheetName = properties.getProperty('FITPRINT_SHEET_NAME') || 'Pilot Leads';
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  if (!sheet) {
    return jsonResponse({ success: false, message: 'Configured sheet was not found.' }, 500);
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || '',
      body.email || '',
      body.brand || '',
      body.storeUrl || '',
      body.platform || '',
      body.category || '',
      body.productCount || '',
      body.challenge || '',
      body.timeline || '',
      body.source || 'fitprint-website',
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ success: true });
}

function jsonResponse(payload, statusCode) {
  // Apps Script ContentService does not support setting arbitrary HTTP status codes.
  // The payload remains explicit so the Next.js proxy can handle failures safely.
  return ContentService
    .createTextOutput(JSON.stringify({ ...payload, statusCode: statusCode || 200 }))
    .setMimeType(ContentService.MimeType.JSON);
}
