export type Certificate = {
  name: string;
  org: string;
  date: string;
  href?: string;
};

// Populate with real credentials — name, issuing org, date (e.g. "May 2026"),
// and an optional link to the credential. The Certificates section only
// renders once this array has at least one entry.
export const certificates: Certificate[] = [];
