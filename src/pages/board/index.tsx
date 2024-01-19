import MainWrapper from '@/components/layout/MainWrapper';
import { Button, Divider } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const rows = [
  {
    key: '1',
    category: '신규',
    title: '화장실 공사중이에요',
    content: '홍길동',
    place: '관악구민',
    created_at: '24-01-19',
  },
  {
    key: '2',
    category: '불편사항',
    title: '경사가 있어요',
    content: '임꺽정',
    place: '시청',
    created_at: '24-01-19',
  },
  {
    key: '3',
    category: '신규',
    title: '여름엔 문 닫아요',
    content: '빨강머리 앤',
    place: '아이스링크장',
    created_at: '24-01-19',
  },
  {
    key: '4',
    category: '신규',
    title: '휠체어 대여 당분간 안된대요',
    content: '피터팬',
    place: '구청',
    created_at: '24-01-19',
  },
  {
    key: '5',
    category: '불편사항',
    title: '화장실 공사중이에요',
    content: '홍길동',
    place: '관악구민',
    created_at: '24-01-19',
  },
  {
    key: '6',
    category: '신규',
    title: '경사가 있어요22',
    content: '임꺽정',
    place: '시청',
    created_at: '24-01-19',
  },
  {
    key: '7',
    category: '불편사항',
    title: '여름엔 문 닫아요',
    content: '빨강머리 앤',
    place: '아이스링크장',
    created_at: '24-01-19',
  },
  {
    key: '8',
    category: '신규',
    title: '휠체어 대여 당분간 안된대요',
    content: '피터팬',
    place: '구청',
    created_at: '24-01-19',
  },
];

const columns = [
  {
    key: 'category',
    label: '카테고리',
  },
  {
    key: 'title',
    label: '제목',
  },
  {
    key: 'content',
    label: '작성자',
  },
  {
    key: 'place',
    label: '장소',
  },
  {
    key: 'created_at',
    label: '작성일',
  },
];

const BoardPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <MainWrapper>
      <header className='flex mt-[50px] mb-[30px] justify-between'>
        <h2 className='text-3xl font-bold'>게시판</h2>
        <Button
          className='bg-primary px-8 py-2 rounded-full text-black'
          onClick={() => router.push('/board/write')}
        >
          글쓰기
        </Button>
      </header>
      <Divider className='bg-primary h-0.5 mb-[30px]' />

      <Table
        aria-label='Example table with dynamic content'
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='default'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className='text-center'>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow
              key={item.key}
              className='cursor-pointer hover:scale-[1.003] text-center'
              onClick={() => router.push('board/1234')}
            >
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </MainWrapper>
  );
};

export default BoardPage;
