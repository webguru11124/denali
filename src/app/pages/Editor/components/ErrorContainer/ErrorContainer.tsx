import styled from '@emotion/styled';
import { Button } from 'app/components';
import {
  useCommonTranslation,
  useErrorTranslation,
} from 'app/internationalization/hooks';
import { ErrorsKey } from 'app/internationalization/types';
import barrier from 'assets/images/barrier.png';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23D2CECDFF' stroke-width='2' stroke-dasharray='16%2c 16' stroke-dashoffset='93' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 15px;
`;

type ErrorStatus = {
  image?: string;
  error?: ErrorsKey;
  title?: ErrorsKey;
  description?: ErrorsKey;
};

enum ErrorKeys {
  _403 = 403,
  _404 = 404,
  _500 = 500,
  _999 = 999,
}

const ERROR_STATUS: {
  [key in ErrorKeys]: ErrorStatus;
} = {
  '404': {
    error: '404 - not found',
    title: 'Oh no! The article you’re looking for isn’t here.',
    description:
      'If you think there’s a mistake, contact the article owner for help.',
    image: barrier,
  },
  '403': {
    error: "{{status}} - couldn't load",
    title: 'Oh no! The article you’re looking for is not accessible.',
    description:
      'If you think there’s a mistake, contact the article owner for help.',
    image: barrier,
  },
  '500': {
    error: "{{status}} - couldn't load",
    title: 'Well, this is unexpected. An error has occurred.',
    image: barrier,
  },
  // Generic status
  '999': {
    title: 'An error occurred',
    description: 'Please reload the page and try again',
    image: barrier,
  },
};

const ErrorContainer = ({ error }: Props) => {
  const { t } = useErrorTranslation();
  const { t: tc } = useCommonTranslation();
  const history = useHistory();

  let errorStatus: ErrorKeys = error?.response?.status ?? 999;

  if (
    !errorStatus ||
    !Object.keys(ERROR_STATUS).includes(String(errorStatus))
  ) {
    errorStatus = 999;
  }

  const err = ERROR_STATUS[errorStatus];

  return (
    <div className="flex py-16 flex-1">
      <Container className="bg-white flex flex-col grow items-center p-8">
        <div className="flex flex-col justify-center items-center gap-3 min-w-[300px] w-[50vw] py-21">
          <img className="w-16" src={err.image} alt="" />
          {err?.error && (
            <p className="text-sm text-grayscale-secondary">
              {t(err.error, { status: errorStatus })}
            </p>
          )}
          {err?.title && (
            <p className="text-lg max-w-xl text-center font-semibold">
              {t(err.title)}
            </p>
          )}
          {err?.description && (
            <p className="text-base text-grayscale-primary text-center">
              {t(err.description)}
            </p>
          )}
          <div className="mt-6 w-full max-w-[230px]">
            <Button onClick={history.goBack} variant="secondary">
              {tc("Let's go back")}
            </Button>
          </div>
          <div className="w-full max-w-[230px]">
            <Button
              onClick={() => history.go(0)}
              variant="secondary"
              className="capitalize"
            >
              {tc('try again')}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

interface Props {
  error?: {
    response?: {
      status: 403 | 404 | 500;
    };
  };
}

export default ErrorContainer;
