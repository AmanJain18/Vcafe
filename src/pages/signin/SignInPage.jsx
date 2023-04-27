import FormHeader from "../../components/FormControl/FormHeader"
import SignIn from "../../components/SignIn"

const SignInPage = () => {
    return (
        <div className="!m-auto md:m-auto px-4 md:px-16 py-4 w-full h-auto flex flex-col items-center justify-center ">
            <div className="bg-primary rounded-xl w-450 p-10 shadow-lg">
                <FormHeader
                    heading="Login to your account"
                    paragraph="Don't have an account yet ? "
                    linkName="SignUp"
                    linkUrl="/signup"
                />
                <SignIn />
            </div>
        </div>
    )
}

export default SignInPage