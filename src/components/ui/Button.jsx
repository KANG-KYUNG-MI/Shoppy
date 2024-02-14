import React from 'react';

export default function Button({text, onClick}) {
    return (
        <div>
            <button className='  bg-brand text-white rounded-full hover:bg-blue-300 py-2 px-4 ' onClick={onClick}>{text}</button>
        </div>
    );
}

