// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router-dom';

// const CodeEditor = () => {

//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');
//   const socketRef = useRef(null);
//   const token = localStorage.getItem('token');
//   const { projectId } = useParams();

//   useEffect(() => {
//     console.log("hello");
//     console.log(token);
//     console.log(projectId);
//     if (!projectId) {
//       console.error('No projectId provided');
//       return;
//     }

//     if (!token) {
//       console.error('No token provided');
//       return;
//     }

//     // Initialize Socket.io client
//     socketRef.current = io('https://codetogether-3c8e.onrender.com', {
//       query: { token, projectId }
//     });

//     // Fetch initial code from the server
//     socketRef.current.emit('joinProject', projectId);

//     // Listen for code updates
//     socketRef.current.on('codeUpdate', (newCode) => {
//       setCode(newCode);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [projectId, token]);

//   const handleEditorChange = (newValue) => {
//     setCode(newValue);
//     socketRef.current.emit('codeChange', { projectId, code: newValue });
//   };

//   const runCode = () => {
//     try {
//       // Run the code and capture the output
//       const output = eval(code);
//       setOutput(output);
//     } catch (error) {
//       setOutput(error.message);
//     }
//   };

//   return (
//     <div className="editor-container">
//       <Editor
//         height="60vh"
//         defaultLanguage="javascript"
//         value={code}
//         onChange={handleEditorChange}
//       />
//       <button onClick={runCode}>Run Code</button>
//       <div className="output-section">
//         <h3>Output:</h3>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;



// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router-dom';

// const CodeEditor = () => {
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');
//   const socketRef = useRef(null);
//   const token = localStorage.getItem('token');
//   const { projectId } = useParams();

//   useEffect(() => {
//     if (!projectId) {
//       console.error('No projectId provided');
//       return;
//     }

//     if (!token) {
//       console.error('No token provided');
//       return;
//     }

//     // Initialize Socket.io client
//     socketRef.current = io('https://codetogether-3c8e.onrender.com', {
//       query: { token, projectId }
//     });

//     // Fetch initial code from the server
//     socketRef.current.emit('joinProject', projectId);

//     // Listen for code updates
//     socketRef.current.on('codeUpdate', (newCode) => {
//       if (typeof newCode === 'string') {
//         setCode(newCode);
//       } else {
//         console.error('Received invalid code update:', newCode);
//       }
//     });

//     return () => {
//       // Cleanup the socket connection on component unmount
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [projectId, token]);

//   const handleEditorChange = (newValue) => {
//     if (typeof newValue === 'string') {
//       setCode(newValue);
//       if (socketRef.current) {
//         socketRef.current.emit('codeChange', { projectId, code: newValue });
//       }
//     } else {
//       console.error('Invalid value received from editor:', newValue);
//     }
//   };

//   const runCode = () => {
//     try {
//       // Run the code and capture the output
//       const result = eval(code);
//       setOutput(result);
//     } catch (error) {
//       setOutput(error.message);
//     }
//   };

//   return (
//     <div className="editor-container">
//       <Editor
//         height="60vh"
//         defaultLanguage="javascript"
//         value={code}
//         onChange={(value) => handleEditorChange(value)}
//       />
//       <button onClick={runCode}>Run Code</button>
//       <div className="output-section">
//         <h3>Output:</h3>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;


// CodeEditor.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const socketRef = useRef(null);
  const token = localStorage.getItem('token');
  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) {
      console.error('No projectId provided');
      return;
    }

    if (!token) {
      console.error('No token provided');
      return;
    }

    // Initialize Socket.io client
    socketRef.current = io('https://codetogether-3c8e.onrender.com', {
      query: { token, projectId }
    });

    // Fetch initial code from the server
    socketRef.current.emit('joinProject', projectId);

    // Listen for code updates
    socketRef.current.on('codeUpdate', (newCode) => {
      if (typeof newCode === 'string') {
        setCode(newCode);
      } else {
        console.error('Received invalid code update:', newCode);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [projectId, token]);

  const handleEditorChange = (newValue) => {
    if (typeof newValue === 'string') {
      setCode(newValue);
      if (socketRef.current) {
        socketRef.current.emit('codeChange', { projectId, code: newValue });
      }
    } else {
      console.error('Invalid value received from editor:', newValue);
    }
  };

  const runCode = () => {
    try {
      const result = eval(code);
      setOutput(result);
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div className="editor-container">
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => handleEditorChange(value)}
      />
      <button onClick={runCode}>Run Code</button>
      <div className="output-section">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
