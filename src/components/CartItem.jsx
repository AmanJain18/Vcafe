import React from "react";
import { RiAddLine, RiSubtractLine, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, decreaseQty, increaseQty } from "../store/CartSlice";
import { toast } from "react-hot-toast";
const CartItem = ({ data }) => {


    const dispatch = useDispatch();
    const handleRemoveFromCart = (id) => {
        toast.success("Product removed from cart");
        dispatch(removeFromCart({ _id: id }));  // dispatching the action
    };

    // const updateCartItem = (e, key) => {
    //     let payload = {
    //         key,
    //         val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
    //         id: data.id,
    //     };
    //     dispatch(updateCart(payload));
    // };

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            {/* IMAGE START */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <img
                    src={data.image}
                    alt={data.name}
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {data.name}
                    </div>

                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {data.category}
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;{data.TolalPrice}
                    </div>
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {data.category}
                </div>

                <div className="flex items-start md:items-end justify-between mt-4">
                    <div className="flex flex-col items-start gap-2 md:gap-2 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            {data.qty}
                        </div>
                        <div className="flex gap-4">
                            <RiSubtractLine
                                onClick={() =>
                                    dispatch(decreaseQty({ _id: data._id }))
                                }
                                className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                            />
                            <RiAddLine
                                onClick={() =>
                                    dispatch(increaseQty({ _id: data._id }))
                                }
                                className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                            />
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() => handleRemoveFromCart(data._id)}
                        className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;