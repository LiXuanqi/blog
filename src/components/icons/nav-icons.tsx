import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const BlogIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect x="2" y="2" width="12" height="12" fill="#4F46E5" rx="1" />
    <rect x="4" y="5" width="8" height="1" fill="#FFFFFF" />
    <rect x="4" y="7" width="6" height="1" fill="#FFFFFF" />
    <rect x="4" y="9" width="7" height="1" fill="#FFFFFF" />
    <rect x="4" y="11" width="5" height="1" fill="#FFFFFF" />
  </svg>
);

export const NotesIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect x="3" y="1" width="10" height="14" fill="#10B981" rx="1" />
    <rect x="1" y="2" width="2" height="12" fill="#065F46" />
    <rect x="5" y="4" width="6" height="1" fill="#FFFFFF" />
    <rect x="5" y="6" width="5" height="1" fill="#FFFFFF" />
    <rect x="5" y="8" width="6" height="1" fill="#FFFFFF" />
    <rect x="5" y="10" width="4" height="1" fill="#FFFFFF" />
  </svg>
);

export const ResumeIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
    <rect
      x="3"
      y="1"
      width="10"
      height="14"
      fill="#FFFFFF"
      stroke="#6B7280"
      strokeWidth="1"
      rx="1"
    />
    <rect x="5" y="3" width="6" height="1" fill="#1F2937" />
    <rect x="5" y="5" width="4" height="1" fill="#6B7280" />
    <rect x="5" y="7" width="5" height="1" fill="#6B7280" />
    <rect x="5" y="9" width="6" height="1" fill="#6B7280" />
    <rect x="5" y="11" width="3" height="1" fill="#6B7280" />
    <circle cx="7" cy="3" r="1" fill="#EF4444" />
  </svg>
);
