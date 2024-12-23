import React, { forwardRef, useEffect, useRef } from 'react';
import { Quill } from 'react-quill';
import PropTypes from 'prop-types';

import { axiosReq } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/NotificationContext';

import 'quill/dist/quill.bubble.css';
import '../styles/Editor.css';

// Editor is an uncontrolled React component
const BaseEditor = forwardRef(({ post, defaultValue }, ref) => {
  const containerRef = useRef(null);

  const raiseError = useRaiseError();

  useEffect(() => {
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

    if (defaultValue) {
      quill.setContents(quill.clipboard.convert(defaultValue));
    }

    ref.current = quill;

    function imageHandler() {
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
        setTimeout(() => {
          quill.setSelection(
            quill.getSelection() ? quill.getSelection()?.index + 10 : 0,
            0
          );
        }, 0);
      };
    }

    return () => {
      ref.current = null;
      container.innerHTML = '';
    };
  }, [ref, post, defaultValue]);

  return <div ref={containerRef}></div>;
});

BaseEditor.displayName = 'BaseEditor';

BaseEditor.propTypes = {
  post: PropTypes.bool,
  defaultValue: PropTypes.string,
  quillRef: PropTypes.shape({
    current: PropTypes.instanceOf(Quill),
  }),
};

/**
 * A React component that wraps the Quill editor and allows for image
 * uploading.
 *
 * @param {boolean} [post=false] - Whether or not to render the post toolbar
 * @param {React.MutableRefObject<Quill>} quillRef - A React ref to the Quill
 *   instance.
 * @param {string} [defaultValue=null] - The default value of the editor.
 * @returns {JSX.Element} - The Editor component.
 */
const Editor = ({ post = false, quillRef, defaultValue = null }) => {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        quillRef.current.theme.tooltip.edit();
        quillRef.current.theme.tooltip.show();
        return false;
      }}>
      {/* taken from here: https://github.com/slab/quill/issues/1120#issuecomment-808467758 */}
      <BaseEditor ref={quillRef} post={post} defaultValue={defaultValue} />
    </div>
  );
};

Editor.displayName = 'Editor';

Editor.propTypes = {
  post: PropTypes.bool,
  quillRef: PropTypes.shape({
    current: PropTypes.instanceOf(Quill),
  }).isRequired,
  defaultValue: PropTypes.string,
};

export default Editor;
