import { deleteComment } from '@/apis/comments';
import { toastSuccess } from '@/libs/toastifyAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface deleteProps {
  currentUserId: string;
  placeId: string;
}

export const useDeleteCommentMutation = ({
  currentUserId,
  placeId,
}: deleteProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toastSuccess('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({
        queryKey: ['likes', currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', placeId],
      });
    },
  });

  return mutation;
};
