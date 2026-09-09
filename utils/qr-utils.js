/**
 * Utility functions for generating various QR code content types
 */

const formatWiFi = (ssid, password, encryption = 'WPA', hidden = false) => {
  return `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};;`;
};

const formatVCard = (details) => {
  const { firstName, lastName, phone, email, website, organization } = details;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${firstName} ${lastName}`,
    organization ? `ORG:${organization}` : '',
    phone ? `TEL;TYPE=CELL:${phone}` : '',
    email ? `EMAIL:${email}` : '',
    website ? `URL:${website}` : '',
    'END:VCARD'
  ].filter(line => line !== '').join('\n');
};

const formatEmail = (email, subject = '', body = '') => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  const query = params.toString();
  return `mailto:${email}${query ? '?' + query : ''}`;
};

// Global object to expose utilities to the React components
window.QRUtils = {
  formatWiFi,
  formatVCard,
  formatEmail
};