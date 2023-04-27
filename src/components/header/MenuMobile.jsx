import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Menu", url: "/menu" },
    { id: 3, name: "Orders", url: "/orders" },
    { id: 4, name: "About", url: "/about" },
    { id: 5, name: "Contact", url: "/contact-us" },
    { id: 6, name: "SignIn", url: "/signin" },
    { id: 7, name: "Signup", url: "/signup" },
    { id: 8, name: "Logout", url: "/signin" },
];

const MenuMobile = ({
    setMobileMenu,
}) => {
    const handleLogout = async () => {
        const res = await authApi.get("/logout");
        if (res) {
            localStorage.removeItem("cartItems");
            localStorage.removeItem("token");
            dispatch(logout());
            toast.success("Logged out successfully");
            navigator("/signin");
        };
    };
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const menuItems = isLoggedIn ? data.filter((item) => item.id !== 6 && item.id !== 7) : data.filter((item) => item.id !== 3 && item.id !== 8);
    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
            {menuItems.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        {
                            <li className="py-4 px-5 border-b">
                                {item.id !== 8 ? (
                                    <Link
                                        to={item?.url}
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <Link
                                        to={item?.url}
                                        onClick={[() => setMobileMenu(false), handleLogout]}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        }
                    </React.Fragment>
                );
            })}
        </ul >
    );
};

export default MenuMobile;