import { getPost, insertNewPost, updatePost } from '@/apis/boards';
import { toastSuccess, toastWarn } from '@/libs/toastifyAlert';
import { RootState } from '@/redux/config/configStore';
import { Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const categoryList = ['신규장소', '불편사항'];

interface Props {
  isEdit: boolean;
}

const Editor = ({ isEdit }: Props) => {
  const userInfo = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const boardId: string = router.query.boardId as string;
  const [inputs, setInputs] = useState({
    title: '',
    category: '',
    content: '',
    place_name: '',
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ['posts', boardId],
    queryFn: () => getPost(boardId),
    enabled: !!boardId,
  });

  const queryClient = useQueryClient();
  const addPostMutate = useMutation({
    mutationFn: insertNewPost,
    onSuccess: () => {
      router.push('/board');
      toastSuccess('등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePostMutate = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      router.push('/board');
      toastSuccess('수정되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const inputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      title: inputs.title,
      category: inputs.category,
      content: inputs.content,
      placeName: inputs.place_name,
      userId: userInfo.userId,
    };
    addPostMutate.mutate(formData);
  };

  const editPost = () => {
    if (
      inputs.title.trim() === '' ||
      inputs.content.trim() === '' ||
      inputs.place_name.trim() === '' ||
      inputs.category === undefined
    ) {
      toastWarn('모든 정보를 입력해주세요');
      return;
    }
    const editValue = {
      title: inputs.title,
      category: inputs.category,
      content: inputs.content,
      placeName: inputs.place_name,
      userId: userInfo.userId,
    };
    Swal.fire({
      icon: 'success',
      title: '정말 수정하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '수정',
      cancelButtonText: '취소',
      confirmButtonColor: '#FFD029',
    }).then((result) => {
      if (result.isConfirmed) {
        updatePostMutate.mutate({ boardId, editValue });
      }
    });
  };

  useEffect(() => {
    if (isEdit && post) {
      setInputs({
        title: post.title || '',
        category: post.category || '',
        content: post.content || '',
        place_name: post.place_name || '',
      });
    }
  }, [isEdit, post]);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <section className='flex justify-center'>
      <form onSubmit={createPost} className='w-[70%] p-4 shadow-md '>
        <Input
          type='text'
          label='제목'
          variant='bordered'
          aria-label='제목'
          className='mb-[10px]'
          name='title'
          value={inputs.title}
          onChange={inputChange}
        />
        <div className='flex gap-2'>
          <select
            id='category'
            className='mb-[10px] w-[40%] border-2 p-2 rounded-md border-[##ffe7eb] text-sm text-[#71717a]'
            aria-label='카테고리 선택'
            name='category'
            value={inputs.category}
            onChange={inputChange}
          >
            {categoryList.map((category) => (
              <option
                key={category}
                value={category}
                defaultValue={isEdit ? post.category : undefined}
                className='p-2 h-2'
              >
                {category}
              </option>
            ))}
          </select>
          <Input
            type='text'
            variant='bordered'
            label='장소'
            aria-label='장소'
            name='place_name'
            value={inputs.place_name}
            className='mb-[10px]'
            onChange={inputChange}
          />
        </div>
        <Textarea
          type='text'
          variant='bordered'
          minRows={10}
          label='내용'
          aria-label='내용'
          name='content'
          value={inputs.content}
          className='mb-[30px]'
          onChange={inputChange}
        />

        <div className='text-right'>
          <Button className='mr-[10px]' onClick={() => router.back()}>
            취소
          </Button>
          {isEdit ? (
            <Button type='button' className='bg-primary' onClick={editPost}>
              수정
            </Button>
          ) : (
            <Button type='submit' className='bg-primary'>
              등록
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Editor;
