import { insertNewCommentAlarm } from '@/apis/commentAlarm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAlarm = () => {
  const queryClient = useQueryClient();

  const insertCommentAlarmMutation = useMutation({
    mutationFn: insertNewCommentAlarm,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['alarm'] });
    // },
  });

  return {
    insertCommentAlarm: insertCommentAlarmMutation.mutate,
  };
};
