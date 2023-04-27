import React from "react";

const Wrapper = ({ children, className }) => {
    return (
        <div
            className={`w-full max-w-[1440px] px-5 md:px-10 my-auto mx-auto ${className || ""
                }`}
        >
            {children}
        </div>
    );
};

export default Wrapper;