import { useAlarm } from '@/hooks/useAlarm';
import { RootState } from '@/redux/config/configStore';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

interface Props {
  alarmState: boolean;
}

const AlarmModal = ({ alarmState }: Props) => {
  const { alarmData, updateCommentAlarm } = useAlarm();
  const router = useRouter();

  const readAlarm = (id: string, reviewId: string) => {
    updateCommentAlarm(id);
    router.push(`/review/${reviewId}`);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          {alarmState ? (
            <Button variant='bordered'>
              <VscBellDot size={25} className='cursor-pointer' />
            </Button>
          ) : (
            <Button variant='bordered'>
              <VscBell size={25} className='cursor-pointer' />
            </Button>
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions' items={alarmData}>
          {(alarm) => (
            <DropdownItem
              key={alarm.id}
              onClick={() => readAlarm(alarm.id, alarm.review_id)}
            >
              💬 내 리뷰에 댓글이 달렸습니다.
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* <Popover showArrow placement='bottom'>
        <PopoverTrigger>
          {alarmState ? (
            <Button variant='bordered'>
              <VscBellDot size={25} className='cursor-pointer' />
            </Button>
          ) : (
            <Button variant='bordered'>
              <VscBell size={25} className='cursor-pointer' />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className='p-1'>
          <Button size='sm'>모두 읽음</Button>
          <div className='w-[200px] h-auto bg-white p-4 rounded-lg'>야호</div>
        </PopoverContent>
      </Popover> */}
    </>
  );
};

export default AlarmModal;
