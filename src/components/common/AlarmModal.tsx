import { useAlarm } from '@/hooks/useAlarm';
import { useCurrentTheme } from '@/hooks/useCurrentTheme';
import { RootState } from '@/redux/config/configStore';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

interface Props {
  alarmState: boolean | undefined;
}

const AlarmModal = ({ alarmState }: Props) => {
  const { alarmData, updateAlarm, updateAllAlarm } = useAlarm();
  const router = useRouter();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { baple } = useCurrentTheme();

  // 읽음 처리
  const readAlarm = (AlarmId: string, reviewId: string) => {
    updateAlarm(AlarmId);
    router.push(`/review/${reviewId}`);
  };

  // 모두 읽음 처리
  const readAllAlarm = (userId: string) => {
    updateAllAlarm(userId);
  };

  return (
    <>
      <Popover placement='bottom'>
        <PopoverTrigger>
          <Button variant='light'>
            {alarmState ? (
              <VscBellDot size={25} className='cursor-pointer' />
            ) : (
              <VscBell size={25} className='cursor-pointer' />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='py-4 flex gap-2'>
          <Button
            size='sm'
            className={`rounded-full bg-primary ${
              baple ? 'text-white' : 'text-black'
            }`}
            isDisabled={alarmData?.length === 0 ? true : false}
            onClick={() => readAllAlarm(userId)}
          >
            모두 읽음
          </Button>
          {alarmData?.map((item) => (
            <div
              key={item.id}
              className={`w-[200px] sm:w-[220px] h-auto ${
                baple ? 'bg-white' : 'bg-black'
              } p-2 text-xs sm:text-sm rounded-lg cursor-pointer hover:bg-slate-200 transition-background`}
              onClick={() => readAlarm(item.id, item.review_id)}
            >
              {item.type === 'comment'
                ? '💬 새로운 댓글이 있습니다.'
                : '❤ 새로운 좋아요가 있습니다.'}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AlarmModal;
