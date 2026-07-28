/**
 * PICTURA CREATIONS - GOOGLE APPS SCRIPT FOR GOOGLE SHEETS FORM SUBMISSIONS
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet (e.g. "Pictura Web Inquiries").
 * 2. Click Extensions > Apps Script.
 * 3. Delete any existing code in Code.gs and paste this entire code below.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Pictura Booking Form API".
 * 7. Set "Execute as": "Me".
 * 8. Set "Who has access": "Anyone".
 * 9. Click "Deploy", authorize access, and copy the Web App URL!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Client Name",
        "Phone Number",
        "Email Address",
        "Event Date",
        "Budget Range",
        "Location",
        "Selected Service",
        "Notes / Details"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#FF5500").setFontColor("#FFFFFF");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || data.clientName || "N/A";
    var phone = data.phone || data.clientPhone || "N/A";
    var email = data.email || data.clientEmail || "N/A";
    var date = data.date || data.eventDate || "N/A";
    var budget = data.budget || "N/A";
    var location = data.location || data.eventLocation || "N/A";
    var service = data.service || data.packageTitle || "N/A";
    var message = data.message || data.notes || "N/A";

    sheet.appendRow([
      timestamp,
      name,
      phone,
      email,
      date,
      budget,
      location,
      service,
      message
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Booking inquiry saved successfully!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Pictura Creations Google Apps Script API is running!");
}
