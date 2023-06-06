import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Gallery, TickSquare } from 'iconsax-react';
import {
  MediaTaskBlockTypeEnum,
  SimpleTaskBlockTypeEnum,
} from 'submodules/common-ui/generated/api/gcs';

import DropdownContainer from '../DropdownContainer';

import ActionBlockOption from './ActionBlockOption';

const ActionsDropdown = () => {
  const { t } = useArticlesTranslation();

  return (
    <DropdownContainer>
      <span className="flex text-lg text-grayscale-primary">
        {t('Actions')}
      </span>
      <ActionBlockOption
        text="Task"
        Icon={TickSquare}
        type={SimpleTaskBlockTypeEnum.SimpleTask}
      />
      <ActionBlockOption
        text="Media Task"
        Icon={Gallery}
        type={MediaTaskBlockTypeEnum.MediaTask}
      />
    </DropdownContainer>
  );
};
export default ActionsDropdown;
