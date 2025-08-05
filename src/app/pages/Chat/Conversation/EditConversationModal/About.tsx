import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from 'app/components';
import { chatGroupNameSchema } from 'app/form/validation';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';

import { useUpdateThreadMutation, useThreadId } from '../../hooks';

interface AboutProps {
  conversationName: string;
  maxNameLength: number;
}

const About: FC<AboutProps> = ({ conversationName, maxNameLength }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(chatGroupNameSchema(maxNameLength)),
    defaultValues: {
      name: conversationName,
    },
  });
  const { t } = useChatTranslation();
  const threadId = useThreadId();
  const { mutate, isLoading } = useUpdateThreadMutation(threadId);
  const groupName = watch('name');

  return (
    <div className="pt-4 flex flex-col flex-grow h-full">
      <form
        className="h-full flex flex-col"
        onSubmit={handleSubmit(({ name }) => {
          if (!isLoading)
            mutate(
              { topic: name },
              {
                onSuccess: () => {
                  toast.success(t('Group named changed.'));
                },
                onError: () => {
                  toast.error(t('Something went wrong, please try again.'));
                },
              }
            );
        })}
      >
        <p className="text-base mb-1">{t('Group Name')}</p>
        <Input
          error={errors.name?.message}
          register={register}
          name="name"
          placeholder={`${t('Group Name')}`}
        />
        <div className="row flex-1">
          <div className="col-5 offset-7 mt-auto">
            <Button
              disabled={!groupName.length || isLoading}
              icon={ArrowIcon}
              variant="primary"
              type="submit"
            >
              {t('Save changes')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
