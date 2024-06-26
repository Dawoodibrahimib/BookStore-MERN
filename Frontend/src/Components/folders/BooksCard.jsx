import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from "react-icons/pi";
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAutoDelete } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import BookModal from './BookModal';

function BooksCard({ books }) {
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {books.map((item) => (
                <div key={item._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
                    <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                        {item.publishYear}
                    </h2>
                    <h4 className='my-2 text-gray-500'>{item._id}</h4>
                    <div className='flex justify-start items-center gap-x-2'>
                        <PiBookOpenTextLight className='text-red-300 text-2xl' />
                        <h2 className='my-1'>{item.title}</h2>
                    </div>
                    <div className='flex justify-start items-center'>
                        <BiUserCircle className='text-red-300 text-2xl' />
                        <h2 className='my-1'>{item.author}</h2>
                    </div>
                    <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                        <BiUserCircle
                            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                            onClick={openModal} // Open modal on click
                        />
                        <Link to={`/books/details/${item._id}`}>
                            <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                        </Link>
                        <Link to={`/books/edit/${item._id}`}>
                            <AiOutlineEdit className='text-2xl text-blue-800 hover:text-black' />
                        </Link>
                        <Link to={`/books/delete/${item._id}`}>
                            <MdOutlineAutoDelete className='text-2xl text-red-800 hover:text-black' />
                        </Link>
                    </div>
                    {showModal && <BookModal book={item} onClose={() => setShowModal(false)} />} {/* Render modal if showModal is true */}
                </div>
            ))}
        </div>
    );
};

export default BooksCard;
