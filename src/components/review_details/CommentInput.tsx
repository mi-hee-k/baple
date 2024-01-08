import React from 'react';
import { Input } from '@nextui-org/react';

const CommentInput = () => {
  return (
    <div>
      <p>댓글</p>
      <Input type='text' placeholder='댓글을 입력해 주세요' />
    </div>
  );
};

export default CommentInput;
