import { useState } from 'react';
import { signinFields } from "../constants/formFields";
import { useNavigate } from 'react-router-dom'
import FormAction from "./formControl/FormAction";
import Input from "./formControl/Input";
import { BiHide, BiShow } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { api } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { login, isAdmin } from '../store/authSlice';

const fields = signinFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SignIn () {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showpassword);
    const [loginState, setLoginState] = useState(fieldsState);
    const dispatch = useDispatch();
    // const userData = useSelector(state => state);
    // console.log(userData.user)
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
        // console.log(loginState)
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            const response = await api.post('/login', {
                email: loginState.email,
                password: loginState.password
            })
            const { token } = response.data;
            const { role } = response.data.user;
            localStorage.setItem("token", token);
            if (response.status === 200) {
                toast.success(response.data.message)
                dispatch(login(response.data.user));
                if (role === 'admin') {
                    dispatch(isAdmin(true));
                }
                setTimeout(() => {
                    navigate('/')
                }, 1000);

            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
                key={"email"}
                handleChange={handleChange}
                value={loginState["email"]}
                labelText={"Email Address"}
                labelFor={"email-address"}
                id={"email"}
                name={"email"}
                type={"email"}
                isRequired={true}
                placeholder={"Email Address"}
                autoComplete={"email"}
            />
            <div className='flex items-center h-[40px] justify-between sm:gap-2'>
                <Input
                    key={"password"}
                    handleChange={handleChange}
                    value={loginState["password"]}
                    labelText={"Password"}
                    labelFor={"password"}
                    id={"password"}
                    name={"password"}
                    type={showpassword ? "text" : "password"}
                    isRequired={true}
                    placeholder={"Password"}
                    autoComplete={"current-password"}
                    customClass=" smm:w-[280px] w-[170px] sm:!w-[400px]"
                />
                <span className='cursor-pointer text-2xl' onClick={handleShowPassword}>{showpassword ? <BiHide /> : <BiShow />}</span>
            </div>

            {/* <FormExtra /> */}
            <FormAction handleSubmit={handleSubmit} text="SignIn" />


        </form>
    )
}