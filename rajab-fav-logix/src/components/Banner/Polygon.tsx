import clsx from "clsx";

export function Polygon({
  children,
  active = false,
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement> & { active?: boolean }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 78 86"
      xmlns="http://www.w3.org/2000/svg"
className={`group/polygon cursor-pointer ${className} `}
      {...props}
    >
      {/* Centered content using foreignObject */}
      {children && (
        <foreignObject x="0" y="0" className="size-full">
          <div className="flex size-full items-center justify-center [&_svg:not([class*='size-'])]:size-7.5 [&_svg:not([class*='text-'])]:text-[#90909B]">
            {children}
          </div>
        </foreignObject>
      )}

      {/* Background */}
      <path
        className="fill-black/20"
        d="M31.988 1.871a13.97 13.97 0 0 1 13.966 0L70.96 16.308a13.97 13.97 0 0 1 6.983 12.095v28.873c0 4.99-2.662 9.6-6.983 12.095L45.954 83.808a13.97 13.97 0 0 1-13.966 0L6.983 69.37A13.97 13.97 0 0 1 0 57.276V28.403c0-4.99 2.662-9.6 6.983-12.095z"
      />

      {/* Default stroke (fade out on hover) */}
      <path
        strokeWidth="1.5"
        className="stroke-white/8 transition-opacity duration-300 group-hover/polygon:opacity-0"
        d="M32.363 2.521a13.22 13.22 0 0 1 13.217 0l25.004 14.436a13.22 13.22 0 0 1 6.608 11.446v28.873c0 4.721-2.519 9.084-6.608 11.445L45.58 83.158a13.22 13.22 0 0 1-13.217 0L7.358 68.72A13.22 13.22 0 0 1 .75 57.276V28.403c0-4.722 2.519-9.084 6.608-11.445z"
      />

  <path
  strokeWidth="1.5"
  stroke="url(#gradient-shimmer)"
  className={clsx(
    "transition-opacity duration-300",
    active ? "opacity-100" : "opacity-0 group-hover/polygon:opacity-100"
  )}
  d="M32.363 2.521a13.22 13.22 0 0 1 13.217 0l25.004 14.436a13.22 13.22 0 0 1 6.608 11.446v28.873c0 4.721-2.519 9.084-6.608 11.445L45.58 83.158a13.22 13.22 0 0 1-13.217 0L7.358 68.72A13.22 13.22 0 0 1 .75 57.276V28.403c0-4.722 2.519-9.084 6.608-11.445z"
/>

      <defs>
        <linearGradient
          id="gradient-shimmer"
          x1="0"
          x2="78"
          y1="0"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="0 39 43"
            to="360 39 43"
            dur="2s"
            repeatCount="indefinite"
          />
          <stop stopColor="#007aec" stopOpacity="0.12" />
          <stop offset="1" stopColor="#007aec" />
        </linearGradient>
      </defs>
    </svg>
  );
}
