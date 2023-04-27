import FormHeader from "../../components/FormControl/FormHeader"
import SignUp from "../../components/SignUp"

const SignUpPage = () => {
    return (
        <div className="m-auto md:m-auto px-4 md:px-16 py-4 w-ful h-auto flex flex-col items-center justify-center ">
            <div className="bg-primary rounded-xl w-450 p-10 shadow-lg">
                <FormHeader
                    heading="Signup to create an account"
                    paragraph="Already have an account ? "
                    linkName="SignIn"
                    linkUrl="/signin"
                />
                <SignUp />
            </div>
        </div>

    )
}

export default SignUpPage