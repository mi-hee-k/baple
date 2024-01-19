import MainWrapper from '@/components/layout/MainWrapper';
import {
  Button,
  Divider,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

const categoryList = [
  { label: '신규장소', value: 'NewPlace' },
  { label: '불편사항', value: 'complaint' },
];

const BoardWritePage = () => {
  const router = useRouter();
  return (
    <MainWrapper>
      <header className='flex mt-[50px] mb-[30px] justify-between'>
        <h2 className='text-3xl font-bold'>글쓰기</h2>
      </header>
      <Divider className='bg-primary h-0.5 mb-[30px]' />

      <section className='flex justify-center'>
        <form className='w-[70%] p-4 shadow-md '>
          <Select
            name='category'
            id='category'
            className='mb-[10px]'
            placeholder='카테고리 선택'
          >
            {categoryList.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            id='title'
            type='text'
            label='제목'
            variant='bordered'
            className='mb-[10px]'
          />
          <Input
            type='text'
            variant='bordered'
            label='장소'
            className='mb-[10px]'
          />
          <Textarea
            type='text'
            variant='bordered'
            minRows={10}
            label='내용'
            className='mb-[30px]'
          />

          <div className='text-right'>
            <Button className='mr-[10px]' onClick={() => router.back()}>
              취소
            </Button>
            <Button className='bg-primary'>등록</Button>
          </div>
        </form>
      </section>
    </MainWrapper>
  );
};

export default BoardWritePage;
