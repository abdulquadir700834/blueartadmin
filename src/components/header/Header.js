import { useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CreateNewButton from "./CreateNewButton";
import FuntoNavbar from "./Nav";
import useStickyHeader from "./StickyHeader";
import Logo from '../../assets/logo.png';
import { useGetSiteSettingsQueryQuery } from '../../Store/Store';

export default function Header() {
    let [check] = useState(true);
    const sticky = useStickyHeader(10);
    const stickyClass = `${(sticky && check) ? 'sticky-on' : ''}`

    const siteVal = useGetSiteSettingsQueryQuery();

    console.log("siteValLogo:", siteVal?.data?.info?.ProjectDetails?.Logo)

    return (
        <header className={`header-area ${stickyClass}`} >
            <Navbar expand="lg">
                <Container>
                    {/* Navbar Brand */}
                    <Link className="navbar-brand" to="/">
                        <img className="light-logo" src={siteVal?.data?.info?.ProjectDetails?.Logo} alt="Light" />
                        <img className="dark-logo" src={siteVal?.data?.info?.ProjectDetails?.Logo} alt="Dark" />
                    </Link>

                    {/* Navbar Toggler */}
                    <Navbar.Toggle className="navbar-toggler" aria-controls="funtoNav" />

                    {/* Navbar */}
                    <Navbar.Collapse id="funtoNav">
                        {/* Navbar List */}
                        <FuntoNavbar />

                        {/* Header Meta */}
                        <div className="header-meta d-flex align-items-center ms-lg-auto">
                            {/* Create New Button */}
                            <CreateNewButton
                                buttonColor="btn-warning"
                                buttonURL="/create-new"
                                buttonText="Create New"
                            />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}