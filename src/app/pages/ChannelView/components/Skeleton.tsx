import styled from '@emotion/styled';

const SkeletonBox = styled.div(
  ({ enabled = true, full = true }: { enabled?: boolean; full?: boolean }) =>
    enabled
      ? `
  position: relative;
  overflow: hidden;
  background: ${
    full
      ? '#f3f4f8'
      : 'linear-gradient(to bottom, #f3f4f8 78%, transparent 22%)'
  };
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`
      : ``
);

export default SkeletonBox;
