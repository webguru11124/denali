import { cx, css } from '@emotion/css';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface PersonCardProps {
  name: string;
  totalActivities: number;
  completed: number;
  srcSet: string;
  id: number;
}

const PersonCard = ({
  name,
  totalActivities,
  completed,
  srcSet,
  id,
}: PersonCardProps) => {
  const { t } = useMissionsTranslation();
  const completedPercentage = Math.round((completed / totalActivities) * 100);
  return (
    <div className="shadow-atobi rounded-lg p-3 pb-5">
      <Link to={routes.user.create(id)} className="flex items-center">
        <div className="mr-2">
          <img srcSet={srcSet} alt={name} className="w-6 h-6 rounded" />
        </div>
        <p className="text-grayscale-primary">
          <span className="line-clamp-1">{name}</span>
        </p>
      </Link>
      <p className="text-grayscale-secondary text-sm mt-1">
        {t('{{completedCount}} / {{totalCount}} activities completed', {
          completedCount: completed,
          totalCount: totalActivities,
        })}
      </p>
      <p className="text-grayscale-secondary text-sm mt-6">
        {completedPercentage}%
      </p>
      <div className="relative rounded-full h-4 w-full bg-gray-light">
        <div
          className={cx(
            'h-full absolute z-10 left-0 bg-success rounded-full',
            css`
              width: ${completedPercentage}%;
            `
          )}
        />
      </div>
    </div>
  );
};

export default PersonCard;
