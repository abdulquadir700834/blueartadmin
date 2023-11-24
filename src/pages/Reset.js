import Header from "../components/header/Header";
import ResetContent from '../components/authentification/Resetpassword';
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";

export default function Reset() {
    return(
        <>
            <Header />

            <Breadcrumb 
                breadcrumbTitle="Reset" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/reset"
                    }
                ]}
            />

            <Divider />

            <ResetContent
                title="Welcome Back!" 
                subTitle="" 
                button={[
                    {
                        text: "Reset now!",
                        path: "/reset-password"
                    }
                ]} 
                image="img/illustrator/4.png"
            />

            <Divider />
        </>
    )
}