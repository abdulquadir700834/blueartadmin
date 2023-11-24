import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "./assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-nice-select/css/nice-select.css";
import "./assets/css/bootstrap-icons.css";
import "tiny-slider/dist/tiny-slider.css";
import "./assets/scss/style.scss";
import Dashboard from "./dashboard/Dashboard";
import Category from "./dashboard/Category";
import DashboardCollection from "./dashboard/MyCollection";
import DashboardWallet from "./dashboard/MyWallet";
import DashboardNotification from "./dashboard/Notifications";
import DashboardNotificationDetails from "./dashboard/NotificationDetails";
import DashboardSettings from "./dashboard/Settings";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ExploreOne from "./pages/ExploreOne";
import CreateNew from "./pages/CreateNew";
import AddCategory from "./pages/AddCategory";
import User from "./pages/User";
import UserProfile from "./pages/UserProfile";
import Commision from "./pages/Commision";
import TermsList from "./pages/CMS/TermsAndConditions/TermsList";
import AddTerms from "./pages/CMS/TermsAndConditions/AddTerms";
import EditTerms from "./pages/CMS/TermsAndConditions/EditTerms";
import Item from "./pages/Item";
import ViewItem from "./pages/ViewItem";
import GeneralSettings from "./pages/GeneralSettings";
import HomePageList from "./pages/CMS/HomePageBanner/HomePageList";
import AddHomePageBanner from "./pages/CMS/HomePageBanner/AddHomePageBanner";
import EditHomeBanner from "./pages/CMS/HomePageBanner/EditHomeBanner";
import PrivacyPolicyList from "./pages/CMS/PrivacyAndPolicy/PrivacyPolicyList";
import AddPrivacyPolicy from "./pages/CMS/PrivacyAndPolicy/AddPrivacyPolicy";
import EditPolicy from "./pages/CMS/PrivacyAndPolicy/EditPolicy";
import HelpCenterList from "./pages/CMS/HelpCenter/HelpCenterList";
import AddHelpCenter from "./pages/CMS/HelpCenter/AddHelpCenter";
import EditHelpCenter from "./pages/CMS/HelpCenter/EditHelpCenter";
import Career from "./pages/CMS/Career/Career";
import ArtProductCategory from "./dashboard/ArtProductCategory";
import AddCareer from "./pages/CMS/Career/AddCareer";
import EditCareer from "./pages/CMS/Career/EditCareer";
import Contactus from "./pages/CMS/ContactUs/Contactus";
import AddContactUs from "./pages/CMS/ContactUs/AddContactUs";
import EditContactUs from "./pages/CMS/ContactUs/EditContactUs";
import Blog from "./pages/CMS/Blog/Blog";
import AddBlog from "./pages/CMS/Blog/AddBlog";
import EditBlog from "./pages/CMS/Blog/EditBlog";
import Faq from "./pages/CMS/FAQ/Faq";
import AddFaq from "./pages/CMS/FAQ/AddFaq";
import EditFaq from "./pages/CMS/FAQ/EditFaq";
import SocialMedia from "./pages/CMS/SocialMedia/SocialMedia";
import EmailSettings from "./pages/EmailSettings";
import Offer from "./pages/Offer";
import UpdateUser from "./pages/UpdateUser";
import FooterList from "./pages/CMS/Footer/FooterList";
import AddFooter from "./pages/CMS/Footer/AddFooter";
import EditFooter from "./pages/CMS/Footer/EditFooter";
import EmailTemplate from "./pages/EmailTemplate";
import EditCategory from "./pages/EditCategory";
import EditRole from "./dashboard/EditRole";
import { SocketContext } from "./Helper/HelperContext";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import jwt_decode from "jwt-decode";
import Resetpassword from "./components/authentification/Resetpassword";
import Newpassword from "./components/authentification/NewPassword";
import { useGetSiteSettingsQueryQuery } from "./Store/Store";
import AdminRole from "./dashboard/AdminRole";
import AddRole from "./dashboard/AddRole";
import EmailTemplates from "./dashboard/EmailTemplate";
import EditEmailTemplate from "./dashboard/EditEmailTemplate";
import UserKyc from "./dashboard/UsersKyc";
import Activities from "./dashboard/Activities";
import GetBlockList from "./dashboard/GetBlackList";
import Medium from "./dashboard/Medium";
import AddMedium from "./pages/AddMedium";
import EditMedium from "./pages/EditMedium";
import Style from "./dashboard/Style";
import AddStyle from "./pages/AddStyle";
import EditStyle from "./pages/EditStyle";
import Material from "./dashboard/Material";
import ArtProductMaterial from "./dashboard/ArtProductMaterial";
import ArtProductBrand from "./dashboard/ArtProductBrand";
import ArtProductFabric from "./dashboard/ArtProductFabric";
import ArtProductShape from "./dashboard/ArtProductShape";
import ArtProductStyle from "./dashboard/ArtProductStyle";
import ArtProductSize from "./dashboard/ArtProductSize";
import ArtProductType from "./dashboard/ArtProductType";
import ArtProductTechnique from "./dashboard/ArtProductTechnique";
import AddMaterial from "./pages/AddMaterial";
import AddArtProductMaterial from "./pages/AddArtProductMaterial";
import AddArtProductCategory from "./pages/AddArtProductCategory";
import AddArtProductBrand from "./pages/AddArtProductBrand";
import AddArtProductFabric from "./pages/AddArtProductFabric";
import AddArtProductShape from "./pages/AddArtProductShape";
import AddArtProductStyle from "./pages/AddArtProductStyle";
import AddArtProductTechnique from "./pages/AddArtProductTechnique";
import AddArtProductType from "./pages/AddArtProductType";
import AddArtProductSize from "./pages/AddArtProductSize";
import EditArtProductMaterial from "./pages/EditArtProductMaterial";
import EditArtProductBrand from "./pages/EditArtProductBrand";
import EditArtProductCategory from "./pages/EditArtProductCategory";
import EditArtProductFabric from "./pages/EditArtProductFabric";
import EditArtProductShape from "./pages/EditArtProductShape";
import EditArtProductStyle from "./pages/EditArtProductStyle";
import EditArtProductType from "./pages/EditArtProductType";
import EditArtProductTechnique from "./pages/EditArtProductTechnique";
import EditArtProductSize from "./pages/EditArtProductSize";
import EditMaterial from "./pages/EditMaterial";
import Collections from "./dashboard/Collections";
import EditCollections from "./pages/EditCollections";
import Artwork from "./dashboard/Artwork";
import EditArtwork from "./pages/EditArtwork";
import Network from "./dashboard/Network";
import EditNetwork from "./dashboard/EditNetwork";
import History from "./dashboard/History";
import BidList from "./dashboard/BidList";
import BioList from "./dashboard/BioList";
import EditBioList from "./pages/EditBioList";
import Testimonial from "./dashboard/Testimonial";
import EditTestimonal from "./pages/EditTestimonal";
import Exhibition from "./dashboard/Exhibition";
import EditExhibition from "./pages/EditExhibition";
import Artfair from "./dashboard/Artfair";
import EditArtfair from "./pages/EditArtfair";
import ArtCollection from "./dashboard/ArtCollections";
import EditArtCollection from "./pages/EditArtCollections";
import MediaPublications from "./dashboard/MediaPublications";
import EditMediaPublications from "./pages/EditMediaPublications";
import Landing from "./dashboard/Landing";
import ArtistCategories from "./dashboard/ArtistCategories";
import EditArtistCategories from "./pages/EditArtistCategories";
import AddArtistCategory from "./pages/AddArtistCategory";
import ArtistStyle from "./dashboard/ArtistStyle";
import EditArtistStyle from "./pages/EditArtistStyle";
import AddArtistStyle from "./pages/AddArtistStyle";
import ArtistMedium from "./dashboard/ArtistMedium";
import EditArtistMedium from "./pages/EditArtistMedium";
import AddArtistMedium from "./pages/AddArtistMedium";
import News from "./dashboard/News";
import Features from "./dashboard/Features";
import Teams from "./dashboard/Teams";
import ViewTeams from "./pages/ViewTeams";
import AddTeams from "./pages/AddTeams";
import Events from "./dashboard/Events";
import EditNews from "./pages/EditNews";
import EditFeatures from "./pages/EditFeatures";
import EditEvents from "./pages/EditEvents";
import EditTeams from "./pages/EditTeams";
import AddNews from "./pages/AddNews";
import AddFeatures from "./pages/AddFeatures";
import AddEvents from "./pages/AddEvents";
import NFTBlockchainInfo from "./dashboard/NFTInfo";
import EditNFTBlockchainInfo from "./pages/EditNFTInfo";
import AddNFTBlockchainInfo from "./pages/AddNFTInfo";
import Keyword from "./dashboard/Keyword";
import EditKeyword from "./pages/EditKeyword";
import AddKeyword from "./pages/AddKeyword";
import AllNotifications from "./dashboard/AllNotifications";
import AddAdmin from "./pages/AddAdmin";
import Gift from "./pages/Gift/Gift";
import BulkGift from "./pages/Gift/BulkGift";
import GiftList from "./pages/Gift/GiftList";
import EditGift from "./pages/Gift/EditGift";
import MintGift from "./pages/Gift/MintGift";
import ArtDetails from "./pages/Userpages";
import { useGetOneAdminInfoMutation } from "./Store/Store";
import UserRole from "./dashboard/UserRole";
import EditUserRole from "./pages/EditUserRole";
import EditKyc from "./dashboard/EditKyc";
import ViewKyc from "./dashboard/ViewKycnew";
import ViewEmailTemplate from "./dashboard/ViewEmailTemplate";
import ViewCategory from "./pages/ViewCategory";
import ViewMedium from "./pages/ViewMedium";
import ViewMaterial from "./pages/ViewMaterials";
import ViewArtProductMaterial from "./pages/ViewArtProductMaterial";
import ViewArtProductBrand from "./pages/ViewArtProductBrand";
import ViewArtProductCategory from "./pages/ViewArtProductCategory";
import ViewArtProductFabric from "./pages/ViewArtProductFabric";
import ViewArtProductShape from "./pages/ViewArtProductShape";
import ViewArtProductStyle from "./pages/ViewArtProductStyle";
import ViewArtProductType from "./pages/ViewArtProductType";
import ViewArtProductTechnique from "./pages/ViewArtProductTechnique";
import ViewArtProductSize from "./pages/ViewArtProductSize";
import ViewKeyword from "./pages/ViewKeywords";
import ViewNews from "./pages/ViewNews";
import ViewFeatures from "./pages/ViewFeatures";
import ViewEvents from "./pages/ViewEvents";
import ViewNFTBlockchainInfo from "./pages/ViewNFTInfo";
import ViewStyle from "./pages/ViewStyle";
import DashboardHeader from "./components/dashboard/header/DashboardHeader";
import ViewNetwork from "./dashboard/ViewNetwork";
import ViewUserRole from "./pages/ViewUserRole";
import GiftHistory from "./dashboard/GiftHistory";
import BioListUpdate from "./pages/BioListUpdate";
import ExhibitionUpdate from "./pages/ExhibitionUpdate";
import MediaUpdate from "./pages/MediaPublicationsUpdate";
import TestimonialUpdate from "./pages/TestimonialUpdate";
import NewsAuthor from "./dashboard/NewsAuthor";
import EditNewsAuthor from "./pages/EditNewsAuthor";
import ViewNewsAuthor from "./pages/ViewNewsAuthor";
import AddNewsAuthor from "./pages/AddNewsAuthor";
import CMSPages from "./dashboard/CMSPages";
import ViewCmsPageInfo from "./pages/ViewCmsPageInfo";
import EditCMSPages from "./pages/EditCMSPages";
import ArtProductListing from "./dashboard/ArtProductListing";
import ViewArtProductListing from "./pages/ViewArtProductListing";
import ArtistLabels from "./dashboard/ArtistLabels";
import EditArtistLabels from "./pages/EditArtistLabels";
import AddArtistLabel from "./pages/AddArtistLabel";
import ViewArtistLabel from "./dashboard/ViewArtistLabel";
import BannerScreen from "./dashboard/BannerScreen";
import InnerBannerDetailScreen from "./dashboard/InnerBannerDetailScreen";
import EditBannerScreen from "./dashboard/EditBannerScreen";
import EditInnerBannerScreen from "./dashboard/EditInnerBannerScreen";
import PageDetailsScreen from "./dashboard/PageDetailsScreen";
import BulkArtWorkApproval from "./dashboard/BulkArtWorkApproval";
import MediaList from "./pages/Gift/MediaList";
import EditMediaList from "./pages/Gift/EditMediaList";
import BalanceDetails from "./pages/BalanceDetails";
import WithdrawHistory from "./pages/WithdrawHistory";
import CSVSampleList from "./pages/Gift/CSVSampleList";
import EditCSVSample from "./pages/Gift/EditCSVSample";
import CountryList from "./pages/CountryList";
import NetworkOtpScreen from "./dashboard/NetworkOtpScreen";



function App() {
  const token = sessionStorage.getItem("myToken");
  const userId = sessionStorage.getItem("userId");

  const val = useGetSiteSettingsQueryQuery();
  const [createPost, responseInfo] = useGetOneAdminInfoMutation();
  const [module, setModule] = useState({});
  const [role, Setrole] = useState("");
  const [loginState, setloginState] = useState({});
  console.log(module, "module");
  useEffect(() => {
    function Getdata() {
      const id = sessionStorage.getItem("Id");
      let obj = {
        Id: id,
      };
      createPost(obj)
        .then((response) => {
          setloginState(response.data.info)
          console.log("responsePost:", response.data.roleinfo[0].Modules)
          setModule(response.data.roleinfo[0].Modules);
          Setrole(response.data.roleinfo[0].Role);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    Getdata();
  }, []);

  console.log("valuessite:", val?.data?.info?.ProjectDetails?.ProjectName)
  useEffect(() => {
    document.title = `${val?.data?.info?.ProjectDetails?.ProjectName} Admin`;
}, [val]);

const apiData = {
  faviconUrl: val?.data?.info?.ProjectDetails?.Logo,
};

useEffect(() => {
  // Function to update the favicon
  const updateFavicon = () => {
    const faviconLink = document.querySelector('link[rel="shortcut icon"]');
    if (faviconLink) {
      faviconLink.href = apiData.faviconUrl;
    } else {
      const newFaviconLink = document.createElement('link');
      newFaviconLink.rel = 'shortcut icon';
      newFaviconLink.href = apiData.faviconUrl;
      document.head.appendChild(newFaviconLink);
    }
  };

  // Call the function to update favicon
  updateFavicon();
}, [apiData.faviconUrl]);

  const [address, setAddress] = useState("");
  const [socketMessage, setSocketMessage] = useState("");

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        if (
          Web3.utils.toChecksumAddress(res[0]) ===
          process.env.REACT_APP_ADMIN_ACCOUNT_TESTNET
        ) {
          setAddress(res[0]);
          toast.success("Connected successfully");
          return res[0];
        } else {
          toast.error(
            `Please connect with ${process.env.REACT_APP_ADMIN_ACCOUNT_TESTNET}`
          );
        }
      });
    } else {
      alert("install metamask extension!!");
    }
  };

  if (token !== null) {
    var decoded = jwt_decode(token);
    let currentDate = new Date();
    const expiration = new Date(decoded.iat + 3000);
    console.log(decoded.iat + 3000, "decoded");
    console.log(
      "expiration",
      expiration.getTime(),
      currentDate.getTime() / 1000
    );
    console.log(
      "checked",
      new Date(expiration.getTime()) < new Date(currentDate.getTime() / 1000)
    );
    if (
      new Date(expiration.getTime()) < new Date(currentDate.getTime() / 1000)
    ) {
      sessionStorage?.removeItem("myToken");
      sessionStorage?.removeItem("token");
      toast.success("Session Logout");
      window.location.href = "/";
    } else {
      console.log("Valid token");
    }
  }
  return (
    <div className="App">
      <ToastContainer />
      <SocketContext.Provider value={[socketMessage]}>
        {sessionStorage?.getItem("myToken") ? (
          <DashboardHeader loginState={loginState} setting={val} module={module} role={role} />
        ) : (
          <></>
        )}

        <Routes>
          {sessionStorage?.getItem("myToken") ? (
            <>
              <Route path="/explore1" element={<ExploreOne />} />
              <Route path="/dashboard" element={<Dashboard setting={val} />} />
              <Route
                path="/my-category"
                element={<Category module={module} />}
              />
              <Route path="/user-role" element={<UserRole module={module} />} />
              <Route path="/edit-user-role/:id" element={<EditUserRole />} />
              <Route path="/view-user-role/:id" element={<ViewUserRole />} />
              <Route path="/medium" element={<Medium module={module} />} />
              <Route path="/add-medium" element={<AddMedium />} />
              <Route path="/edit-medium/:id" element={<EditMedium />} />
              <Route path="/view-medium/:id" element={<ViewMedium />} />
              <Route path="/style" element={<Style module={module} />} />
              <Route path="/add-style" element={<AddStyle />} />
              <Route path="/edit-style/:id" element={<EditStyle />} />
              <Route path="/view-style/:id" element={<ViewStyle />} />
              <Route path="/material" element={<Material module={module} />} />
              <Route path="/add-material" element={<AddMaterial />} />
              <Route path="/edit-material/:id" element={<EditMaterial />} />
              <Route path="/view-material/:id" element={<ViewMaterial />} />
              <Route path="/balance-details" element={<BalanceDetails />} />
              <Route path="/withdraw-history" element={<WithdrawHistory />} />
              <Route path="/country-list" element={<CountryList/>}/>
              <Route
                path="/artproductmaterial"
                element={<ArtProductMaterial module={module} />}
              />
              <Route
                path="/add-artproductmaterial"
                element={<AddArtProductMaterial />}
              />
              <Route
                path="/edit-artproductmaterial/:id"
                element={<EditArtProductMaterial />}
              />
              <Route
                path="/view-artproductmaterial/:id"
                element={<ViewArtProductMaterial />}
              />
              <Route
                path="/artproductcategory"
                element={<ArtProductCategory module={module} />}
              />
              <Route
                path="/add-artproductcategory"
                element={<AddArtProductCategory />}
              />
              <Route
                path="/artproductbrand"
                element={<ArtProductBrand module={module} />}
              />
              <Route
                path="/add-artproductbrand"
                element={<AddArtProductBrand />}
              />
              <Route
                path="/edit-artproductbrand/:id"
                element={<EditArtProductBrand />}
              />
              <Route
                path="/edit-artproductcategory/:id"
                element={<EditArtProductCategory />}
              />
              <Route
                path="/view-artproductbrand/:id"
                element={<ViewArtProductBrand />}
              />
              <Route
                path="/view-artproductcategory/:id"
                element={<ViewArtProductCategory />}
              />
              <Route
                path="/artproductfabric"
                element={<ArtProductFabric module={module} />}
              />
              <Route
                path="/add-artproductfabric"
                element={<AddArtProductFabric />}
              />
              <Route
                path="/edit-artproductfabric/:id"
                element={<EditArtProductFabric />}
              />
              <Route
                path="/view-artproductfabric/:id"
                element={<ViewArtProductFabric />}
              />
              <Route
                path="/artproducttype"
                element={<ArtProductType module={module} />}
              />
              <Route
                path="/add-artproducttype"
                element={<AddArtProductType />}
              />
              <Route
                path="/edit-artproducttype/:id"
                element={<EditArtProductType />}
              />
              <Route
                path="/view-artproducttype/:id"
                element={<ViewArtProductType />}
              />
              <Route
                path="/artproducttechnique"
                element={<ArtProductTechnique module={module} />}
              />
              <Route
                path="/add-artproducttechnique"
                element={<AddArtProductTechnique />}
              />
              <Route
                path="/edit-artproducttechnique/:id"
                element={<EditArtProductTechnique />}
              />
              <Route
                path="/view-artproducttechnique/:id"
                element={<ViewArtProductTechnique />}
              />
              <Route
                path="/artproductlisting"
                element={<ArtProductListing />}
              />
              <Route
                path="/artproductlisting-more-info/:id"
                element={<ViewArtProductListing />}
              />
              <Route
                path="/artproductshape"
                element={<ArtProductShape module={module} />}
              />
              <Route
                path="/add-artproductshape"
                element={<AddArtProductShape />}
              />
              <Route
                path="/edit-artproductshape/:id"
                element={<EditArtProductShape />}
              />
              <Route
                path="/view-artproductshape/:id"
                element={<ViewArtProductShape />}
              />
              <Route
                path="/artproductsize"
                element={<ArtProductSize module={module} />}
              />
              <Route
                path="/add-artproductsize"
                element={<AddArtProductSize />}
              />
              <Route
                path="/edit-artproductsize/:id"
                element={<EditArtProductSize />}
              />
              <Route
                path="/view-artproductsize/:id"
                element={<ViewArtProductSize />}
              />
              <Route path="/bulkartwork-approval" element={<BulkArtWorkApproval />} />
              <Route
                path="/artproductstyle"
                element={<ArtProductStyle module={module} />}
              />
              <Route
                path="/add-artproductstyle"
                element={<AddArtProductStyle />}
              />
              <Route
                path="/edit-artproductstyle/:id"
                element={<EditArtProductStyle />}
              />
              <Route
                path="/view-artproductstyle/:id"
                element={<ViewArtProductStyle />}
              />
              <Route path="/artist-categories" element={<ArtistCategories />} />
              <Route
                path="/edit-artist/:id"
                element={<EditArtistCategories />}
              />
              <Route path="/add-artist" element={<AddArtistCategory />} />
              <Route path="/artist-style" element={<ArtistStyle />} />
              <Route
                path="/edit-artist-style/:id"
                element={<EditArtistStyle />}
              />
              <Route path="/add-artist-style" element={<AddArtistStyle />} />
              <Route path="/artist-label" element={<ArtistLabels />} />
              <Route path="/edit-artist-label/:id" element={<EditArtistLabels />} />
              <Route path="/add-artist-label" element={<AddArtistLabel />} />
              <Route path="/view-artist-label/:id" element={<ViewArtistLabel />} />
              <Route path="/artist-medium" element={<ArtistMedium />} />
              <Route
                path="/edit-artist-medium/:id"
                element={<EditArtistMedium />}
              />
              <Route path="/add-artist-medium" element={<AddArtistMedium />} />
              <Route path="/all-notifications" element={<AllNotifications />} />
              <Route path="/keyword" element={<Keyword module={module} />} />
              <Route path="/edit-keyword/:id" element={<EditKeyword />} />
              <Route path="/view-keyword/:id" element={<ViewKeyword />} />
              <Route path="/add-keyword" element={<AddKeyword />} />
              <Route path="/news" element={<News module={module} />} />
              <Route path="/edit-news/:id" element={<EditNews />} />
              <Route path="/view-news/:id" element={<ViewNews />} />
              <Route path="/add-news" element={<AddNews />} />
              <Route path="/features" element={<Features module={module} />} />
              <Route path="/view-features/:id" element={<ViewFeatures />} />
              <Route path="/edit-features/:id" element={<EditFeatures />} />
              <Route path="/add-features" element={<AddFeatures />} />
              <Route path="/teams" element={<Teams module={module} />} />
              <Route path="/view-teams/:id" element={<ViewTeams />} />
              <Route path="/add-teams" element={<AddTeams />} />
              <Route path="/edit-teams/:id" element={<EditTeams />} />
              <Route path="/events" element={<Events module={module} />} />
              <Route path="/view-events/:id" element={<ViewEvents />} />
              <Route path="/add-events" element={<AddEvents />} />
              <Route path="/edit-events/:id" element={<EditEvents />} />
              <Route
                path="/news-author"
                element={<NewsAuthor module={module} />}
              />
              <Route
                path="/edit-news-author/:id"
                element={<EditNewsAuthor />}
              />
              <Route
                path="/view-news-author/:id"
                element={<ViewNewsAuthor />}
              />
              <Route path="/add-news-author" element={<AddNewsAuthor />} />
              <Route
                path="/nft-info"
                element={<NFTBlockchainInfo module={module} />}
              />
              <Route
                path="/cms-pages"
                element={<CMSPages module={module} />}
              />
              <Route
                path="/view-cms-info/:id"
                element={<ViewCmsPageInfo />}
              />
              <Route
                path="/edit-cms-info/:id"
                element={<EditCMSPages />}
              />
              <Route path="/page-details"
                element={<PageDetailsScreen />} />

              <Route path="/banner"
                element={<BannerScreen />} />

              <Route path="/edit-banner/:key/:cdn"
                element={<EditBannerScreen />}
              />

              <Route path="/inner-banner"
                element={<InnerBannerDetailScreen />} />

              <Route path="/edit-inner-banner/:key/:cdn"
                element={<EditInnerBannerScreen />} />

              <Route
                path="/edit-nft-info/:id"
                element={<EditNFTBlockchainInfo />}
              />
              <Route
                path="/view-nft-info/:id"
                element={<ViewNFTBlockchainInfo />}
              />
              <Route path="/add-nft-info" element={<AddNFTBlockchainInfo />} />
              <Route
                path="/collections"
                element={<Collections module={module} />}
              />
              <Route
                path="/collection-more-info/:id"
                element={<EditCollections />}
              />
              <Route path="/artwork" element={<Artwork module={module} />} />
              <Route path="/artwork-more-info/:id" element={<EditArtwork />} />
              <Route path="/network" element={<Network module={module} />} />
              <Route path="/network-edit/:id" element={<EditNetwork />} />
              <Route path="/network-verify-otp/:id" element={<NetworkOtpScreen/>}/>
              <Route path="/network-view/:id" element={<ViewNetwork />} />
              <Route path="/history" element={<History module={module} />} />
              <Route path="/landing" element={<Landing module={module} />} />
              <Route path="/bid-list" element={<BidList module={module} />} />
              <Route path="/bio-list" element={<BioList module={module} />} />
              <Route path="/bio-list-info/:id" element={<EditBioList />} />
              <Route path="/update-bio-list/:id" element={<BioListUpdate />} />
              <Route
                path="/testimonial"
                element={<Testimonial module={module} />}
              />
              <Route
                path="/testimonial-list-info/:id"
                element={<EditTestimonal />}
              />
              <Route
                path="/update-testimonial/:id"
                element={<TestimonialUpdate />}
              />
              <Route
                path="/exhibition"
                element={<Exhibition module={module} />}
              />
              <Route
                path="/exhibition-list-info/:id"
                element={<EditExhibition />}
              />
              <Route
                path="/update-exhibition/:id"
                element={<ExhibitionUpdate />}
              />
              <Route path="/artfair" element={<Artfair module={module} />} />
              <Route path="/artfair-list-info/:id" element={<EditArtfair />} />
              <Route
                path="/artcollection"
                element={<ArtCollection module={module} />}
              />
              <Route
                path="/artcollection-list-info/:id"
                element={<EditArtCollection />}
              />
              <Route
                path="/media-publications"
                element={<MediaPublications module={module} />}
              />
              <Route
                path="/media-publications-list-info/:id"
                element={<EditMediaPublications />}
              />
              <Route path="/update-media/:id" element={<MediaUpdate />} />
              <Route path="/role-admin" element={<AdminRole />} />
              <Route path="/addRoleAdmin" element={<AddRole />} />
              <Route path="/edit-role/:id" element={<EditRole />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/view-category/:id" element={<ViewCategory />} />
              <Route path="/edit-admin/:id" element={<UpdateUser />} />
              <Route
                path="/my-collection"
                element={
                  <DashboardCollection
                    connectWallet={connectWallet}
                    address={address}
                  />
                }
              />
              <Route path="/my-wallet" element={<DashboardWallet />} />
              <Route
                path="/notifications"
                element={<DashboardNotification data={socketMessage} />}
              />
              <Route
                path="/notification-details/:NOTIFYID"
                element={<DashboardNotificationDetails />}
              />
              <Route
                path="/settings"
                element={<DashboardSettings setting={val} module={module} />}
              />
              <Route path="/create-new" element={<CreateNew />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/update-category/:id" element={<AddCategory />} />
              <Route path="/user" element={<User />} />
              <Route path="/user-profile/:id" element={<UserProfile />} />
              <Route path="/commision" element={<Commision />} />
              <Route path="/terms-list" element={<TermsList />} />
              <Route path="/terms-list/addTerms" element={<AddTerms />} />
              <Route path="/terms-list/editTerms/:id" element={<EditTerms />} />
              <Route path="/items-list" element={<Item />} />
              <Route path="/items-list/viewItem/:id" element={<ViewItem />} />
              <Route path="/get-settings" element={<GeneralSettings />} />
              <Route path="/homepage-list" element={<HomePageList />} />
              <Route
                path="/homepage-list/addBanner"
                element={<AddHomePageBanner />}
              />
              <Route
                path="/homepage-list/editBanner/:id"
                element={<EditHomeBanner />}
              />
              <Route
                path="/privacy-policy-list"
                element={<PrivacyPolicyList />}
              />
              <Route
                path="/privacy-policy-list/addPolicy"
                element={<AddPrivacyPolicy />}
              />
              <Route
                path="/privacy-policy-list/editPolicy/:id"
                element={<EditPolicy />}
              />
              <Route path="/help-center-list" element={<HelpCenterList />} />
              <Route
                path="/help-center-list/addHelpCenter"
                element={<AddHelpCenter />}
              />
              <Route
                path="/help-center-list/editHelpCenter/:id"
                element={<EditHelpCenter />}
              />
              <Route path="/career" element={<Career />} />
              <Route path="/career/addCareer" element={<AddCareer />} />
              <Route path="/career/editCareer/:id" element={<EditCareer />} />
              <Route path="/contact-us" element={<Contactus />} />
              <Route
                path="/contact-us/addContactUs"
                element={<AddContactUs />}
              />
              <Route
                path="/contact-us/editContactUs/:id"
                element={<EditContactUs />}
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/addBlog" element={<AddBlog />} />
              <Route path="/blog/editBlog/:id" element={<EditBlog />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/faq/addFaq" element={<AddFaq />} />
              <Route path="/faq/editFaq/:id" element={<EditFaq />} />
              <Route path="/social-media" element={<SocialMedia />} />
              <Route path="/email-settings" element={<EmailSettings />} />
              <Route path="/offer-list" element={<Offer module={module} />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/footerList" element={<FooterList />} />
              <Route path="/footer/addFooter" element={<AddFooter />} />
              <Route path="/footer/editFooter/:id" element={<EditFooter />} />
              <Route
                path="/emailtemplate"
                element={<EmailTemplates module={module} />}
              />
              <Route
                path="/emailtemplate/:id"
                element={<EditEmailTemplate />}
              />
              <Route
                path="/view-email-template/:id"
                element={<ViewEmailTemplate />}
              />
              <Route path="/email-template" element={<EmailTemplate />} />
              <Route
                path="/email-template/:id"
                element={<EditEmailTemplate />}
              />
              <Route path="/userkyc" element={<UserKyc module={module} />} />
              <Route path="/editKyc/:id" element={<EditKyc />} />
              <Route path="/viewKyc/:id" element={<ViewKyc />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/getBlackList" element={<GetBlockList />} />
              <Route path="/gift" element={<GiftList />} />
              <Route path="/gift-history" element={<GiftHistory />} />
              <Route path="/media-list" element={<MediaList />} />
              <Route path="/edit-media/:id" element={<EditMediaList />} />
              <Route path="/create-gift" element={<Gift />} />
              <Route path="/create-bulk-gift" element={<BulkGift />} />
              <Route path="/single-gift/:id" element={<EditGift />} />
              <Route path="/single-gift-mint/:id" element={<MintGift />} />
              <Route path="/single-artwork/:id" element={<ArtDetails />} />
              <Route path="/csvsample-list" element={<CSVSampleList />} />
              <Route path="/edit-csvsample/:id" element={<EditCSVSample />} />
              <Route path="/add-admin" element={<AddAdmin />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route path="/verifyotp" element={<Resetpassword />} />
              <Route path="/reset-password/:id" element={<Newpassword />} />
            </>
          )}
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
