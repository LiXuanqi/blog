import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const SvglIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect
      id="b"
      width={512}
      height={512}
      x={0}
      y={0}
      rx={128}
      fill="#222"
      stroke="#FFF"
      strokeWidth={0}
      strokeOpacity="100%"
      paintOrder="stroke"
    />
    <rect
      width={512}
      height={512}
      fill="url(#a)"
      rx={128}
      style={{
        mixBlendMode: "overlay",
      }}
    />
    <clipPath>
      <use xlinkHref="#b" />
    </clipPath>
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(135)"
        style={{
          transformOrigin: "center center",
        }}
      >
        <stop stopColor="#222" />
        <stop offset={1} stopColor="#222" />
      </linearGradient>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 512 -512 0 256 0)"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
    </defs>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={310}
      height={310}
      fill="#e8e8e8"
      viewBox="0 0 256 256"
      x={101}
      y={101}
      alignmentBaseline="middle"
      color="#fff"
    >
      <path d="M168 32H88a56.06 56.06 0 00-56 56v80a56.06 56.06 0 0056 56h48a8.07 8.07 0 002.53-.41c26.23-8.75 76.31-58.83 85.06-85.06A8.07 8.07 0 00224 136V88a56.06 56.06 0 00-56-56zM48 168V88a40 40 0 0140-40h80a40 40 0 0140 40v40h-24a56.06 56.06 0 00-56 56v24H88a40 40 0 01-40-40zm96 35.14V184a40 40 0 0140-40h19.14C191 163.5 163.5 191 144 203.14z" />
    </svg>
  </svg>
);

export default SvglIcon;
