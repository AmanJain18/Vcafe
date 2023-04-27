import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import { useNavigate } from 'react-router-dom'
import FormAction from "./formControl/FormAction";
import Input from "./formControl/Input";
import { BiHide, BiShow } from 'react-icons/bi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SignUp () {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showpassword);

    const [showconfirmpassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showconfirmpassword);

    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount();
    }

    //handle Signup API Integration here
    const createAccount = async () => {
        try {
            const response = await api.post('/register', {
                name: signupState.name,
                email: signupState.email,
                password: signupState.password,
                repeat_password: signupState.cpassword
            })

            toast.success(response.data.message)
            if (response.status === 201) {
                setTimeout(() => {
                    navigate('/signin')
                }, 1000);
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <form className="mt-8 " onSubmit={handleSubmit}>
            <Input
                key={"name"}
                handleChange={handleChange}
                value={signupState["name"]}
                labelText={"Name"}
                labelFor={"name"}
                id={"name"}
                name={"name"}
                type={"text"}
                isRequired={true}
                placeholder={"Full Name"}
                autoComplete={"name"}
            />
            <Input
                key={"email"}
                handleChange={handleChange}
                value={signupState["email"]}
                labelText={"Email Address"}
                labelFor={"email-address"}
                id={"email"}
                name={"email"}
                type={"email"}
                isRequired={true}
                placeholder={"Email Address"}
                autoComplete={"email"}
            />
            <div className='flex items-center h-[40px] relative justify-between'>
                <Input
                    key={"password"}
                    handleChange={handleChange}
                    value={signupState["password"]}
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
            <div className='flex items-center relative justify-between'>
                <Input
                    key={"cpassword"}
                    handleChange={handleChange}
                    value={signupState["cpassword"]}
                    labelText={"Confirm Password"}
                    labelFor={"confirm-password"}
                    id={"cpassword"}
                    name={"cpassword"}
                    type={showconfirmpassword ? "text" : "password"}
                    isRequired={true}
                    placeholder={"Confirm Password"}
                    autoComplete={"cpassword"}
                    customClass=" smm:w-[280px] w-[170px] sm:!w-[400px]"
                />
                <span className='cursor-pointer text-2xl' onClick={handleShowConfirmPassword}>{showconfirmpassword ? <BiHide /> : <BiShow />}</span>
            </div>
            <FormAction handleSubmit={handleSubmit} text="Signup" />
        </form>
    )
}