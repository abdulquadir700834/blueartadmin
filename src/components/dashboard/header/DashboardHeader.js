import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import socket from "../../../socket"
import Dropdown from 'react-bootstrap/Dropdown';
import useStickyHeader from "../../header/StickyHeader";
import Web3 from 'web3';
import { SocketContext } from '../../../Helper/HelperContext';
import { useContext } from 'react';

const clientId = "739442081003-to9tu3grl07eddrge6pqf5uddav8obpv.apps.googleusercontent.com";

const DashboardHeader = ({ loginState, module, setting, role }) => {
    const location = useLocation();
    console.log("module:", module)
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            title: 'Admin',
            icon: <i className="bi bi-person-badge"></i>,
            submenus: [
                { title: 'Listing', icon: <i className="bi bi-person-bounding-box"></i>, link: '/user' },
                { title: 'Role Management', icon: <i className="bi bi-asterisk"></i>, link: '/role-admin' }
            ],
            isOpen: false
        },
        {
            id: 2,
            title: 'CMS',
            icon: <i className="bi bi-menu-button-wide-fill"></i>,
            submenus: [
                { title: 'Landing', icon: <i className="bi bi bi-window-split"></i>, link: '/landing' },
                { title: 'Features', icon: <i className="bi bi bi-newspaper"></i>, link: '/features' },
                { title: 'News', icon: <i className="bi bi bi-newspaper"></i>, link: '/news' },
                { title: 'News Author ', icon: <i className="bi bi-asterisk"></i>, link: '/news-author' },
                { title: 'NFT Block Chain Info', icon: <i className="bi bi bi-input-cursor"></i>, link: '/nft-info' },
                { title: 'CMS Pages', icon: <i class="bi bi-shield-fill-check"></i>, link: '/cms-pages' }
            ],
            isOpen: false
        },
        {
            id: 3,
            title: 'Artwork',
            icon: <i className="bi bi-motherboard"></i>,
            submenus: [
                { title: 'Art Listing', icon: <i className="bi bi bi-bar-chart-steps"></i>, link: '/artwork' },
                { title: 'Art Category', icon: <i className="bi bi-hammer"></i>, link: '/my-category' },
                { title: 'Art Medium', icon: <i className="bi bi bi-magic"></i>, link: '/medium' },
                { title: 'Art Style', icon: <i className="bi bi bi-border-style"></i>, link: '/style' },
                { title: 'Art Material', icon: <i className="bi bi bi-app-indicator"></i>, link: '/material' },
                { title: 'Art Keywords', icon: <i className="bi bi bi-geo-fill"></i>, link: '/keyword' }
            ],
            isOpen: false
        },
        {
            id: 4,
            title: 'History',
            icon: <i className="bi bi-clock-history"></i>,
            submenus: [
                { title: 'Activities', icon: <i className="bi bi-activity"></i>, link: '/activities' },
                { title: 'Offer', icon: <i className="bi bi-award-fill"></i>, link: '/offer-list' },
                { title: 'Bid List', icon: <i className="bi bi bi-currency-exchange"></i>, link: '/bid-list' },
                { title: 'Transaction History', icon: <i className="bi bi bi-border-style"></i>, link: '/history' }
            ],
            isOpen: false
        },
        {
            id: 5,
            title: 'Artist',
            icon: <i className="bi bi-cloud-fog-fill"></i>,
            submenus: [
                { title: 'Artist Categories', icon: <i className="bi bi bi-textarea-resize"></i>, link: '/artist-categories' },
                { title: 'Artist Style', icon: <i className="bi bi bi-border-style"></i>, link: '/artist-style' },
                { title: 'Artist Medium', icon: <i className="bi bi bi-option"></i>, link: '/artist-medium' },
                { title: 'Artist Label', icon: <i class="bi-tag-fill"></i>, link: '/artist-label' }
            ],
            isOpen: false
        },
        {
            id: 6,
            title: 'User',
            icon: <i className="bi bi-person-circle"></i>,
            submenus: [{ title: 'User Listing', icon: <i className="bi bi-people-fill"></i>, link: '/userkyc' },
            { title: 'User Role', icon: <i className="bi bi-person"></i>, link: '/user-role' },
            { title: 'Exhibition', icon: <i className="bi bi bi-tornado"></i>, link: '/exhibition' },
            { title: 'Media & Publications', icon: <i className="bi bi bi-file-earmark-music"></i>, link: '/media-publications' },
            { title: 'Bio List', icon: <i className="bi bi bi-calendar2-range"></i>, link: '/bio-list' },
            { title: 'Testimonial', icon: <i className="bi bi bi-people"></i>, link: '/testimonial' }

            ],
            isOpen: false
        },
        {
            id: 7,
            title: 'Gift',
            icon: <i className="bi bi-person-badge"></i>,
            submenus: [
                { title: 'Listing', icon: <i className="bi bi-person-bounding-box"></i>, link: '/gift' },
                { title: 'Gift History', icon: <i className="bi bi-asterisk"></i>, link: '/gift-history' },

            ],
            isOpen: false
        },
        {
            id: 8,
            title: 'ArtProduct',
            icon: <i className="bi bi-motherboard"></i>,
            submenus: [
                { title: 'Brand', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductbrand' },
                { title: 'Material', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductmaterial' },
            ],
            isOpen: false
        }
    ]);
    const toggleSubmenu = (id) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, isOpen: !item.isOpen };
                }
                return { ...item, isOpen: false };
            })
        );
    };
    useEffect(() => {
        let url = location.pathname;
        setMenuItems((prevItems) =>
            prevItems.map((item) => {
                const submenu = item.submenus.find((submenu) => submenu.link === url);
                if (submenu) {
                    return { ...item, isOpen: true };
                }
                return { ...item, isOpen: false };
            })
        );
    }, [location.pathname]);
    useEffect(() => {

        setMenuItems([
            {
                id: 1,
                title: 'Artwork',
                icon: <i className="bi bi-motherboard"></i>,
                submenus: [
                    module?.ArtworkModule?.Read || module?.ArtworkModule?.Write
                        ? { title: 'Art Listing', icon: <i className="bi bi bi-bar-chart-steps"></i>, link: '/artwork' } : {},
                    module?.CategoriesModule?.Read || module?.CategoriesModule?.Write
                        ? { title: 'Art Category', icon: <i className="bi bi-hammer"></i>, link: '/my-category' } : {},
                    module?.CategoriesModule?.Read || module?.CategoriesModule?.Write
                        ? { title: 'Art Medium', icon: <i className="bi bi bi-magic"></i>, link: '/medium' } : {},
                    module?.StylesModule?.Read || module?.StylesModule?.Write
                        ? { title: 'Art Style', icon: <i className="bi bi bi-border-style"></i>, link: '/style' } : {},
                    module?.MaterialModule?.Read || module?.MaterialModule?.Write
                        ? { title: 'Art Material', icon: <i className="bi bi bi-app-indicator"></i>, link: '/material' } : {},
                    module?.KeywordModule?.Read || module?.KeywordModule?.Write
                        ? { title: 'Art Keywords', icon: <i className="bi bi bi-geo-fill"></i>, link: '/keyword' } : {},
                    { title: 'Bulk Artwork Approval', icon: <i className="bi bi bi-geo-fill"></i>, link: '/bulkartwork-approval' }
                ],
                isOpen: false
            },
            {
                id: 2,
                title: 'ArtProduct',
                icon: <i className="bi bi-motherboard"></i>,
                submenus: [
                    { title: 'Art Product Listing', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductlisting' },
                    { title: 'Brand', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductbrand' },
                    { title: 'Category', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductcategory' },
                    { title: 'Fabric', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductfabric' },
                    { title: 'Material', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductmaterial' },
                    { title: 'Shape', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductshape' },
                    { title: 'Size', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductsize' },
                    { title: 'Style', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproductstyle' },
                    { title: 'Category Name', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproducttype' },
                    { title: 'Technique', icon: <i className="bi bi bi-app-indicator"></i>, link: '/artproducttechnique' },
                ],
                isOpen: false
            },
            {
                id: 3,
                title: 'Admin',
                icon: <i className="bi bi-person-badge"></i>,
                submenus: [
                    { title: 'Listing', icon: <i className="bi bi-person-bounding-box"></i>, link: '/user' },
                    { title: 'Role Management', icon: <i className="bi bi-asterisk"></i>, link: '/role-admin' }
                ],
                isOpen: false
            },
            {
                id: 4,
                title: 'CMS',
                icon: <i className="bi bi-menu-button-wide-fill"></i>,
                submenus: [
                    module?.LandingModule?.Read || module?.LandingModule?.Write
                        ? { title: 'Landing', icon: <i className="bi bi bi-window-split"></i>, link: '/landing' } : {},
                    module?.NewsModule?.Read || module?.NewsModule?.Write
                        ? { title: 'News', icon: <i className="bi bi bi-newspaper"></i>, link: '/news' } : {},
                    { title: 'News Author ', icon: <i className="bi bi-asterisk"></i>, link: '/news-author' },
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'Features & Editorials', icon: <i class="bi bi bi-window-split"></i>, link: '/features' } : {},
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'Events', icon: <i class="bi-flag-fill"></i>, link: '/events' } : {},
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'Team Members', icon: <i class="bi bi-people-fill"></i>, link: '/teams' } : {},
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'CMS Pages', icon: <i class="bi bi-shield-fill-check"></i>, link: '/cms-pages' } : {},
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'Banner', icon: <i class="bi-flag-fill"></i>, link: '/banner' } : {},
                    module?.CMSModule?.Read || module?.CMSModule?.Write
                        ? { title: 'Inner Banner', icon: <i class="bi-flag-fill"></i>, link: '/inner-banner' } : {},
                    { title: 'Aboutus Page Details', icon: <i class="bi-flag-fill"></i>, link: '/page-details' },
                ],
                isOpen: false
            },

            {
                id: 5,
                title: 'History',
                icon: <i className="bi bi-clock-history"></i>,
                submenus: [
                    { title: 'Activities', icon: <i className="bi bi-activity"></i>, link: '/activities' },
                    module?.OfferModule?.Read || module?.OfferModule?.Write
                        ? { title: 'Offer', icon: <i className="bi bi-award-fill"></i>, link: '/offer-list' } : {},
                    module?.BidModule?.Read || module?.BidModule?.Write
                        ? { title: 'Bid List', icon: <i className="bi bi bi-currency-exchange"></i>, link: '/bid-list' } : {},
                    module?.HistoryModule?.Read || module?.HistoryModule?.Write
                        ? { title: 'Transaction History', icon: <i className="bi bi bi-border-style"></i>, link: '/history' } : {},
                ],
                isOpen: false
            },
            {
                id: 6,
                title: 'Artist',
                icon: <i className="bi bi-cloud-fog-fill"></i>,
                submenus: [
                    { title: 'Artist Categories', icon: <i className="bi bi bi-textarea-resize"></i>, link: '/artist-categories' },
                    { title: 'Artist Style', icon: <i className="bi bi bi-border-style"></i>, link: '/artist-style' },
                    { title: 'Artist Medium', icon: <i className="bi bi bi-option"></i>, link: '/artist-medium' },
                    { title: 'Artist Label', icon: <i class="bi-tag-fill"></i>, link: '/artist-label' }
                ],
                isOpen: false
            },
            {
                id: 7,
                title: 'User',
                icon: <i className="bi bi-person-circle"></i>,
                submenus: [
                    module?.UserModule?.Read || module?.UserModule?.Write
                        ? { title: 'User Listing', icon: <i className="bi bi-people-fill"></i>, link: '/userkyc' } : {},
                    module?.UserRoleModule?.Read || module?.UserRoleModule?.Write
                        ? { title: 'User Role', icon: <i className="bi bi-person"></i>, link: '/user-role' } : {},
                    module?.ArtfairModule?.Read || module?.ArtfairModule?.Write
                        ? { title: 'Artfair', icon: <i className="bi bi bi-tropical-storm"></i>, link: '/artfair' } : {},
                    module?.ArtcollectionModule?.Read || module?.ArtcollectionModule?.Write
                        ? { title: 'Art Collection', icon: <i className="bi bi bi-bookmark-heart"></i>, link: '/artcollection' } : {},
                    module?.ExhibitionModule?.Read || module?.ExhibitionModule?.Write
                        ? { title: 'Exhibition', icon: <i className="bi bi bi-tornado"></i>, link: '/exhibition' } : {},
                    module?.MediaModule?.Read || module?.MediaModule?.Write
                        ? { title: 'Media & Publications', icon: <i className="bi bi bi-file-earmark-music"></i>, link: '/media-publications' } : {},
                    module?.BioModule?.Read || module?.BioModule?.Write ?
                        { title: 'Bio List', icon: <i className="bi bi bi-calendar2-range"></i>, link: '/bio-list' } : {},
                    module?.TestimonialModule?.Read || module?.TestimonialModule?.Write
                        ? { title: 'Testimonial', icon: <i className="bi bi bi-people"></i>, link: '/testimonial' } : {}
                ],
                isOpen: false
            },
            {
                id: 8,
                title: 'Gift',
                icon: <i className="bi bi-person-badge"></i>,
                submenus: [
                    module?.GiftModule?.Read || module?.GiftModule?.Write
                        ? { title: 'Listing', icon: <i className="bi bi-person-bounding-box"></i>, link: '/gift' } : {},
                    module?.GiftModule?.Read || module?.GiftModule?.Write ?
                        { title: 'Gift History', icon: <i className="bi bi-asterisk"></i>, link: '/gift-history' } : {}
                ],
                isOpen: false
            },
            {
                id: 9,
                title: 'Admin Wallet',
                icon: <i className="bi bi-person-badge"></i>,
                submenus: [
                    { title: 'Balance Details', icon: <i className="bi bi-person-bounding-box"></i>, link: '/balance-details' },
                    { title: 'Withdraw History', icon: <i className="bi bi-person-bounding-box"></i>, link: '/withdraw-history' },
                ],
                isOpen: false
            },

        ])

    }, [module])
    let [check] = useState(true);
    const sticky = useStickyHeader(10);
    const stickyClass = `${(sticky && check) ? 'sticky-on' : ''}`
    const [ether, setEther] = useState("0");
    const [showlogoutButton, setShowlogoutButton] = useState(true);
    const userid = sessionStorage?.getItem("userId")
    const [socketMessage, setSocketMessage] = useState("")
    // const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_BSC_CHAIN_TESTNET_RPC_URL);
    // const web3 = new Web3(provider);
    // const getBalance = () => {
    //     web3.eth.getBalance(process.env.REACT_APP_ADMIN_ACCOUNT_TESTNET).then(balance => {

    //         const ether = web3.utils.fromWei(balance, 'ether')
    //         setEther(ether);
    //         console.log("admin bal", ether)
    //     })
    // }
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);
    };
    const userDropdownData = [
        {
            path: "/dashboard",
            icon: "bi-person-circle",
            text: "Dashboard"
        },
        {
            path: "/offer-list",
            icon: "bi-hammer",
            text: "Offer"
        },
        {
            path: "/my-collection",
            icon: "bi-collection",
            text: "Collection"
        },
        {
            path: "/settings",
            icon: "bi-gear",
            text: "Settings"
        },
        {
            path: "/auth",
            icon: "bi-hammer",
            text: "Logout"
        },

    ]
    const userInfo = [
        {
            thumbnail: "img/bg-img/u2.jpg",
            username: "William",
            userType: "Super Admin"
        }
    ]
    const balanceCard = [
        {
            title: "Current balance",
            icon: "img/core-img/ethereum.png",
            balance: 4.0678,
            balanceType: "ETH"
        }
    ]
    const [AdminNav, setAdminNav] = useState([
        { id: 1, path: "/dashboard", icon: "bi-speedometer", text: "Dashboard" },
        { id: 2, path: "/emailtemplate", icon: "bi-envelope-open-fill", text: "Email Templates" },
        { id: 3, path: "/collections", icon: "bi bi-collection", text: "Collections" },
        { id: 4, path: "/network", icon: "bi bi-hdd-network", text: "Network" },
        { id: 5, path: "/settings", icon: "bi bi-bell", text: "Settings" },
    ])


    useEffect(() => {
        setAdminNav([
            { id: 1, path: "/dashboard", icon: "bi-speedometer", text: "Dashboard" },
            module?.EmailTemplateModule?.Read || module?.EmailTemplateModule?.Write
                ? { id: 2, path: "/emailtemplate", icon: "bi-envelope-open-fill", text: "Email Templates" } : {},
            module?.CollectionModule?.Read || module?.CollectionModule?.Write
                ? { id: 3, path: "/collections", icon: "bi bi-collection", text: "Collections" } : {},
            module?.NetworkModule?.Read || module?.NetworkModule?.Write
                ? { id: 4, path: "/network", icon: "bi bi-hdd-network", text: "Network" } : {},
            { id: 5, text: 'Media Limit', icon: "bi bi-asterisk", path: '/media-list' },
            { id: 6, text: 'CSV Samples', icon: "bi bi-asterisk", path: '/csvsample-list' },
            { id: 7, text: 'Country List', icon: "bi bi-asterisk", path: '/country-list' },
            module?.SettingsModule?.Read || module?.SettingsModule?.Write
                ? { id: 8, path: "/settings", icon: "bi bi-bell", text: "Settings" } : {},
        ])
    }, [module])
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    const notificationCards = socketMessage && socketMessage?.slice(0, 4).map((elem, index) => (
        <li key={index}>
            <Link className="dropdown-item" style={{ width: "500px" }}>
                <i className={`me-2 bg-info bi bi-tags`} />
                {elem?.type}

            </Link>
        </li>
    ))

    const logout = () => {
        sessionStorage.removeItem("myToken");
        setTimeout(() => (window.location.href = "/"), 1500);
    }

    // const recharge = async () => {
    //     if (window.ethereum) {
    //         window.web3 = new Web3(window.ethereum);
    //         window.ethereum.enable();
    //         window.ethereum.request({ method: 'eth_requestAccounts' })
    //             .then(async res => {
    //                 await window.web3.eth.sendTransaction({
    //                     from: res[0],
    //                     to: process.env.REACT_APP_ADMIN_ACCOUNT_TESTNET,
    //                     value: window.web3.utils.toWei("0.5", "ether"),
    //                     gas: "21000",
    //                 }).then(rest => {
    //                     getBalance();
    //                 })
    //             })
    //     } else {
    //         alert("install metamask extension!!")
    //     }
    // }

    // setTimeout(() => {
    //     getBalance();
    // }, 100000);
    useEffect(() => {
        socket.on("notificationsnew", (arg) => {
            setSocketMessage(arg?.data, "socket") // world
        });
    }, [socket]);
    return (
        <>
            <header className={`header-area ${stickyClass} dashboard-header px-0 px-sm-0`} >
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">

                        <div className="d-flex align-items-center">
                            {/* Brand Logo */}
                            <div className="admin-logo me-2 me-sm-3">
                            </div>

                            {/* Search Form */}
                            <div className="search-form">
                            </div>
                        </div>

                        {/* Header Meta */}
                        <div className="header-meta d-flex align-items-center">

                            {/* Notification */}
                            <Dropdown className="user-dropdown mx-1 mx-sm-3">
                                <Dropdown.Toggle className="user-btn" id="userDropdown">
                                    <img src={`${process.env.PUBLIC_URL}/img/core-img/notification.png`} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="mt-3 noti-dd-menu" align="end">
                                    {notificationCards}
                                    <li>
                                        <Link
                                            className="dropdown-item justify-content-center"
                                            to="/all-notifications"
                                        >
                                            View all notifications
                                        </Link>
                                    </li>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* User Dropdown */}
                            <Link
                                className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
                                onClick={logout}
                                style={{
                                    position: "relative",
                                    bottom: "0.4rem"
                                }}
                            >
                                Logout
                            </Link>

                            {/* Menu Toggler */}
                            <div
                                className="menu-toggler ms-1 ms-sm-3"
                                onClick={handleToggle}
                            >
                                <i className="bi bi-list" />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className={`admin-sidebar-wrap ${isActive ? "sidebar-active" : "sidebar-disabled"}`} >
                <div className="overflowY-scroll">
                    {/* User Profile */}
                    <div className="user-profile">
                        <div className='Profile-details mb-4'>
                            <div className='d-flex align-items-center flex-wrap justify-content-center'>
                                <img src={setting?.data?.info?.ProjectDetails?.Logo?.CDN} />
                                <h6 className='text-center my-2'><span>{role}</span></h6>
                            </div>
                            <p className='mb-0 text-center'>{loginState?.Email}</p>
                        </div>

                        {/* Balance */}
                        <div className="card shadow mb-5 d-none">
                            <div className="card-body text-center p-4">
                                <h6 className="mb-1">{balanceCard[0].title}</h6>
                                <h5 className="mb-0 text-dark d-flex align-items-center justify-content-center">
                                    <img className="me-1" src={`${process.env.PUBLIC_URL}/${balanceCard[0].icon}`} alt="" />
                                    <span className="counter">{(Number(ether)).toFixed(4)}</span>
                                    <span className="ms-2">BNB</span>
                                </h5>

                                {/* Recharge Button */}
                                {/* <Link
                                    className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
                                    to="#"
                                    onClick={recharge}
                                >
                                    Recharge
                                </Link> */}
                            </div>
                        </div>
                    </div>

                    {/* Sidenav */}
                    <div className="sidenav">
                        <h5>Menu</h5>
                        <ul>
                            {AdminNav.map((elem, index) => {
                                if (Object.keys(elem).length !== 0) {
                                    return (
                                        <li key={index}>
                                            <NavLink to={elem.path} >
                                                <i className={`bi ${elem.icon}`} />
                                                {elem.text}
                                            </NavLink>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                        <div>
                            {menuItems.map((item) => (
                                <div key={item.id}>
                                    <div onClick={() => toggleSubmenu(item.id)} className='my-3 sidemenu-new d-flex justify-content-between'>
                                        <div className='d-flex'>
                                            {item.icon} {item.title}
                                            {console.log("itemTitle:", item.title)}
                                        </div>
                                        <div className=''>
                                            {item.isOpen ? (
                                                <i className="bi bi-chevron-down"></i>
                                            ) : (
                                                <i className="bi bi-chevron-right"></i>
                                            )}
                                        </div>

                                    </div>
                                    {item.isOpen && (
                                        <ul>
                                            {item?.submenus?.map((submenu, index) => {
                                                if (Object.keys(submenu).length !== 0) {
                                                    return (
                                                        <li key={index}>
                                                            <NavLink to={submenu?.link}>
                                                                {submenu.icon} {submenu.title}
                                                                {console.log("submenu:", submenu.title)}
                                                            </NavLink>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}

                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="mt-5" />
                        {/* Copyright Text */}
                        <div className="copywrite-text mt-4" style={{
                            position: "relative",
                            top: "20rem"
                        }}>
                            <p className="mb-0 fz-14">{new Date().getFullYear()} © All rights reserved by
                                <a className="fz-14 ms-1" rel="noreferrer" href="https://themeforest.net/user/designing-world/portfolio" target="_blank">Blue Art</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DashboardHeader;