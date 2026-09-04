# FitPrint pilot-request webhook

This webhook appends pilot-assessment requests to the Google Sheet created for FitPrint:

- Spreadsheet: `FitPrint Pilot Requests`
- Tab: `Pilot Leads`
- Spreadsheet ID: `1l2iyFcacAYlvso_n_oGq6VzqOTWCGINaNQRZzfZc3ns`

## 1. Create the Apps Script web app

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Replace the default script with the contents of `pilot-webhook.gs`.
3. Open **Project Settings → Script Properties**.
4. Add these properties:

   - `FITPRINT_SHEET_ID` = `1l2iyFcacAYlvso_n_oGq6VzqOTWCGINaNQRZzfZc3ns`
   - `FITPRINT_SHEET_NAME` = `Pilot Leads`
   - `FITPRINT_SHARED_SECRET` = a long random value that is not committed to GitHub

5. Choose **Deploy → New deployment**.
6. Select **Web app**.
7. Set **Execute as** to your account.
8. Set **Who has access** to **Anyone**.
9. Deploy, authorize the requested Google permissions, and copy the web-app URL.

The webhook does not expose the spreadsheet ID or secret to website visitors. Google Apps Script receives requests only from the FitPrint server route.

## 2. Configure Vercel

Add these environment variables to the FitPrint Vercel project for Preview and Production:

- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` = the deployed Apps Script web-app URL
- `GOOGLE_APPS_SCRIPT_SHARED_SECRET` = the same secret stored in Apps Script

Redeploy after adding or changing environment variables.

## 3. Test the flow

1. Open the deployed FitPrint site.
2. Submit the pilot assessment form with a test record.
3. Confirm the request appears as a new row in the `Pilot Leads` tab.
4. Confirm invalid email and missing required fields are rejected.
5. Do not use real sensitive customer body measurements in this form; the current form is for merchant pilot requests only.

## Security notes

- Keep the shared secret out of GitHub, client-side code, and screenshots.
- If the secret is exposed, rotate it in both Apps Script and Vercel.
- The Next.js route validates required fields, email format, URL format, field lengths, and a hidden bot field before forwarding.
- Apps Script appends only the intended lead fields and ignores the secret when writing the row.
