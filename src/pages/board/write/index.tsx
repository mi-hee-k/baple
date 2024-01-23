import Editor from '@/components/board/Editor';
import MainWrapper from '@/components/layout/MainWrapper';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

const BoardWritePage = () => {
  const router = useRouter();
  const isEdit = !!router.query.boardId;

  return (
    <MainWrapper>
      <header className='flex mt-[50px] mb-[30px] justify-between'>
        <h2 className='text-3xl font-bold'>{isEdit ? '글 수정' : '글쓰기'}</h2>
      </header>
      <Divider className='bg-primary h-0.5 mb-[30px]' />
      <Editor isEdit={isEdit} />
    </MainWrapper>
  );
};

export default BoardWritePage;
