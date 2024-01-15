import Author from "../../components/Sections/Author";
import AppBody from "../../components/AppBody";
import HeaderLogin from "../../components/Sections/Header";
import Error404 from "../../components/Sections/Error404";

function MainPage() {

    const headerNavigation = [
        {title: "Log in", link: "/"}
    ];


    return (
        <AppBody>
            <Author />
            <HeaderLogin navigation={headerNavigation} />
            <Error404 />
        </AppBody>
    );

}

export default MainPage;