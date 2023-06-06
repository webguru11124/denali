import {
  useCommonTranslation,
  useErrorTranslation,
} from 'app/internationalization/hooks';
import { ErrorsKey } from 'app/internationalization/types';
import alert from 'assets/images/alert.png';
import barrier from 'assets/images/barrier.png';
import disappointedFace from 'assets/images/disappointed-face.png';
import React from 'react';
import { useHistory } from 'react-router-dom';

type ErrorStatus = {
  image?: string;
  title: ErrorsKey;
  description: ErrorsKey;
};

const ERROR_STATUS: {
  [x: string | number]: ErrorStatus;
} = {
  403: {
    title: "{{status}} - couldn't load",
    description: 'Oh no! The page you’re looking for is not accessible.',
    image: barrier,
  },
  404: {
    title: '404 - not found',
    description: 'Oh no! The page you’re looking for isn’t here.',
    image: alert,
  },
  500: {
    title: "{{status}} - couldn't load",
    description: 'Well, this is unexpected. An error has occurred.',
    image: barrier,
  },
  generic: {
    title: 'An error occurred',
    description: 'Please reload the page and try again',
    image: barrier,
  },
  chat: {
    title: 'Chat couldn’t load',
    description: 'Oh no! Something went wrong at our end. Come back later',
    image: disappointedFace,
  },
};

interface RequestErrorProps {
  error?: any;
  status?: keyof typeof ERROR_STATUS;
}

const RequestError: React.FC<RequestErrorProps> = ({ error, status }) => {
  const { t } = useErrorTranslation();
  const { t: tc } = useCommonTranslation();
  const history = useHistory();

  let errorStatus = status ?? error?.response?.status;

  if (
    !errorStatus ||
    !Object.keys(ERROR_STATUS).includes(String(errorStatus))
  ) {
    errorStatus = 'generic';
  }

  const err = ERROR_STATUS[errorStatus];

  const hasGoBack = errorStatus !== 'chat';
  const hasTryAgain = errorStatus === 500 || errorStatus === 'chat';

  return (
    <div className="flex flex-col justify-center items-center">
      <img className="w-16" src={err.image} alt="" />
      <p className="py-3 text-sm text-grayscale-secondary">
        {t(err.title, { status })}
      </p>
      <div className="text-lg max-w-xl text-center">
        <p>
          {t(err.description)}
          <p>
            {hasGoBack && (
              <>
                {' '}
                <button
                  className="underline text-focus"
                  onClick={history.goBack}
                >
                  {tc("Let's go back")}
                </button>
              </>
            )}
            {hasTryAgain && (
              <>
                {` ${tc('or')} `}
                <button
                  className="underline text-focus"
                  onClick={() => history.go(0)}
                >
                  {tc('try again')}
                </button>
              </>
            )}
          </p>
        </p>
      </div>
    </div>
  );
};

export default RequestError;
