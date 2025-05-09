import { Quill } from 'react-quill';

// Quill을 커스터마이징을 하기 위한 설정값. <- 원하는 기능을 선별적으로 주입 가능함.
const toolOptions = [
    [{ 'header': [1, 2, false] }],
    [{ 'color': [] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ];
  
  // Quill을 위한 설정정보
  const modules = {
    toolbar: {
      container : toolOptions
    },
  
    ImageResize: {
      parchment: Quill.import('parchment')
    }
  };
  
  const formats = [
    'header','color',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export {toolOptions,modules,formats};