// // AddBlog.jsx
// import React, { Component } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CustomUploadAdapter from './upload_adapter'; // Let's show the path to the Adapter code we prepared.
// import { useState } from 'react';

// const App = () => {

//   const [blogData, setBlogData] = useState({})
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleCkeditorState = (language, _event, editor) => {
//     const data = editor.getData();
//     setBlogData(prevState => ({
//       ...prevState,
//       [`${language}_content`]: data
//     }));
//   };

//   const handleContentBeforeLoad = (content) => {
//     const backendBaseURL = 'http://127.0.0.1:8000';
//     return content.replace(/src="\/media\/(.*?)"/g, `src="${backendBaseURL}/media/$1"`);
//   };

//   const onEditorInit = (editor) => {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       return new CustomUploadAdapter(loader);
//     };
//   };


//   return (
//     <div className='addblog'>
//       {/* <h2>{id ? 'Blog Update' : 'Add new blog'}</h2> */}
//       {/* <form onSubmit={handleSubmit}> */}
//         <div>
//           <label htmlFor="en_content">En Content:</label> 
//           <CKEditor
//             editor={ClassicEditor}
//             data={handleContentBeforeLoad(blogData.en_content)}
//             onChange={(event, editor) => handleCkeditorState('en', event, editor)}
//             onReady={onEditorInit}
//             config={{
//               extraPlugins: [CustomUploadAdapter],
//               ckfinder: {
//                 uploadUrl: 'http://127.0.0.1:8000/ckeditor/upload/'
//               }
//             }}
//           />
//         </div>

//         {/* <div className="buttons">
//           <button id='dashboard__submit__btn' type="submit">{id ? 'Update' : 'Add'}</button>
//           {id && (
//             <button id='dashboard__delete__btn' type="button" onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
//           )}
//         </div> */}
//       {/* </form> */}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';  
import { CKEditor } from '@ckeditor/ckeditor5-react';  
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';  
import CustomUploadAdapter from './upload_adapter';  

const App = () => {  
  const [blogData, setBlogData] = useState({  
    en_content: '', // Initialize with an empty string  
  });  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setBlogData((prevState) => ({  
      ...prevState,  
      [name]: value,  
    }));  
  };  

  const handleCkeditorState = (language, _event, editor) => {  
    const data = editor.getData();  
    setBlogData((prevState) => ({  
      ...prevState,  
      [`${language}_content`]: data,  
    }));  
  };  

  const handleContentBeforeLoad = (content) => {  
    if (!content) {  
      return ""; 
    }  
    
    console.log(content)
    const backendBaseURL = 'http://127.0.0.1:8000';  
    return content.replace(/src="\/media\/(.*?)"/g, `src="${backendBaseURL}/app/media/$1"`);  
  };  

  const onEditorInit = (editor) => {  
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {  
      return new CustomUploadAdapter(loader);  
    };  
  };  

  return (  
    <div className="addblog">  
      <div>   
        <CKEditor  
          editor={ClassicEditor}  
          data={handleContentBeforeLoad(blogData.en_content)}  
          onChange={(event, editor) => handleCkeditorState('en', event, editor)}  
          onReady={onEditorInit}  
          config={{  
            extraPlugins: [CustomUploadAdapter],  
            ckfinder: {  
              uploadUrl: 'http://127.0.0.1:8000/app/upload/',  
            },  
          }}  
        />  
      </div>  
    </div>  
  );  
}  

export default App;