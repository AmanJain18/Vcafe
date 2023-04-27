import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logohr.png";
import Wrapper from "../contentWrapper/Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logout } from "../../store/authSlice";
import { authApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);

    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
                console.log(show)
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [cartItems]);

    const handleLogout = async () => {
        const res = await authApi.get("/logout");
        if (res) {
            localStorage.removeItem("token");
            localStorage.removeItem("cartItems");
            dispatch(logout());
            toast.success("Logged out successfully");
            navigator("/signin");
            window.location.reload();
        };
    };

    return (
        <header
            className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 shadow-sm ${show}`}
        >
            <Wrapper className="h-[60px] flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} className="w-[30px] md:w-[40px]" />
                </Link>

                <Menu />

                {mobileMenu && (
                    <MenuMobile
                        setMobileMenu={setMobileMenu}
                    />
                )}
                <div className="flex items-center md:gap-3 text-cartBg justify-between">
                    <div className="md:gap-3 md:flex hidden">
                        {isAdmin && (
                            <Link to="/admin/dashboard">
                                <div className="w-8 md:w-12 h-8 md:mr-10 md:h-12 rounded-full flex justify-center items-center hover:text-orange-500 cursor-pointer relative transition-all ease-in-out font-medium">
                                    Dashboard
                                </div>
                            </Link>
                        )
                        }
                        {!isLoggedIn ? (
                            <>
                                <Link to="/signin">
                                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:text-orange-500 cursor-pointer relative transition-all ease-in-out mr-1 font-medium">
                                        Login
                                    </div>
                                </Link>
                                <Link to="/signup">
                                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:text-orange-500 cursor-pointer relative transition-all ease-in-out font-medium">
                                        Signup
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <Link onClick={handleLogout}>
                                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:text-orange-500 cursor-pointer relative transition-all ease-in-out font-medium">
                                    Logout
                                </div>
                            </Link>
                        )}
                    </div>
                    {/* Icon start */}
                    <Link to="/cart">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BsCart className="text-[15px] md:text-[20px]" />
                            {cartItems && cartItems.length > 0 && (
                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {cartItems.length}
                                </div>
                            )}
                        </div>
                    </Link>
                    {/* Icon end */}

                    {/* Mobile icon start */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {mobileMenu ? (
                            <VscChromeClose
                                className="text-[16px]"
                                onClick={() => setMobileMenu(false)}
                            />
                        ) : (
                            <BiMenuAltRight
                                className="text-[20px]"
                                onClick={() => setMobileMenu(true)}
                            />
                        )}
                    </div>
                    {/* Mobile icon end */}
                </div>
            </Wrapper>
        </header>
    );
};

export default Header;