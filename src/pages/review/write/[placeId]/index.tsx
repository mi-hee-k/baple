<<<<<<< HEAD
import React, { useState, ChangeEvent, useRef, useMemo } from 'react';
import { Button, Spacer } from '@nextui-org/react';
=======
import React, { useState, ChangeEvent } from 'react';
import { Button, Spacer, Textarea } from '@nextui-org/react';
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { insertNewReview } from '@/apis/reviews';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { supabase } from '@/libs/supabase';
import { toastSuccess, toastWarn } from '@/libs/toastifyAlert';
import { getPlaceInfo, updatePlaceImage } from '@/apis/places';
<<<<<<< HEAD
import TuiEditor from '@/components/common/TuiEditor';
import dynamic from 'next/dynamic';

const ReviewWritePage = () => {
  const [editorContent, setEditorContent] = useState('');
=======

const ReviewWritePage = () => {
  const [reviewText, setReviewText] = useState('');
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
  const [selectedImages, setSelectedImages] = useState<
    { file: File; imageUrl: string }[]
  >([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
<<<<<<< HEAD
  const editorRef = useRef<any>(null); // TuiEditor의 ref를 설정
=======
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
  const { userId } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { placeId } = router.query;

  const { data: placeInfo } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId as string),
    // staleTime: Infinity,
  });

  console.log('placeInfo', placeInfo);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedImageArray = [...selectedImages];
    const selectedFileArray = [...selectedFiles];
    if (files) {
      console.log('files', files);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 1024 * 1024) {
          return toastWarn('최대 1MB까지 업로드 가능합니다.');
        }
        const imageUrl = URL.createObjectURL(file);
        console.log('imageUrl', imageUrl);
        if (selectedImageArray.length < 5) {
          selectedImageArray.push({ file, imageUrl });
          selectedFileArray.push(file);
        } else {
          toastWarn('이미지는 최대 5장까지만 업로드 가능합니다.');
        }
      }
      const editorContentValue = editorRef.current?.getInstance().getMarkdown();
      setEditorContent(editorContentValue);
      setSelectedImages(selectedImageArray);
      setSelectedFiles(selectedFileArray);
    }
  };
<<<<<<< HEAD
  console.log('editorContent', editorContent);
=======

>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
  console.log('selectedImages', selectedImages);
  console.log('selectedFiles', selectedFiles);
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: insertNewReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'reviews',
        placeId,
      ] as InvalidateQueryFilters);
    },
  });

  const { mutate: mutateToUpdate } = useMutation({
    mutationFn: updatePlaceImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'placeInfo',
        placeId,
      ] as InvalidateQueryFilters);
    },
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const onSubmitReview = async () => {
<<<<<<< HEAD
    const editorIns = editorRef?.current?.getInstance();
    const editValue = editorIns?.getMarkdown();
    const isWhitespaceOnly = /^\s*$/;
    console.log(editValue);
    if (!editValue) {
      toastWarn('내용을 입력하고 등록해 주세요');
      return;
    } else if (isWhitespaceOnly.test(editValue)) {
      toastWarn('공백 이외의 내용을 입력해 주세요');
      return;
    }

=======
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
    const publicUrlList: string[] = [];
    if (selectedFiles) {
      for (const file of selectedFiles) {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('review_images')
          .upload(`${Date.now()}`, file);
        if (fileError) {
          console.error('이미지 업로드 에러', fileError.message);
          return;
        }
        const { data: imageData } = supabase.storage
          .from('review_images')
          .getPublicUrl(fileData.path);
        console.log('imageData', imageData);
        publicUrlList.push(imageData.publicUrl);
      }
      // place의 image_url이 null 이면, 리뷰 이미지의 첫번째 사진으로 place image_url 저장
      if (placeInfo.image_url === null) {
        mutateToUpdate({ id: placeId as string, imageUrl: publicUrlList[0] });
      }
    }

<<<<<<< HEAD
=======
    const isReviewEmpty = /^\s*$/;
    if (!reviewText) {
      toastWarn('후기는 필수 요소입니다. 입력 후 등록해 주세요.');
      return;
    } else if (isReviewEmpty.test(reviewText)) {
      toastWarn('공백 이외 내용을 입력해 주세요.');
      return;
    }
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
    const args = {
      content: reviewText,
      placeId: placeId as string,
      userId,
      publicUrlList,
    };
    mutateToAdd(args);
    toastSuccess('리뷰가 등록되었습니다.');
    // setReviewText('');
    router.replace(`/place/${placeId}`);
  };

  const memoizedEditor = useMemo(
    () => <NoSsrEditor content={editorContent} editorRef={editorRef} />,
    [editorContent, NoSsrEditor],
  );

  return (
    <div className='p-10 max-w-screen-md mx-auto shadow-lg '>
      <div className='mb-10 text-3xl font-bold '>{placeInfo.place_name}</div>
      <div>
        <div className='flex items-center mb-8'>
          <h2 className='text-2xl mr-1 mb-2'>후기</h2>
          <span className='text-red-500 text-3xl font-bold'>*</span>
        </div>
      </div>
      <div className='mb-20'>
        <Textarea
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          placeholder='다녀오신 장소에서 즐거운 시간을 보내셨나요? 
          방문 경험을 사용자들과 공유해 주세요!
          리뷰를 보는 사용자를 위해 욕설, 비방, 명예훼손성 표현은 주의해 주세요.'
          className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
        />
      </div>
      <h2 className='text-xl'>사진 올리기(최대 5장까지 첨부 가능합니다)</h2>
      <div className='mb-20 flex gap-6 mt-7'>
        <label className='relative cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='hidden'
          />
          <div className='w-24 h-24 bg-gray-100 flex items-center justify-center rounded'>
            <span className='text-3xl'>+</span>
          </div>
        </label>
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className='image-preview relative inline-block w-24 h-24'
          >
            <Image
              src={image.imageUrl}
              alt={`Selected Image ${index}`}
              fill
              style={{ objectFit: 'cover' }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className='delete-button absolute font-extrabold right-1 text-gray-200 hover:text-red-500 cursor-pointer'
            >
              X
            </button>
          </div>
        ))}
      </div>
<<<<<<< HEAD
      <div className='flex items-center mb-8'>
        <h2 className='text-xl font-bold mr-1'>후기</h2>
        <span className='text-red-500 text-2xl font-bold'>*</span>
      </div>
      <div className='mb-7'>{memoizedEditor}</div>
=======
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
      <div className='flex itmes-center justify-center'>
        <Spacer x={2} />
        <Button
          color='primary'
          variant='solid'
          className='px-8'
          onClick={onSubmitReview}
<<<<<<< HEAD
          // isDisabled={false}
=======
          isDisabled={!reviewText}
>>>>>>> ac395689c94de859eadad0f121bac8e355d5a1cb
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default ReviewWritePage;
