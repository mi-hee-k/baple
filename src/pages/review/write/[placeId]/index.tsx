import React, { useState, ChangeEvent, useRef, useMemo } from 'react';
import { Button, Spacer } from '@nextui-org/react';
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
import { getPlaceInfo } from '@/apis/places';
import dynamic from 'next/dynamic';

const ReviewWritePage = () => {
  const [editorContent, setEditorContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<
    { file: File; imageUrl: string }[]
  >([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const editorRef = useRef<any>(null); // TuiEditor의 ref를 설정
  const { userId } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { placeId } = router.query;

  const { data: placeInfo } = useQuery({
    queryKey: ['placeInfo', placeId],
    queryFn: () => getPlaceInfo(placeId as string),
    // staleTime: Infinity,
  });

  const NoSsrEditor = dynamic(
    () => import('../../../../components/common/TuiEditor'),
    {
      ssr: false,
    },
  );

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
  console.log('selectedImages', selectedImages);
  console.log('selectedFiles', selectedFiles);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: insertNewReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'reviews',
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
    }
    if (placeInfo.image_url === null) {
    }
    const args = {
      content: editValue,
      placeId: placeId as string,
      userId,
      publicUrlList,
    };

    mutate(args);

    toastSuccess('등록되었습니다.');
    router.replace(`/place/${placeId}`);
  };

  const memoizedEditor = useMemo(
    () => <NoSsrEditor content={editorContent} editorRef={editorRef} />,
    [editorContent, NoSsrEditor],
  );

  return (
    <div>
      <div>
        <div className='p-10 max-w-screen-md mx-auto'>
          <div>{placeInfo.place_name}</div>
          <h2 className='text-2xl font-bold mb-4'>
            사진 올리기(최대 5장까지 가능합니다)
          </h2>
          <div className='mb-20 flex gap-6 mt-7'>
            <label className='relative cursor-pointer'>
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
                className='hidden'
              />
              <div className='w-24 h-24 bg-gray-200 flex items-center justify-center rounded'>
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
                  className='delete-button absolute font-bold -top-5 right-0 text-red-400 hover:text-red-800 cursor-pointer'
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className='flex items-center mb-8'>
            <h2 className='text-xl font-bold mr-1'>후기</h2>
            <span className='text-red-500 text-2xl font-bold'>*</span>
          </div>
          <div className='mb-7'>{memoizedEditor}</div>
          <div className='flex itmes-center justify-center'>
            <Spacer x={2} />
            <Button
              color='primary'
              variant='solid'
              className='px-8'
              onClick={onSubmitReview}
              // isDisabled={false}
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWritePage;
