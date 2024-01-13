import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FaShareAlt } from 'react-icons/fa';

const ReviewLikes = () => {
  return (
    <div className='flex flex-col justify-center items-center w-[50px] h-[100px] p-3 rounded-full bg-slate-200 fixed top-[100px] left-[50px] z-10'>
      <FcLikePlaceholder size={30} className='mb-[10px]' />
      {/* <FcLike size={30} /> */}
      <FaShareAlt size={30} />
    </div>
  );
};

export default ReviewLikes;
