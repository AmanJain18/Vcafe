import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import CartItem from "../../components/CartItem";
import { useSelector } from "react-redux";
import { api } from "../../utils/api";

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const data = useSelector((state) => state.auth.data);
    const { cartItems } = useSelector((state) => state.cart);

    const subTotal = useMemo(() => {
        return cartItems.reduce(
            (total, val) => total + val.TolalPrice,
            0
        );
    }, [cartItems]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const res = await api.post("/create-checkout-session", {
                user: data,
                cartItems,
                subTotal,
            });
            window.location.href = res.data;
            // const session = await stripe.redirectToCheckout({
            //     sessionId: res.data.id,
            // });
            localStorage.removeItem("cartItems");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full md:py-20">
            <ContentWrapper>
                {cartItems.length > 0 && (
                    <>
                        {/* HEADING AND PARAGRAPH START */}
                        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                                Shopping Cart
                            </div>
                        </div>
                        {/* HEADING AND PARAGRAPH END */}

                        {/* CART CONTENT START */}
                        <div className="flex flex-col lg:flex-row gap-12 py-10">
                            {/* CART ITEMS START */}
                            <div className="flex-[2]">
                                <div className="text-lg font-bold">
                                    Cart Items
                                </div>
                                {cartItems.map((item) => (
                                    <CartItem key={item._id} data={item} />
                                ))}
                            </div>
                            {/* CART ITEMS END */}

                            {/* SUMMARY START */}
                            <div className="flex-[1]">
                                <div className="text-lg font-bold">Summary</div>

                                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                                    <div className="flex justify-between">
                                        <div className="uppercase text-md md:text-lg font-medium text-black">
                                            Subtotal
                                        </div>
                                        <div className="text-md md:text-lg font-medium text-black">
                                            &#8377;{subTotal}
                                        </div>
                                    </div>
                                    {/* <div className="text-sm md:text-md py-5 border-t mt-5">
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div> */}
                                </div>

                                {/* BUTTON START */}
                                <button
                                    className="w-full py-4 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-sm md:text-lg hover:shadow-lg transition-all ease-in-out duration-100 font-bold active:scale-95 flex items-center gap-2 justify-center"
                                >
                                    {isLoggedIn ? <Link onClick={handlePayment}>Checkout</Link> : <Link to="/signin">Login to Checkout</Link>}
                                    {loading && <img src="/spinner.svg" className="ml-2" />}
                                </button>
                                {/* BUTTON END */}
                            </div>
                            {/* SUMMARY END */}
                        </div>
                        {/* CART CONTENT END */}
                    </>
                )}

                {/* This is empty screen */}
                {cartItems.length < 1 && (
                    <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                        <img
                            src="/empty-cart.jpg"
                            width={300}
                            height={300}
                            className="w-[300px] md:w-[400px]"
                        />
                        <span className="text-xl font-bold">
                            Your cart is empty
                        </span>
                        <span className="text-center mt-4">
                            Looks like you have not added anything in your cart.
                            <br />
                            Go ahead and explore top categories.
                        </span>
                        <Link
                            to="/"
                            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cart;