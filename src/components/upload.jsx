import React, { useState } from 'react';
import './upload.css';
import axios from 'axios';

function UploadFile(){ 
  
    const [userName, setUserName] = useState(''); 
    const [uploadDate, setUploadDate] = useState(''); 
    const [userState, setUserState] = useState(''); 
    const[selectFile,setSelectFile]=useState('')
    const[uploadFile,setUploadFile]=useState('')

    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleUploadFile = (e) => {
        const file = e.target.files?.[0];
        if (file){
            console.log('Uploaded file:', file.name); 
            setUploadFile(file);
            setSelectFile(file.name);
        }

    };

    /* const handleSelectFile = () => {
        if (uploadFilePath) {
        console.log('Selected path:', uploadFilePath);
        setSelectPath(uploadFilePath);
        }
    }; */

    const handleSubmitToDatabase = async () => {
      debugger
        if (!uploadFile) {
          alert('No file selected');
          return;
        }
        
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('userName', userName);
        formData.append('userDate', uploadDate);
        formData.append('userState', userState);

        
      /* const payload = { "filePath" : selectFile,'userName':userName,"userDate": uploadDate,'userState':userState}
        //formData.append('file-path', uploadFile);
        console.log('payload:', payload) */
    
        try { 
          const response = await axios.post('http://localhost:8080/userDetails/userFile', payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          );
          console.log("response:",response.data) 
  
          
        /* this is also working 

        const formData = new FormData();
          formData.append('file', uploadFile);
          formData.append('user-name', userName);
          formData.append('user-date', uploadDate);
          formData.append('user-state', userState);


          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
          
          try {
            const response = await axios.post('http://localhost:5000/userDetails/userFile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });   */ 

          console.log('response:', response);
          const result = response.data;
          console.log('Server response:', result);
          alert('user details uploaded and stored in database!'); 

          
        } catch (error) {
          console.error('sending data failed:', error);
          alert('sending failed');
        }
      };


      const handleSearchByName = async () => {
        debugger
        if (!searchName) {
          alert('Please enter a name to search');
          return;
        }
    
        try {
          const response = await axios.get(`http://localhost:8080/userDetails/userFile/search?name=${searchName}`);
          console.log('Search results:', response.data);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]); // Clear previous results
          alert('No user found or search failed');
        }
      };

      return (
        <div className="container mt-5">
          <div className="mb-3"> 
            <label htmlFor="userName" className="form-label">Name</label>
            <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>

        <div className="mb-3">
          <label htmlFor="uploadDate" className="form-label">Date</label>
          <input type="date" className="form-control" id="uploadDate" value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="userState" className="form-label">State</label>
          <input type="text" className="form-control" id="userState" value={userState} onChange={(e) => setUserState(e.target.value)} />
        </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4 text-center">Upload File</h4>
    
              <div className="mb-3">
                <label htmlFor="filePath" className="form-label">Selected File</label>
                <input type="text" className="form-control" id="filePath" value={selectFile} readOnly />
              </div>
    
              <div className="mb-3">
                <label htmlFor="fileUpload" className="form-label">Choose File</label>
                <input type="file" className="form-control" id="fileUpload" onChange={handleUploadFile} />
              </div>
    
              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmitToDatabase}>
                  Submit to Database
                </button>
              </div>
             
            </div>
          </div>

          <div className="card shadow-sm mt-4">
          <div className="card-body">
          <h4 className="card-title mb-4 text-center">Search by Name</h4>

          <div className="mb-3">
            <label htmlFor="searchName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="searchName"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button className="btn btn-secondary w-100" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={handleSearchByName}>
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-3">
              <h5>Results:</h5>
          {/*      {searchResults.map((user, index) => (
                <div key={index} className="border p-2 mb-2">
                  <p><strong>ID:</strong> {user.userID}</p>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Date:</strong> {user.date}</p>
                  <p><strong>State:</strong> {user.state}</p> //this is for putting datas in map*/}
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>State</th>
                    <th>Files</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userID}</td>
                      <td>{user.name}</td>
                      <td>{user.date}</td>
                      <td>{user.state}</td>
                      <td>
                        {user.files?.length > 0 ? (
                          <ul className="list-unstyled mb-0">
                            {user.files.map((file, i) => (
                              <li key={i}>
                                <strong>Title:</strong> {file.title}<br />
                                <strong>Description:</strong> {file.description}
                              </li>
                   ))}
                   </ul>
                 ) : (
                   <em>No files</em>
                 )}
               </td>
             </tr>
           ))}
         </tbody>
         </table>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
export default UploadFile;

