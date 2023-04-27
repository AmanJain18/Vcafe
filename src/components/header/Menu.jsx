import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Menu", url: "/menu" },
    { id: 3, name: "Orders", url: "/orders" },
    { id: 4, name: "About", url: "/about" },
    { id: 5, name: "Contact", url: "/contact-us" },
];

const Menu = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const menuItems = isLoggedIn ? data : data.filter((item) => item.id !== 3);
    return (
        <ul className="hidden md:flex items-center gap-8 md:ml-28 font-medium text-black ">
            {menuItems.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        {
                            <li className="cursor-pointer hover:text-orange-500 relative transition-all ease-in-out">
                                <Link to={item?.url}>{item.name}</Link>
                            </li>
                        }
                    </React.Fragment>
                );
            })}
        </ul>
    );
};

export default Menu;