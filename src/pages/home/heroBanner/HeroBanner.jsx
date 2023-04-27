import React from "react";
import HeroBg from "../../../assets/heroBg.png";
import { heroData } from "../../../utils/data";
import { Link } from "react-router-dom";
import { ContentWrapper } from "../../../components";

const HeroBanner = () => {
    return (
        <ContentWrapper className="items-center">
            <section
                className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
                id="home"
            >
                <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">

                    <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
                        Fresh & Authentic Foods in{" "}
                        <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
                            Campus
                        </span>
                    </p>

                    <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
                        eaque fugit distinctio est nam voluptatum architecto, porro iusto
                        deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
                        suscipit!
                    </p>

                    <button
                        type="button"
                        className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                    >
                        <Link to={'/menus'}>
                            Order Now</Link >
                    </button>
                </div>
                <div className="py-2 flex-1 flex items-center relative">
                    <img
                        src={HeroBg}
                        className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
                        alt="hero-bg"
                    />

                    <div className="w-full h-full absolute top-0 md:left-14 flex items-center justify-center xl:px-20 2xl:px-32 py-4 gap-4 flex-wrap">
                        {heroData &&
                            heroData.map((n) => (
                                <div
                                    key={n.id}
                                    className="lg:w-190 p-4 w-150 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                                >
                                    <img
                                        src={n.imageSrc}
                                        className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                        alt="I1"
                                    />
                                    <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                        {n.name}
                                    </p>

                                    <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                        {n.decp}
                                    </p>
                                    <p className="text-sm font-semibold text-headingColor">
                                        <span className="text-xs text-red-600">₹</span> {n.price}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </ContentWrapper>
    );
};

export default HeroBanner;
