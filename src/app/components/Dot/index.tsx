import React from 'react';

interface DotProps {
  className?: string;
}

const Dot: React.FC<DotProps> = ({ className }) => (
  <span className={className}>•</span>
);

export default Dot;
