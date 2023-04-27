import React, { useEffect, useState } from "react";
import Wrapper from "../../components/contentWrapper/Wrapper";

const ContactUs = () => {
    useEffect(() => {
        const googleScript = document.createElement("script");
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=`;
        window.document.body.appendChild(googleScript);

        googleScript.addEventListener("load", () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 19.021737342883995, lng: 72.87095880820372 },
                zoom: 14,
            });

            const marker = new window.google.maps.Marker({
                position: { lat: 19.021737342883995, lng: 72.87095880820372 },
                map,
                title: "College Canteen",
            });
        });
    }, []);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fname, lname, email, message } = formData;
        const mailtoLink = `mailto:info@collegecanteen.com?subject=New Contact Form Submission&body=First Name: ${fname}%0D%0ALast Name: ${lname}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="bg-gray-100">
            <Wrapper className="py-12 sm:px-6 lg:py-16 lg:px-8 ">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Contact Us
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            If you have any questions, comments, or feedback, please feel free to reach out to us. We would love to hear from you!
                        </p>
                        <p className="mt-4 text-lg text-gray-500">
                            You can contact us by phone or email, or by filling out the form below. We will get back to you as soon as possible.
                        </p>
                        <div id="map" className="h-96 rounded-lg mt-10"></div>
                    </div>
                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">
                            Contact Information
                        </h3>
                        <dl className="mt-4 space-y-8">
                            <div>
                                <dt className="sr-only">Phone number</dt>
                                <dd className="flex">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 4v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l-5 4m0 0l-5-4m5 4v8"
                                        />
                                    </svg>
                                    <span className="ml-3 text-base text-gray-500">
                                        (123) 456-7890
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="sr-only">Email</dt>
                                <dd className="flex">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 22L1 12.5M1 12.5L12 3M1 12.5L23 12.5"
                                        />
                                    </svg>
                                    <span className="ml-3 text-base text-gray-500">
                                        info@collegecanteen.com
                                    </span>
                                </dd>
                            </div>
                        </dl>
                        <h3 className="mt-10 text-lg font-medium text-gray-900">
                            Contact Form
                        </h3>
                        <form
                            className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    First name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="fname"
                                        id="fname"
                                        value={formData.fname}
                                        onChange={handleInputChange}
                                        autoComplete="given-name"
                                        className="py-2 px-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Last name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="lname"
                                        id="lname"
                                        value={formData.lname}
                                        onChange={handleInputChange}
                                        autoComplete="family-name"
                                        className="py-2 px-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleInputChange}
                                        value={formData.email}
                                        autoComplete="email"
                                        className="py-2 px-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="message"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="py-2 px-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Wrapper >
        </div>


    )
}

export default ContactUs
