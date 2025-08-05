import { useAudiencesTranslation } from 'app/internationalization/hooks';
import audienceEmpty from 'assets/icons/audience-empty.svg';

const EmptyState = ({ onClick }: { onClick: VoidFunction }) => {
  const { t } = useAudiencesTranslation();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <img src={audienceEmpty} alt="" />
        <span className="text-2xl font-bold text-grayscale-primary">
          {t('Introducing Audiences.')}
        </span>
        <span className="text-grayscale-secondary text-center mt-4">
          {t('Share content & invite your teammates to collaborate.')}
          <br /> {t('Start by creating one now.')}
        </span>
        <button
          type="button"
          className="ml-4 w-56 h-12 bg-focus text-white rounded-xl mt-5"
          onClick={onClick}
        >
          {t('Create Audience')}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
