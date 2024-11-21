import { Quill } from 'react-quill';
import React, { useRef, useState } from 'react';
import Editor from './Editor';
import Col from 'react-bootstrap/Col';

import '../styles/EditorPage.css';
import Button from 'react-bootstrap/esm/Button';

import { axiosReq } from '../api/axiosDefaults';

const Delta = Quill.import('delta');

const EditorPage = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const handleSubmit = async () => {
    const delta = JSON.stringify(quillRef.current.getContents());
    const html = quillRef.current.root.innerHTML;
    try {
      const text = JSON.stringify({ delta, html });
      console.log(text);
      console.log(typeof text);
      const { data } = await axiosReq.post('/posts/', { text });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col className='p-2 col-12 col-md-8 col-lg-6'>
      {/* taken from here: https://github.com/slab/quill/issues/1120#issuecomment-808467758 */}
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          quillRef.current.theme.tooltip.edit();
          quillRef.current.theme.tooltip.show();
          return false;
        }}>
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </div>
      <Button onClick={handleSubmit} className='px-4 mt-2 w-100'>
        Post
      </Button>
    </Col>
  );
};

export default EditorPage;
