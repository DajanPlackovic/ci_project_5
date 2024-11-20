import { Quill } from 'react-quill';
import React, { useRef, useState } from 'react';
import Editor from './Editor';

import 'quill/dist/quill.snow.css';
import '../styles/EditorPage.css';
import Button from 'react-bootstrap/esm/Button';

const Delta = Quill.import('delta');

const EditorPage = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      <Button
        onClick={() => {
          const content =
            quillRef.current?.container?.querySelector('.ql-editor')?.innerHTML;
          console.log(content);
        }}>
        Print Content
      </Button>
      <div class='controls'>
        <label>
          Read Only:{' '}
          <input
            type='checkbox'
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className='controls-right'
          type='button'
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}>
          Get Content Length
        </button>
      </div>
      <div className='state'>
        <div className='state-title'>Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className='state'>
        <div className='state-title'>Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </div>
    </div>
  );
};

export default EditorPage;
