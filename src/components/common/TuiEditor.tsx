import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onChange: any;
}

const TuiEditor = ({ content = '', editorRef, onChange }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol'],
    ['image'],
  ];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '} // 글 수정 시 사용
          initialEditType='wysiwyg' // wysiwyg & markdown
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
          hideModeSwitch={true}
          height='300px'
          theme={'dark'} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          onChange={onChange}
          autofocus={false} // 중요! 이거 없으면 다른 input 사용 불가
        />
      )}
    </>
  );
};

export default TuiEditor;
