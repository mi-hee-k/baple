// pages/review/write.tsx
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const ReviewWrite = () => {
  const [newReviewText, setNewReviewText] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;
    if (selectedImages) {
      const imagesArray = Array.from(selectedImages);
      setImages(imagesArray);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>
        사진 올리기(최대 5장까지 가능합니다)
      </h1>
      <div className='p-10'>
        <div>
          <input type='file' accept='image/*' onChange={handleImageChange} />
        </div>
      </div>
      <div>
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          placeholder='이용자님의 소중한 경험을 남겨 주세요. 자세히 작성할수록 다른 이용자에게 큰 도움이 됩니다.'
          className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
        />
      </div>
      <div>
        <Button color='primary' variant='light'>
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default ReviewWrite;

//리뷰쓰 이미지 등록할 때 같이 넣기
