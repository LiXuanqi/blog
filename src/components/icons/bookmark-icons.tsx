import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const SvglIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="2" y="2" width="20" height="20" fill="#222222" rx="4" />
    <path
      d="M7 7h6c2 0 3 1 3 3v4c0 2-1 3-3 3h-3v-3h3c.5 0 1-.5 1-1v-2c0-.5-.5-1-1-1H7V7z"
      fill="#FFFFFF"
    />
    <path d="M11 11v6h2v-6z" fill="#FFFFFF" />
  </svg>
);
