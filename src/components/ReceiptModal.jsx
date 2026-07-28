import { useRef } from 'react';
import { X, CheckCircle, Printer, MessageCircle, Share2, Sparkles, FileText } from 'lucide-react';
import PicturaLogo from './PicturaLogo';
import './ReceiptModal.css';

export default function ReceiptModal({ bookingData, onClose }) {
  const receiptRef = useRef(null);

  if (!bookingData) return null;

  const {
    receiptId = `PIC-${Math.floor(100000 + Math.random() * 900000)}`,
    date = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }),
    clientName = 'Valued Client',
    clientPhone = '',
    clientEmail = '',
    eventDate = '',
    eventLocation = 'Townsville, QLD',
    packageTitle = 'Gold Package',
    duration = '4-6 Hours',
    crewText = '1 Photographer + 1 Videographer',
    photoCount = '60 Retouched Photos',
    highlightFormat = 'Horizontal (16:9 Cinema)',
    addons = [],
    totalPrice = '$1,850 AUD',
    notes = ''
  } = bookingData;

  // Format classic WhatsApp Receipt text
  const sendWhatsAppReceipt = () => {
    const text = `🧾 *PICTURA CREATIONS - OFFICIAL BOOKING RECEIPT*
────────────────────────
*Receipt ID:* #${receiptId}
*Date:* ${date}
*Client:* ${clientName}
*Phone:* ${clientPhone}
*Event Date:* ${eventDate || 'To be confirmed'}
*Location:* ${eventLocation}

📌 *PACKAGE DETAILS*
• *Package:* ${packageTitle}
• *Duration:* ${duration}
• *Crew:* ${crewText}
• *Retouched Photos:* ${photoCount}
• *Highlight Reel:* ${highlightFormat}
${addons.length > 0 ? `• *Add-ons:* ${addons.join(', ')}\n` : ''}────────────────────────
*Status:* CONFIRMED BOOKING
Thank you for choosing Pictura Creations! We look forward to capturing your visual story.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/61455974240?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()} ref={receiptRef}>
        {/* Close Button */}
        <button type="button" className="receipt-close-btn" onClick={onClose} aria-label="Close receipt">
          <X size={20} />
        </button>

        {/* Receipt Watermark Badge */}
        <div className="receipt-watermark-stamp">
          <CheckCircle size={16} />
          <span>CONFIRMED BOOKING</span>
        </div>

        {/* Receipt Header */}
        <div className="receipt-header">
          <div className="receipt-brand">
            <PicturaLogo variant="horizontal" height={36} />
            <p className="receipt-subtitle">Townsville, Queensland | Est. 2020</p>
          </div>
          <div className="receipt-meta">
            <h3 className="receipt-title">BOOKING RECEIPT</h3>
            <p className="receipt-id">#{receiptId}</p>
            <p className="receipt-date">Issued: {date}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="receipt-divider" />

        {/* Bill To & Event Details */}
        <div className="receipt-details-grid">
          <div className="receipt-col">
            <h4 className="receipt-section-label">CLIENT DETAILS</h4>
            <p className="receipt-value-main">{clientName}</p>
            {clientPhone && <p className="receipt-value-sub">📞 {clientPhone}</p>}
            {clientEmail && <p className="receipt-value-sub">✉️ {clientEmail}</p>}
          </div>

          <div className="receipt-col">
            <h4 className="receipt-section-label">EVENT LOCATION & DATE</h4>
            <p className="receipt-value-main">📍 {eventLocation}</p>
            <p className="receipt-value-sub">📅 Date: {eventDate || 'To Be Scheduled'}</p>
          </div>
        </div>

        {/* Itemized Service Breakdown Table */}
        <div className="receipt-table-wrapper">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>SERVICE ITEM / SPECIFICATION</th>
                <th className="text-right">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Selected Package</strong></td>
                <td className="text-right text-orange"><strong>{packageTitle}</strong></td>
              </tr>
              <tr>
                <td>Coverage Duration</td>
                <td className="text-right">{duration}</td>
              </tr>
              <tr>
                <td>Crew Operators</td>
                <td className="text-right">{crewText}</td>
              </tr>
              <tr>
                <td>Retouched Photos Included</td>
                <td className="text-right">{photoCount}</td>
              </tr>
              <tr>
                <td>Highlight Film Format</td>
                <td className="text-right">{highlightFormat}</td>
              </tr>
              {addons.map((item, i) => (
                <tr key={i}>
                  <td>Add-on: {item}</td>
                  <td className="text-right">Included</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notes && (
          <div className="receipt-notes-box">
            <h5 className="receipt-notes-label">SPECIAL REQUESTS / NOTES</h5>
            <p className="receipt-notes-text">{notes}</p>
          </div>
        )}

        {/* Receipt Action Buttons */}
        <div className="receipt-actions-row">
          <button type="button" className="receipt-action-btn wa" onClick={sendWhatsAppReceipt}>
            <MessageCircle size={18} />
            <span>CONFIRM & SEND VIA WHATSAPP</span>
          </button>

          <button type="button" className="receipt-action-btn print" onClick={handlePrint}>
            <Printer size={18} />
            <span>PRINT RECEIPT / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
