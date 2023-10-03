import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import user from "../images/user.png"
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { storage } from '../../firebase';
import logo from "../images/logo.svg"

function Login() {
    const [name, setName] = useState('');
    const [file, setFile] = useState(user);
    const [error, setError] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const storageRef = ref(storage);
    const navigate = useNavigate();

    useEffect(() => {
        // Cleanup function to remove any uploaded file if the component is unmounted
        return () => {
            if (file) {
                console.log('Cleaning up uploaded file...');
                // Delete the uploaded file if needed
            }
        };
    }, [file]);

    useEffect(() => {}, [fileUrl]);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        if (newName.length > 15) {
            setError('Name should not exceed 15 characters');
        } else {
            setError('');
            setName(newName);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.includes('image')) {
            setError('');
            setFile(selectedFile);
        } else {
            setError('Please select an image file');
            setFile(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === '') {
            setError('Please enter your name');
        } else {
            setIsLoading(true); // Start loading

            const fileName = `${Date.now()}_${file.name}`;
            const fileRef = ref(storageRef, 'file/' + fileName);
            const playerId = uuid();

            uploadBytes(fileRef, file)
                .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    return getDownloadURL(fileRef);
                })
                .then((downloadURL) => {
                    console.log('File URL:', downloadURL);
                    setFileUrl(downloadURL);
                    localStorage.setItem("userInfo", JSON.stringify({name: name, image: downloadURL,id:playerId }))
                    navigate('/create');
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                })
                .finally(() => {
                    setIsLoading(false); // Stop loading
                });
        }
    };

    return (
        <div className="login-page row">
            <img src={logo} alt='Rock paper scissors' className='logo-login-page'/>
            <div className='container'>
                <div className='col-12 col-md-6'>
                    <form onSubmit={handleSubmit} className='' >
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <div className='file'>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                            <span><img src={fileUrl !== "" ? fileUrl : user} alt='user icon' /><p>Add Image(optional)</p></span>
                        </div>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : "Let's Go"}</button>
                    </form>
                    {error && <p className='err'>{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;