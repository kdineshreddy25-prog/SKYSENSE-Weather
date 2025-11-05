
import React from 'react';

const SnowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
    <path d="m8 15-4 4" />
    <path d="m8 9-4 4" />
    <path d="m12 11-4 4" />
    <path d="m16 11-4 4" />
    <path d="m16 17-4 4" />
  </svg>
);

export default SnowIcon;
