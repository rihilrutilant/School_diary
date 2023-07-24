import axios from 'axios';
import { useEffect, useState } from 'react';

const Demo = () => {

  const FileComponent = ({ file }) => {
    if (file.type.startsWith('image/')) {
      return <img src={file.url} alt={file.name} />;
    } else if (file.type === 'application/pdf') {
      return <embed src={file.url} type="application/pdf" />;
    } else {
      return <span>Unsupported file type: {file.name}</span>;
    }
  };

  const FileList = ({ files }) => {
    return (
      <div>
        {files.map((file, index) => (
          <FileComponent file={file} key={index} />
        ))}
      </div>
    );
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://api.nutanpublic.naavhub.com:5050/api/examtimetable/edit_examtimetable/', {
        headers: {
          'authToken_admin': localStorage.getItem('AToken')
        }
      });
      const files = response.data.files;
      console.log(response);
      return files;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Usage
  const FileGallery = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const filesData = await fetchFiles();
        setFiles(filesData);
      };
      fetchData();
    }, []);

    return (
      <FileList files={files} />
    );
  };

  <FileGallery />

}

export default Demo