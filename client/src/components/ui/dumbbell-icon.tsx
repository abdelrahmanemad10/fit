import { SVGProps } from "react";

export function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
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
      <path d="M6.5 6.5h11"></path>
      <path d="M6.5 17.5h11"></path>
      <path d="M4 4v16"></path>
      <path d="M9 4v16"></path>
      <path d="M15 4v16"></path>
      <path d="M20 4v16"></path>
    </svg>
  );
}
