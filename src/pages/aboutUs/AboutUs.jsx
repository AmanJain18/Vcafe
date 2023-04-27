import React from "react";
import Wrapper from "../../components/contentWrapper/Wrapper";

const AboutUs = () => { 
    return (
        <div className="bg-gray-100">
            <Wrapper className="py-12 sm:px-6 lg:py-16 lg:px-8 ">
                <div className="lg:grid lg:grid-cols-2 lg:justify-items-end  ">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            About Us
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            We are the college canteen, providing delicious and healthy food options for students, staff, and visitors of the college. Our mission is to promote healthy eating habits and provide a welcoming environment for our customers.
                        </p>
                        <p className="mt-4 text-lg text-gray-500">
                            Our menu features a variety of options, including vegetarian and gluten-free choices. We source our ingredients from local farms and suppliers whenever possible, and we prioritize sustainability in our operations.
                        </p>
                    </div>
                    <div className="mt-10">
                        <dl className="space-y-10">
                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Address
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    123 College Ave, City, State, Zip
                                </dd>
                            </div>
                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Hours of Operation
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Monday - Friday: 7:00am - 7:00pm <br />
                                    Saturday - Sunday: 8:00am - 4:00pm
                                </dd>
                            </div>
                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Contact Us
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Phone: (123) 456-7890 <br />
                                    Email: info@collegecanteen.com
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default AboutUs;
