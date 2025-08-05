import styled from '@emotion/styled';
import { Container } from 'app/components';
import { useKpisTranslation } from 'app/internationalization/hooks';
import backgroundImage from 'assets/images/kpis-background.png';
import { FC } from 'react';

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
`;

const Empty: FC = () => {
  const { t } = useKpisTranslation();

  return (
    <BackgroundContainer className="w-full h-full flex justify-center bg-center bg-contain bg-no-repeat">
      <Container className="text-center flex flex-col h-full justify-center">
        <p className="font-bold text-xl">
          {t('Your Most Important Sales Numbers - Live and Accessible')}
        </p>
        <p className="mt-2">{t('Empty_description')}</p>
      </Container>
    </BackgroundContainer>
  );
};

export default Empty;
