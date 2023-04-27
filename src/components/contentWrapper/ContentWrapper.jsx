import React from 'react'

const ContentWrapper = ({ children, className }) => {
    return <div
        className={`px-4 md:px-16 py-4 w-full h-auto flex flex-col justify-center ${className || ""
            }`}
    >
        {children}
    </div>
};

export default ContentWrapper;



