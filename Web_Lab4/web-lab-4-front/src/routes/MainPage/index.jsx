import Author from "../../components/Sections/Author";
import AppBody from "../../components/AppBody";
import Header from "../../components/Sections/Header";
import Input from "../../components/Sections/Input";
import {Toaster} from "react-hot-toast";

function MainPage() {

    const headerNavigation = [
        {title: "Log out", link: "/"}
    ];

    return (
        <AppBody>
            <Author />
            <Header navigation={headerNavigation} />
            <Input />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </AppBody>
    );

}

export default MainPage;