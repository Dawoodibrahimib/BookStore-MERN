import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backbutton from '../Components/Backbutton';
import Spinner from '../Components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState(''); // Initialize with an empty string
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Use destructuring to get id from params

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear) // Convert to string if necessary
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while fetching book details. Please check your console.');
                console.error('Error fetching book:', error);
            });
    }, [id]); // Ensure useEffect runs when id changes

    function handleEditBook() {
        const data = {
            title,
            author,
            publishYear: parseInt(publishYear), // Ensure publishYear is parsed as integer
        };
        setLoading(true);
        axios
            .post(`http://localhost:5555/books/${id}`, data) // Use PUT request to update book
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while updating book. Please check the console.');
                console.error('Error updating book:', error);
            });
    }

    return (
        <div className='p-4'>
            <Backbutton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading && <Spinner />} {/* Show spinner while loading */}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type='text' // Use type='text' instead of type='number' to prevent issues with toString()
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save Book
                </button>
            </div>
        </div>
    );
}

export default EditBook;
