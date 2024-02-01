import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { VscBell, VscBellDot } from 'react-icons/vsc';

interface Props {
  alarmState: boolean;
}

const AlarmModal = ({ alarmState }: Props) => {
  console.log(alarmState);
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
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem key='new'>New file</DropdownItem>
          <DropdownItem key='copy'>Copy link</DropdownItem>
          <DropdownItem key='edit'>Edit file</DropdownItem>
          <DropdownItem key='delete' className='text-danger' color='danger'>
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default AlarmModal;
