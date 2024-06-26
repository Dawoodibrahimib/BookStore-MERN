import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BiInfoCircle } from "react-icons/bi";

function BookModal({ book , onclose })
{
    return
    (
        <div className = 'fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center' onClick = {onclose}>
           <div onClick = {(event) => event.stopPropagation()} className = "w-{600px} max-w-full h-{400px} bg-whte rounded-xl p-4 flex flex-col relative">
            <AiOutlineEdit className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onclose}></AiOutlineEdit>

           </div>
           <h2 className=' px-4 py-1 bg-red-300 rounded-lg'>
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
                    <p>Anything you want</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, at esse sint quam sunt illo nobis fugiat voluptatem cupiditate quidem recusandae ex facere, eligendi obcaecati laborum et consequatur? Eum, itaque.</p>
        </div>
    )
}

export default BookModal;