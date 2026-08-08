import type { SVGProps } from "react";

/**
 * Set de iconos propio (SVG inline) para no sumar dependencias ni
 * requests extra. Se referencian por nombre desde lib/apps.ts.
 */

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const icons = {
  bolt: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
    </svg>
  ),
  sparkles: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M18.5 15.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" />
    </svg>
  ),
  shield: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3l7.5 2.8v5.4c0 4.6-3.1 8.3-7.5 9.8-4.4-1.5-7.5-5.2-7.5-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  ),
  lock: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.75a4 4 0 0 1 8 0v2.75" />
      <path d="M12 15v2" />
    </svg>
  ),
  offline: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M5 17.5a3.5 3.5 0 0 1 .8-6.9 5.5 5.5 0 0 1 10.5-1.4" />
      <path d="M18.5 10.7a3.9 3.9 0 0 1 .7 7.7H8" />
      <path d="m3 3 18 18" />
    </svg>
  ),
  chart: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16.5v-4" />
      <path d="M12.5 16.5v-8" />
      <path d="M17 16.5v-5.5" />
    </svg>
  ),
  download: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  ),
  device: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 5h2" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  palette: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-.9 2-1.8 0-1.6-1.7-1.7-1.7-3.2 0-1.1.9-2 2-2H16a5 5 0 0 0 5-5c0-3.4-4-6-9-6Z" />
      <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  code: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m9 8-5 4 5 4" />
      <path d="m15 8 5 4-5 4" />
    </svg>
  ),
  logout: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M9.5 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3.5" />
      <path d="m15 8.5 3.5 3.5-3.5 3.5" />
      <path d="M18.5 12H9.5" />
    </svg>
  ),
  sidebar: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9.5 4v16" />
    </svg>
  ),
  layout: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M9.5 9v11" />
    </svg>
  ),
  card: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="2.75" y="5.5" width="18.5" height="13" rx="2.5" />
      <path d="M2.75 10h18.5" />
      <path d="M6.5 14.5h3" />
    </svg>
  ),
  message: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M21 11.5a8.2 8.2 0 0 1-8.5 8.1 8.9 8.9 0 0 1-3.9-.9L3 20l1.4-4.4a8 8 0 0 1-1-3.9A8.2 8.2 0 0 1 12 3.5a8.2 8.2 0 0 1 9 8Z" />
    </svg>
  ),
  database: (p: Props) => (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="6" rx="7.25" ry="3.25" />
      <path d="M4.75 6v12c0 1.8 3.25 3.25 7.25 3.25s7.25-1.45 7.25-3.25V6" />
      <path d="M4.75 12c0 1.8 3.25 3.25 7.25 3.25S19.25 13.8 19.25 12" />
    </svg>
  ),
  link: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M10.5 13.5a3.75 3.75 0 0 0 5.3 0l3-3a3.75 3.75 0 0 0-5.3-5.3l-1.6 1.6" />
      <path d="M13.5 10.5a3.75 3.75 0 0 0-5.3 0l-3 3a3.75 3.75 0 0 0 5.3 5.3l1.6-1.6" />
    </svg>
  ),
  chat: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M20 4.75H4A1.75 1.75 0 0 0 2.25 6.5v8.25A1.75 1.75 0 0 0 4 16.5h3.25v3.25l4-3.25H20a1.75 1.75 0 0 0 1.75-1.75V6.5A1.75 1.75 0 0 0 20 4.75Z" />
      <circle cx="8.5" cy="10.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  users: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="9.5" cy="8.5" r="3.5" />
      <path d="M3.5 20.5a6 6 0 0 1 12 0" />
      <path d="M16 5.3a3.5 3.5 0 0 1 0 6.4" />
      <path d="M18 14.6a6 6 0 0 1 3 5.9" />
    </svg>
  ),
  mail: (p: Props) => (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 8 8 5 8-5" />
    </svg>
  ),
  arrowRight: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  ),
  chevronLeft: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  ),
  chevronRight: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  ),
  globe: (p: Props) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M3.25 12h17.5" />
      <path d="M12 3.25c2.2 2.3 3.4 5.4 3.4 8.75S14.2 18.45 12 20.75c-2.2-2.3-3.4-5.4-3.4-8.75S9.8 5.55 12 3.25Z" />
    </svg>
  ),
  chevronDown: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  ),
  close: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  menu: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  check: (p: Props) => (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
} satisfies Record<string, (p: Props) => React.ReactElement>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  ...rest
}: { name: IconName } & Props) {
  const Cmp = icons[name];
  return <Cmp className={className} aria-hidden="true" {...rest} />;
}
