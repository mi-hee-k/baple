// pages/review/write.tsx
import React, { useState, ChangeEvent } from 'react';
import { Button, Spacer, Textarea, Input } from '@nextui-org/react';

const ReviewWrite = () => {
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files);
      setImages(imagesArray);
    }
  };
  console.log(reviewText);
  return (
    <div className='p-10 max-w-screen-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        사진 올리기(최대 5장까지 가능합니다)
      </h1>
      <div className='mb-20'>
        <label htmlFor='file-input' className='relative cursor-pointer'>
          <Input
            id='file-input'
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='hidden'
          />
          <div className='w-24 h-24 bg-gray-200 flex items-center justify-center rounded'>
            <span className='text-3x1'>+</span>
          </div>
        </label>
      </div>
      <div>
        <h2 className='text-xl font-bold mb-6'>후기</h2>
      </div>
      <div className='mb-7'>
        <Textarea
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          placeholder='이용자님의 소중한 경험을 남겨 주세요. 자세히 작성할수록 다른 이용자에게 큰 도움이 됩니다.'
          className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
        />
      </div>
      <div className='flex itmes-center justify-center'>
        <Spacer x={2} />
        <Button color='primary' variant='solid' className='px-8'>
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default ReviewWrite;
