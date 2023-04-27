import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import NotFound from "../../assets/NotFound.svg";
// import { categories } from "../utils/data";
// import { addCartItem, increaseQty } from "../app/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContentWrapper } from '../../components'
import './carousel.scss'
import { addToCart } from "../../store/CartSlice";


const Carousel = ({ data }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navigateTo = (dir) => {
    const container = carouselRef.current;
    const scrollValue = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollValue,
      behavior: "smooth"
    })
  }
  const handleAddCartProduct = (p) => {
    dispatch(addToCart({
      _id: p._id,
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image
    }))
    toast.success("Product added to cart");
  };

  return (

    <div className="carousel">
      <MdChevronLeft className="carouselLeftNav arrow" onClick={() => navigateTo("left")} />
      <MdChevronRight className="carouselRightNav arrow" onClick={() => navigateTo("right")} />
      <div
        ref={carouselRef}
        className="carouselItems"
      >
        {data ? (
          data.map((item) => (
            <div
              key={item?._id}
              className="w-300 h-[175px] min-w-[275px] cursor-pointer md:w-[345px] md:min-w-[320px] bg-orange-50 rounded-lg py-2 px-4 my-6 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative shrink-0"
            >
              <div className="w-full flex items-center justify-between relative bg-cover bg-center">
                <motion.div
                  className="w-40 h-40 -mt-8 drop-shadow-2xl"
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item?.image}
                    alt="productImage"
                    className="w-full h-full object-contain object-center"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  // onClick={() => setItems([...cartItems, item])}
                  onClick={() => handleAddCartProduct(item)}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end -mt-8">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.name}
                </p>
                {/* <p className="mt-1 text-sm text-gray-500">
                Calories: {item?.calories}
              </p> */}
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">₹</span> {item?.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src={NotFound} className="h-340" />
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </div >
  )
}

export default Carousel