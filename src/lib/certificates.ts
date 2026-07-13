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
    href: "https://coursera.org/verify/professional-cert/PLLYFUATCHNQ",
  },
  {
    name: "Foundations of AI Engineering Certificate of Completion",
    org: "CodePath",
    date: "May 2026",
    href: "https://drive.google.com/file/d/1A4Ui9ty-z1PTgjR69qLDPa7eKbiUZzJu/view",
  },
  {
    name: "Business Analytics Nanodegree",
    org: "Udacity",
    date: "August 2025",
    href: "https://www.udacity.com/certificate/e/fa8b932a-3616-11f0-9069-57ce83c2047c",
  },
  {
    name: "Intermediate Cybersecurity Certificate of Completion",
    org: "CodePath",
    date: "August 2025",
    href: "https://drive.google.com/file/d/1l5r40Mit2gwu4-jXAT8IeN5LqY1cO3n6/view",
  },
];
