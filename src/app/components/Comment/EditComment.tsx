import { zodResolver } from '@hookform/resolvers/zod';
import { newsArticleCommentSchema } from 'app/form/validation';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';

import Button from '../Button';
import Error from '../Error';
import TextArea from '../TextArea';

interface EditCommentProps {
  onCancel: () => void;
  defaultValue: string;
  onEdit: (description: string) => void;
}

const EditComment: React.FC<EditCommentProps> = ({
  onCancel,
  defaultValue,
  onEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsArticleCommentSchema),
    defaultValues: {
      comment: defaultValue,
    },
  });
  const { t } = useComponentsTranslation();
  const onSubmit = handleSubmit(({ comment }) => {
    onEdit(comment);
    onCancel();
  });
  return (
    <form onSubmit={onSubmit} className="w-full pb-2 pr-2">
      <TextArea
        className="text-grayscale-primary bg-white border border-gray-light"
        name="comment"
        register={register}
      />
      {errors?.comment?.message && <Error message={errors.comment.message} />}
      <div className="flex justify-end items-center my-2">
        <div className="mr-2">
          <Button
            type="button"
            variant="secondary"
            className="rounded-xl px-5"
            onClick={onCancel}
          >
            <span>{t('Cancel')}</span>
          </Button>
        </div>
        <div>
          <Button type="submit" variant="primary" className="rounded-xl">
            <span className="flex pl-3 pr-2 items-center">
              {t('Save changes')}
              <ArrowIcon className="bg-primary-hover rounded ml-2" />
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditComment;
