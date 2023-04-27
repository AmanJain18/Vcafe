import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/contentWrapper/Wrapper";

const PaymentSuccess = () => {
    return (
        <div className="md:min-h-[700px] min-h-[500px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] max-h-[250px] p-5 flex flex-col items-center justify-center h-screen border border-green-400 rounded-lg mx-auto text-center">
                    <h1 className="text-xl md:text-3xl font-bold mb-6">Payment Successful</h1>
                    <p className="text-gray-700 mb-6 text-center    ">
                        Thank you for your order. <br /> Your payment has been successfully processed.
                    </p>
                    <Link to="/" className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 font-bold">
                        Back to Home
                    </Link>
                </div >
            </Wrapper>
        </div>
    );
};

const PaymentFailed = () => {
    return (
        <div className="md:min-h-[700px] min-h-[500px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] max-h-[250px] p-5 flex flex-col items-center justify-center h-screen border border-green-400 rounded-lg mx-auto text-center">
                    <h1 className="text-xl md:text-3xl font-bold mb-6">Payment Failed !</h1>
                    <p className="text-gray-700 mb-6 text-center    ">
                        There was an error processing your payment. <br /> Please try again.
                    </p>
                    <Link to="/" className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 font-bold">
                        Back to Home
                    </Link>
                </div >
            </Wrapper>
        </div>
    );
};

export { PaymentSuccess, PaymentFailed };
