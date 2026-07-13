export type Certificate = {
  name: string;
  org: string;
  date: string;
  href?: string;
};

// href omitted where the real credential URL isn't known yet — add the URL and
// a "View credential ↗" link renders automatically. The Certificates section
// only shows once this array has at least one entry.
export const certificates: Certificate[] = [
  {
    name: "Google IT Automation with Python Professional Certificate",
    org: "Google · Coursera",
    date: "July 2026",
  },
  {
    name: "Foundations of AI Engineering Certificate of Completion",
    org: "CodePath",
    date: "May 2026",
  },
  {
    name: "Business Analytics Nanodegree",
    org: "Udacity",
    date: "August 2025",
  },
  {
    name: "Intermediate Cybersecurity Certificate of Completion",
    org: "CodePath",
    date: "August 2025",
  },
];
