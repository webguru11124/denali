import { resources, queryKeys, types } from 'app/api/visualGuides';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { User } from './types';

const useGuideFeedbackQuery = (id: number) => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery(queryKeys.getVisualGuideFeedback(id), () =>
    resources.getVisualGuideFeedback(id)
  );
  const data = responseData?.data;

  const users: Array<User> | undefined = useMemo(() => {
    const files = data?.files;
    if (!files) return undefined;

    const duplicateUserIds = [] as Array<number>;

    const allUsers = Object.values(files).map(
      ({ avatars, userId, userName }) => ({
        avatars,
        id: userId,
        name: userName,
      })
    );

    return allUsers.filter(({ id: userId }) => {
      const isDuplicate = duplicateUserIds.includes(userId);
      if (isDuplicate) return false;

      duplicateUserIds.push(userId);

      return true;
    });
  }, [data]);

  const filesByUsers = useMemo(() => {
    const files = data?.files;
    if (!files) return undefined;
    return Object.values(files).reduce((acc, file) => {
      const key = file.userId.toString();
      return {
        ...acc,
        [key]: [file, ...(acc?.[key] || [])],
      };
    }, {} as { [key: string]: Array<types.UserFile> });
  }, [data]);

  return {
    users,
    filesByUsers,
    files: Object.values(data?.files || {}),
    isLoading,
    isError,
  };
};

export default useGuideFeedbackQuery;
