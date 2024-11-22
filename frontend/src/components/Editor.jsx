import React, { forwardRef, useEffect, useRef } from 'react';
import { Quill } from 'react-quill';
import { axiosReq } from '../api/axiosDefaults';
import 'quill/dist/quill.bubble.css';
import '../styles/Editor.css';
import { useRaiseError } from '../contexts/GlobalErrorContext';

// Editor is an uncontrolled React component
const Editor = forwardRef(({ post }, ref) => {
  const containerRef = useRef(null);

  const raiseError = useRaiseError();

  const options = post
    ? [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ]
    : [
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ];

  useEffect(() => {
    // Modified code from https://www.c-sharpcorner.com/article/how-to-add-image-upload-control-in-react-quill-rich-text-editor/
    async function uploadFiles(uploadFileObj, quillObj) {
      try {
        console.log(uploadFileObj);
        const { data } = await axiosReq.post('/upload/', {
          image: uploadFileObj,
        });
        console.log(data);
        const range = quillObj.getSelection();
        quillObj.insertEmbed(range.index, 'image', data.data.secure_url);
      } catch (err) {
        raiseError(err);
      }
    }

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );
    const quill = new Quill(editorContainer, {
      theme: 'bubble',
      modules: {
        toolbar: {
          container: options,
          handlers: { image: imageHandler },
        },
      },
      placeholder: 'Write here! Select text or right click for more options.',
    });

    ref.current = quill;

    function imageHandler() {
      // console.log('image handler called');
      const input = document.createElement('input');

      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        var file = input.files[0];
        var formData = new FormData();

        formData.append('image', file);

        await uploadFiles(file, quill);

        // https://stackoverflow.com/questions/48678236/setting-the-cursor-position-after-setting-a-new-delta-in-quill
        setTimeout(
          () => quill.setSelection(quill.getSelection().index + 10, 0),
          0
        );
      };
    }

    return () => {
      ref.current = null;
      container.innerHTML = '';
    };
  }, [ref, options, raiseError]);

  return <div ref={containerRef}></div>;
});

Editor.displayName = 'Editor';

export default Editor;
