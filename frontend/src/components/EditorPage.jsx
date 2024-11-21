import { Quill } from 'react-quill';
import React, { useRef, useState } from 'react';
import Editor from './Editor';

import 'quill/dist/quill.snow.css';
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
      <Button onClick={handleSubmit}>Post</Button>
    </div>
  );
};

export default EditorPage;
