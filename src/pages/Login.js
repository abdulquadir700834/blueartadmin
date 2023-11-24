import Header from "../components/header/Header";
import LoginContent from "../components/authentification/Login";

export default function Login() {
    return (
        <>
            <Header />
            <LoginContent
                title="Welcome Back!"
                subTitle=""
                button={[
                    {
                        text: "",
                        path: "/register"
                    }
                ]}
                image="img/core-img/register.png"
            />
        </>
    )
}