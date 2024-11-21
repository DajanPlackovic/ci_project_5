import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Quill } from 'react-quill';
import { axiosReq } from '../api/axiosDefaults';
import 'quill/dist/quill.bubble.css';
import '../styles/Editor.css';

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

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
          console.log(err); // better error handling
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
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['link', 'image'],
            ],
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

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
