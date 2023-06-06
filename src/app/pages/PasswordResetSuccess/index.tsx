import styled from '@emotion/styled';
import { Logo } from 'app/components';
import { useUrlQuery } from 'app/hooks';
import { routes } from 'app/router';
import loginBackground from 'assets/images/login-background.svg';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  background: url(${loginBackground});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentContainer = styled.div`
  height: 23.125rem; // 370px
`;

const Content = styled.div`
  width: 431px;
`;

const PasswordResetSuccess: React.FC = () => {
  const history = useHistory();
  const queryEmail = useUrlQuery('email');

  useEffect(() => {
    if (!queryEmail) {
      history.replace(routes.login.create());
    }
  }, [history, queryEmail]);

  return (
    <Container className="w-screen h-screen flex justify-center items-center">
      <ContentContainer className="bg-light shadow-card rounded-lg py-12 px-18 flex flex-col items-center">
        <div>
          <Logo size="lg" />
        </div>
        <Content className="my-auto text-center">
          <p className="text-center text-lg font-bold mb-3">
            Your email is on the way! 🚀
          </p>
          <p className="mb-4">
            Instructions to help you reset your password has been sent to{' '}
            <span className="font-bold">{queryEmail}</span>.
          </p>
          <p>
            You’ll receive the email within 5 minutes. Be sure to check your
            spam folder, too.
          </p>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default PasswordResetSuccess;
