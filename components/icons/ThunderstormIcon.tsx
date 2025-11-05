
import React from 'react';

const ThunderstormIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.74 18a4.5 4.5 0 0 0-2.48-3.62A7 7 0 0 0 12 6.05a7 7 0 0 0-7 7c0 1.45.42 2.8.19 4.16" />
    <path d="m13 12-4 5h6l-4 5" />
  </svg>
);

export default ThunderstormIcon;
