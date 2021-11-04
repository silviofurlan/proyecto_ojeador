// import { useState } from 'react';

// const Upload = (props) => {
//   const [file, setFile] = useState();
//   const [serverImg, setServerImg] = useState('');
//   console.log('file:', file);
//   const onFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };
// ;
//   return (
//     <div className='App'>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Select file to upload</label>
//           <input type='file' onChange={onFileChange} />
//         </div>
//         <button type='submit'>Upload</button>
//       </form>
//       {serverImg && (
//         <img src={`http://localhost:3050/${serverImg}`} alt='server avatar' />
//       )}
//     </div>
//   );
// };

// export default Upload;
