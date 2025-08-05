import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from 'app/components';
import { chatGroupNameSchema } from 'app/form/validation';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';

interface DefaultValue {
  name: string;
}

interface EnterNameStepProps {
  onSubmit: (values: DefaultValue) => void;
  maxNameLength: number;
}

const DEFAULT_VALUES: DefaultValue = {
  name: '',
};

const EnterNameStep: FC<EnterNameStepProps> = ({ onSubmit, maxNameLength }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(chatGroupNameSchema(maxNameLength)),
  });
  const { t } = useChatTranslation();
  const [nameValue] = watch(['name']);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>{t('Group Name')}</div>
      <Input
        register={register}
        name="name"
        placeholder={`${t('Group Name')}`}
        className="mt-1"
        value={nameValue}
        error={errors?.name?.message}
      />
      <div className="row mt-6">
        <div className="col-5 offset-7">
          <Button
            variant="primary"
            className="rounded-lg px-2"
            disabled={!nameValue}
            type="submit"
          >
            <span className="flex w-full items-center justify-center">
              <span className="ml-6">{t('Continue')}</span>
              <span className="relative w-8 h-8 ml-auto">
                <ArrowIcon className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <span className="absolute top-0 left-0 w-8 h-8 bg-white rounded opacity-25" />
              </span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EnterNameStep;
