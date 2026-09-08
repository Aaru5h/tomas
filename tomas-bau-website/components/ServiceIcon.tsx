const paths: Record<string, React.ReactNode> = {
  planks: (
    <>
      <rect x="3" y="4" width="18" height="4.5" rx="1" />
      <rect x="3" y="9.75" width="18" height="4.5" rx="1" />
      <rect x="3" y="15.5" width="18" height="4.5" rx="1" />
    </>
  ),
  droplet: <path d="M12 2.7 6.9 8.5a7.2 7.2 0 1 0 10.2 0L12 2.7Z" />,
  herringbone: (
    <>
      <path d="M3 12 8 7l5 5-5 5-5-5Z" />
      <path d="M11 7l5-5 5 5-5 5-5-5Z" />
      <path d="M11 17l5-5 5 5-5 5-5-5Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  package: (
    <>
      <path d="M21 8v8l-9 5-9-5V8l9-5 9 5Z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  level: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="1.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M7 10v4M17 10v4" />
    </>
  ),
  wrench: (
    <path d="M14.6 6.4a4 4 0 0 0 5.3 5.3l-9 9a2.6 2.6 0 1 1-3.7-3.7l9-9a4 4 0 0 0-1.6-1.6Z" />
  ),
  sander: (
    <>
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 14V9a2 2 0 0 1 2-2h3" />
      <path d="M12 7V4h6v3" />
    </>
  ),
};

export default function ServiceIcon({ name }: { name: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.planks}
    </svg>
  );
}
