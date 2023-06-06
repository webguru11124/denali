import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';

const Tag = styled.div`
  background: linear-gradient(104.73deg, #2e3192 3.9%, #e8a39c 107.55%);
`;

const Content = styled.div`
  height: 22px;
  border-radius: 11px;
`;

const Text = styled.span`
  background: linear-gradient(104.73deg, #2e3192 3.9%, #e8a39c 107.55%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

interface Props {
  className?: string;
}

const BetaTag: FC<Props> = ({ className }) => (
  <Tag
    className={cx(
      className,
      'flex flex-col overflow-hidden h-6 rounded-xl p-px'
    )}
  >
    <Content className="flex flex-1 items-center px-3 bg-white">
      <Text className="font-bold text-xs">Beta</Text>
    </Content>
  </Tag>
);

export default BetaTag;
