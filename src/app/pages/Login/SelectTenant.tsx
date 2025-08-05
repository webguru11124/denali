import styled from '@emotion/styled';
import { SelectCard, IconButton } from 'app/components';
import { useSelector, useDispatch } from 'app/hooks';
import { useLoginTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { selectors, actions } from 'app/store/auth';
import { FC, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowRightIcon from 'remixicon-react/ArrowLeftSLineIcon';

import LoginContext from './LoginContext';

const Container = styled.div`
  max-height: 400px;
`;

const SelectTenant: FC = () => {
  const { onNext, resetSteps } = useContext(LoginContext);

  if (!onNext) throw new Error('Component does not have context');
  const { t } = useLoginTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const tenants = useSelector(selectors.getTenants);

  useEffect(() => {
    if (tenants?.length === 1) {
      dispatch(actions.tenantSelected(tenants[0]));
      onNext();
    }
  }, [dispatch, onNext, tenants]);

  return (
    <Container className="overflow-y-auto">
      <div className="absolute top-0 left-0 mt-6 ml-6">
        <div className="flex items-center">
          <IconButton
            Icon={ArrowRightIcon}
            onClick={() => {
              history.replace(routes.login.create());
              resetSteps();
            }}
          />
          <p className="ml-3 text-lg font-bold">{t('Pick up a company 👇')}</p>
        </div>
      </div>
      {tenants?.map(({ logo, alias, url }) => (
        <SelectCard
          key={url}
          onSelect={() => {
            // Set tenant sentry tag
            dispatch(actions.tenantSelected({ logo, alias, url }));
            onNext();
          }}
          imageContent={
            logo ? (
              <img
                src={logo}
                className="h-full w-full object-cover"
                alt={alias}
              />
            ) : undefined
          }
          label={alias}
        />
      ))}
    </Container>
  );
};

export default SelectTenant;
