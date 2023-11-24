import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Banner from './Banner';
import img1 from "../../assets/art/4 1.png"
import img2 from "../../assets/art/view in room.png"
import Profile from "../../assets/art/portrait-2017 1.png";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import './css/Art.css'
import iconOne from "../../assets/art/Digital art1-01.png"
import iconTwo from "../../assets/art/NFT1 -01.png"

import banner from "../../assets/art/Charcoal-Sketch 2.png"
import ProfileIcon from "../../assets/art/profile.png"
import Modal from 'react-bootstrap/Modal';
import ModalImg from "../../assets/modal/Charcoal-Sketch 2.png"
import ModalProfile from "../../assets/modal/portrait-2017 1.png"
import axios from 'axios';
import {
    useGetItemInfoMutation,
    useItemPublishMutation,
    useUpdateItemMutation,
    useSellItemMutation,
    useAddtoCartMutation,
    useMakeOfferMutation,
    useOfferlistBasedItemMutation,
    useAcceptOfferMutation,
    useItemOwnerListMutation,
    useItemHistoryListMutation,
    useSellNFTMutation,
    useAddBidMutation
} from "../../service/Apilist"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import Header from "../../components/header/Header"
import Footer from "./Footer/index"
const Web3 = require('web3');
const UserId = sessionStorage.getItem("UserId")
function ArtDetails(props) {
    let navigate = useNavigate()
    const [artist, setArtist] = useState(1);
    const [show, setShow] = useState(false);
    const [showbid, setShowbid] = useState(false);
    const [offerSale, setOfferSale] = useState(false);
    const [bidSale, setBidSale] = useState(false);
    const [iteminfostate, setiteminfostate] = useState([]);
    const [offerState, setofferState] = useState([]);
    const [ownerState, setownerState] = useState([]);
    const [hitoryState, sethitoryState] = useState([]);
    const [showSell, setShowSell] = useState(false);
    const [apiLoading, setAPILoading] = useState(false);
    const [mintLoadint, setmintLoadint] = useState(false);
    const [viewRoom, setViewRoom] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlebidClose = () => setShowbid(false);
    const handlebidShow = () => setShowbid(true);
    const handleSellClose = () => setShowSell(false);
    const handleSellShow = () => setShowSell(true);
    const [itemDetailState, setitemDetails] = useState({});
    const [widthState, setWidthState] = useState(0);
    const [heightState, setHeightState] = useState(0);
    const [sizeState, setsizeState] = useState("");
    const [value, onChange] = useState([new Date(), new Date()]);
    const parms = useParams();
    const [getAllItemInfo, resAllItemInfo] = useGetItemInfoMutation();
    const [pusblishAPI, resPublishAPI] = useItemPublishMutation();
    const [updateItemAPI, resupdateItemAPI] = useUpdateItemMutation();
    const [sellitemAPI, ressellItemAPI] = useSellItemMutation();
    const [addTocartAPI, resaddTocartAPI] = useAddtoCartMutation();
    const [makeOffer, resmakeOfferAPI] = useMakeOfferMutation();
    const [OfferList, resOfferListAPI] = useOfferlistBasedItemMutation();
    const [acceptOffer, resacceptOfferAPI] = useAcceptOfferMutation();
    const [ownerlistAPI, resownerlistAPI] = useItemOwnerListMutation();
    const [historylistAPI, reshistorylistAPI] = useItemHistoryListMutation();
    const [sellNFTAPI, ressellNFTAPI] = useSellNFTMutation();
    const [BidAPI, resBidAPI] = useAddBidMutation();

    const showToast = (text) => {
        toast.success(text)
    }
    const showErroToast = (text) => {
        toast.error(text);
    }
    useEffect(() => {
        getAllItemInfo({
            ItemId: parms.id
        })
        OfferList({
            ItemId: parms.id
        })
        ownerlistAPI({
            ItemId: parms.id
        })
        historylistAPI({
            ItemId: parms.id
        })
    }, [])
    useEffect(() => {
        console.log("resAllItemInfo?.data?.data[0]", resAllItemInfo);
        setAPILoading(true)
        if (resAllItemInfo?.status === "fulfilled") {
           
            if (resAllItemInfo?.data?.status) {
              
                setitemDetails(resAllItemInfo?.data?.data[0]);
                
                setsizeState(resAllItemInfo?.data?.data[0]?.ItemInfo?.Dimension);
                setHeightState(resAllItemInfo?.data?.data[0]?.ItemInfo?.Height);
                setWidthState(resAllItemInfo?.data?.data[0]?.ItemInfo?.Width);
                setAPILoading(false)
            
            }
        }
    }, [resAllItemInfo])
    
    useEffect(() => {
        setAPILoading(true)
        if (resOfferListAPI?.status === "fulfilled") {
            if (resOfferListAPI?.data?.status) {
                setofferState(resOfferListAPI?.data?.data);
                setAPILoading(false)
            }
        }
    }, [resOfferListAPI?.status])
    useEffect(() => {
        setAPILoading(true)
        if (resownerlistAPI?.status === "fulfilled") {
            if (resownerlistAPI?.data?.status) {
                setownerState(resownerlistAPI?.data?.data);
                setAPILoading(false)
            }
        }
    }, [resownerlistAPI?.status])
    useEffect(() => {
        setAPILoading(true)
        if (reshistorylistAPI?.status === "fulfilled") {
            if (reshistorylistAPI?.data?.status) {
                sethitoryState(reshistorylistAPI?.data?.data);
                setAPILoading(false)
            }
        }
    }, [reshistorylistAPI?.status])


    async function switchNetwork(networkId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networkId }],
            });
            return true;
        } catch (error) {
            setAPILoading(false)
            if (error?.code === 4001) {
                toast.warning(error?.message)
            }
            console.log(error);
        }
    }
    const mint = async (contractAddress, id, authorId) => {
        setmintLoadint(true);
        let web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_CONTRACT_ABI), contractAddress);

        let TokenId = await contractInstance.methods.lastTokenId().call();}

    const mintItem = (chain, contractAddress, id, authorId) => {
        axios.post(`${process.env.REACT_APP_API_URL}/GetNetworkInfo`, {
            "Currency": chain
        }).then(async res => {
            let web3 = new Web3(window.ethereum);
            let chainId = await web3.eth.getChainId();
            if (chainId === res.data?.info?.ChainID) {
                mint(contractAddress, id, authorId)
            } else {
                switchNetwork(web3.utils.numberToHex(res.data?.info?.ChainID)).then(switchRes => {
                    if (switchRes) {
                        mint(contractAddress, id, authorId)
                    }
                })
            }
        })
    }


    const OverViewArt = () => {
        return (
            <div className='bottom-details'>
                <p className='artworkInformation'>artwork information</p>
                <div className='lineFour'>
                </div>
                <div>
                    <p className='artHeading'>Description</p>
                    <p className='artDescription'>{itemDetailState?.ItemInfo?.Description}</p>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <p className="packing">SIZE</p>
                            <p className='packingText'>{itemDetailState?.ItemInfo?.Size}</p>
                        </div>
                        <div className='col-lg-6'>
                            <p className="packing">MEDIUM</p>
                            <p className='packingText'>{itemDetailState?.ItemInfo?.Medium}</p>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <p className="packing">ORIENTATION</p>
                            <p className='packingText'>{itemDetailState?.ItemInfo?.Orientation}</p>
                        </div>
                        <div className='col-lg-6'>
                            <p className="packing">SUBJECT</p>
                            <p className='packingText'>{itemDetailState?.ItemInfo?.Styles}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const BidsArt = () => {
        return (
            <div className='container'>
                <div className='d-flex justify-content-start'>
                    <i className="fas fa-bars fx-2 mx-2"></i>
                    <p className='artName'>Item Activity</p>
                </div>
                <div className='row'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Event</th>
                                <th>Unit Price</th>
                                <th>Currency</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ownerState?.length > 0 && ownerState.map((owner, index) => {
                                return (<tr>
                                    <td>{index + 1}</td>
                                    <td>{owner?.HistoryInfo?.HistoryType}</td>
                                    <td>{owner?.HistoryInfo?.Price}</td>
                                    <td>{owner?.CollectionInfo?.Currency}</td>
                                    <td>{owner?.FromInfo?.ProfileName}</td>
                                    <td>{owner?.ToInfo?.ProfileName}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
    const AcceptOfferNFT = (id) => {
        acceptOffer({
            OfferId: id,
            Status: "Accepted"
        }).then(res => {
            if (res?.data?.status) {
                showToast(res?.data?.message)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } else {
                showErroToast(res?.data?.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }
        })
    }
    const OwnerArt = () => {
        return (
            <div className='container '>
                <div className='d-flex justify-content-start'>
                    <i className="fas fa-bars fx-2 mx-2"></i>
                    <p className='artName'>Offers</p>
                </div>
                <div className='row' >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Price</th>
                                <th>Currency</th>
                                <th>Status</th>
                                {sessionStorage.getItem("UserId") === itemDetailState?.ItemInfo?.AuthorId ? <th>Action</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {offerState.length > 0 && offerState.map((offer, index) => {
                                return (<tr>
                                    <td>{index + 1}</td>
                                    <td>{offer?.SenderInfo?.ProfileName}</td>
                                    <td>{offer?.OfferInfo?.Price}</td>
                                    <td>{itemDetailState?.ItemInfo?.Currency}</td>
                                    <td>{offer?.OfferInfo?.Status}</td>
                                    {sessionStorage.getItem("UserId") === itemDetailState?.ItemInfo?.AuthorId ?
                                        <td>
                                            {offer?.OfferInfo?.Status === "Pending" ? <button className='btn btn-success accept-offer' onClick={() => AcceptOfferNFT(offer?.OfferInfo?._id)}>Accept</button> : null}
                                        </td>
                                        : null}
                                </tr>)
                            })}
                            {offerState.length === 0 ? <tr><td colSpan="6">No Offers</td></tr> : null}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    const HistoryArt = () => {
        return (

            <div className='container '>
                <div className='d-flex justify-content-start'>
                    <p>Histroy</p>
                </div>
                {hitoryState.length > 0 && hitoryState.map((history, index) => {
                    return (
                        <div className='row' >
                            <div className='history'>
                                <img src={ProfileIcon} ></img>
                                <div className='row historyDetails'>
                                    <p><span>{history?.ToInfo?.ProfileName}</span>{history?.HistoryInfo?.HistoryType}</p>
                                    <p>{new Date(history?.HistoryInfo?.createdAt).toISOString()}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    const CartAdd = (ItemId) => {
        addTocartAPI({
            ItemId: ItemId
        }).then(res => {
            showToast(res.data.message)
            props.cartCOuntUpdate()
        })
    }
    const itemStatus = (mintStatus, listStatus) => {
        switch (true) {
            case mintStatus && listStatus:
                return (props.loginState && sessionStorage.getItem("UserId") !== itemDetailState?.OwnerInfo?.Id && <div className='box_Art'>
                    <p className='box_Art_text'>Price</p>
                    <div className='one'>
                        <p className='box_Art_textTwo'>{itemDetailState?.ItemInfo?.Currency} {itemDetailState?.ItemInfo?.Price}</p>
                        <button className='oneBtn'>EURO</button>
                    </div>
                    <div className='one'>
                        {itemDetailState?.ItemInfo?.EnableAuctionStatus &&
                            <>
                                {new Date().getTime() < new Date(itemDetailState?.ItemInfo?.EndDateTimeUtc).getTime() ? <button className='btnOffer' onClick={handleShow} >MAKE AN OFFER</button> : null}
                            </>
                        }
                        {itemDetailState?.ItemInfo?.EnableAuctionStatus ? offerState.length > 0 && offerState.map((offer, index) => {
                            if (offer?.OfferInfo?.Status === "Accepted" && offer?.OfferInfo?.Sender === sessionStorage.getItem("UserId")) {
                                return <button className='cartOffer' onClick={() => CartAdd(itemDetailState?.ItemInfo?._id)} >Add to cart</button>
                            }
                        }) : null}
                        {itemDetailState?.ItemInfo?.EnableBidStatus && <>
                            {new Date().getTime() < new Date(itemDetailState?.ItemInfo?.EndDateTimeUtcBID).getTime() ? <button className='btnOffer' onClick={handlebidShow} >MAKE A BID</button> : null}
                        </>
                        }
                        {!itemDetailState?.ItemInfo?.EnableBidStatus && !itemDetailState?.ItemInfo?.EnableAuctionStatus && <button className='cartOffer' onClick={() => CartAdd(itemDetailState?.ItemInfo?._id)} >Add to cart</button>}
                    </div>
                  
                    <p className='box_artPara'>Shipping and taxes calculated at checkout
                        This Artwork is shipping from australia</p>
                </div>);
            case mintStatus:
                return (props.loginState && sessionStorage.getItem("UserId") === itemDetailState?.OwnerInfo?.Id && <div className='box_Art sell'>
                    <div className='one'>
                        <button className='btnOffer' onClick={handleSellShow} >SELL</button>
                    </div>

                </div>);
            case !mintStatus && !listStatus:
                return (props.loginState && sessionStorage.getItem("UserId") === itemDetailState?.ItemInfo?.AuthorId ? <div className='box_Art mintOnly'>
                    <div className='one'>
                    </div>
                    <div className='one'>
                        {props.loginState && sessionStorage.getItem("UserId") === itemDetailState?.ItemInfo?.AuthorId && <button disabled={mintLoadint} className='btnOffer' onClick={() => mintItem(itemDetailState?.ItemInfo?.Currency, itemDetailState?.CollectionInfo?.ContractAddress, itemDetailState.ItemInfo?._id, itemDetailState.ItemInfo?.AuthorId)}> {mintLoadint ? <>&nbsp;MINTING.....&nbsp; </> : <>&nbsp;MINT&nbsp;</>} </button>}
                    </div>
                </div> : null);
        }
    }
    const listNFT = async (contractAddress, id, itemId) => {
        let web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_CONTRACT_ABI), contractAddress);
        let account = await web3.eth.getAccounts();
        try {
            let approve = await contractInstance.methods.putforsale().send({
                from: account[0],
            })
            if (approve) {
                sellitemAPI({
                    "ItemId": itemId,
                    "TransactionHash": approve?.transactionHash
                }).then(res => {
                    setAPILoading(false)
                    window.location.replace("/art")
                })
            }
        } catch (error) {
            console.log("error", error);
            setAPILoading(false)
            if (error?.code === 4001) {
                toast.warning(error?.message)
            }
        }

    }
    const approveAll = async (chain, contractAddress, id, itemId) => {
        let web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_CONTRACT_ABI), contractAddress);
        let account = await web3.eth.getAccounts()
        if (props.isWalletConnected) {
            axios.post(`${process.env.REACT_APP_API_URL}/GetNetworkInfo`, {
                "Currency": chain
            }).then(async res => {
                let web3 = new Web3(window.ethereum);
                let chainId = await web3.eth.getChainId();
                if (chainId === res.data?.info?.ChainID) {
                    listNFT(contractAddress, id, itemId)
                } else {
                    switchNetwork(web3.utils.numberToHex(res.data?.info?.ChainID)).then(async switchRes => {
                        if (switchRes) {
                            listNFT(contractAddress, id, itemId)
                        }
                    })
                }
            })
        } else {
            showErroToast("please connect you wallet");
        }

    }
    const validationSchema = Yup.object().shape({
        price: Yup.number().required("Item price is required").test(
            'Is positive?',
            'Price must be greater than 0!',
            (value) => value > 0
        ),
        Offer: Yup.boolean(),
        Bid: Yup.boolean(),
    });

    const formik = useFormik({
        initialValues: {
            Offer: false,
            Bid: false,
            price: 0,
            bidSale: false,
            offerSale: false
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            if (!props?.isWalletConnected || !props?.isWalletConnected === undefined) {
                navigate("/connect-wallet");
            }
            setAPILoading(true)
            let formValue = {
                Price: values.price,
                EnableBid: values.bidSale,
                EnableAuction: values.offerSale,
                TimeZone: value.toString(),
                ItemId: itemDetailState?.ItemInfo?._id
            }
            if (values.offerSale) {
                formValue.DateRange = value;
            } else if (values.bidSale) {
                formValue.DateRange = value;
            }
            sellNFTAPI(formValue).then(res => {
                if (res.data.status) {
                    approveAll(itemDetailState?.ItemInfo?.Currency, itemDetailState?.CollectionInfo?.ContractAddress, itemDetailState.ItemInfo?.TokenId, itemDetailState.ItemInfo?._id).then(res => {
                    })
                } else {
                    setAPILoading(false)
                    showErroToast(res.data.message)
                }
            }).catch(err => {
                setAPILoading(false)
            })
        },
    });
    const validationOfferSchema = Yup.object().shape({
        price: Yup.number().required("Item price is required").test(
            'Is positive?',
            'Price must be greater than 0!',
            (value) => value > 0
        ),
    });
    const formikOffer = useFormik({
        initialValues: {
            price: 0,
            message: ""
        },
        enableReinitialize: true,
        validationSchema: validationOfferSchema,
        onSubmit: values => {
            if (!props?.isWalletConnected || !props?.isWalletConnected === undefined) {
                showErroToast('Please connect your wallet')
                setTimeout(() => {
                    navigate("/connect-wallet");
                }, 1000);
            }
            setAPILoading(true)
            let formValue = {
                Price: values.price,
                ItemId: itemDetailState?.ItemInfo?._id,
                Message: values.message
            }
            makeOffer(formValue).then(res => {
                if (res.data.status) {
                    showToast(res.data.message);
                } else {
                    setAPILoading(false)
                    showErroToast(res.data.message)
                }
                handleClose()
            }).catch(err => {
                setAPILoading(false)
            })
        },
    });
    const validationBidSchema = Yup.object().shape({
        price: Yup.number().required("Item price is required").test(
            'Is positive?',
            'Price must be greater than 0!',
            (value) => value > 0
        ),
    });
    const bidAmount = async (chain, amount,formValue) => {
        let web3 = new Web3(window.ethereum);
        let account = await web3.eth.getAccounts()
        if (props.isWalletConnected) {
            axios.post(`${process.env.REACT_APP_API_URL}/GetNetworkInfo`, {
                "Currency": chain
            }).then(async res => {
                console.log("res", res);
                const contract = new web3.eth.Contract(JSON.parse(res.data?.info?.MultiAbiArray), res.data?.info?.MultiContract);
                const transactionObject = {
                    from: account[0],
                    to: res.data?.info?.MultiContract,
                    value: web3.utils.toWei(amount.toString(), 'ether'),
                    gas: 210000, // Gas limit for a basic Ether transfer                    
                };

                try {
                    let transactionHash = await web3.eth.sendTransaction(transactionObject);
                    if (transactionHash) {
                        BidAPI(formValue).then(res => {
                            if (res.data.status) {
                                showToast(res.data.message);
                            } else {
                                setAPILoading(false)
                                showErroToast(res.data.message)
                            }
                            handlebidClose()
                        }).catch(err => {
                            setAPILoading(false)
                        })
                    }

                } catch (error) {
                    console.log("error", error);
                }

            })
        } else {
            showErroToast("please connect you wallet");
        }
    }
    const formikBid = useFormik({
        initialValues: {
            price: 0,
            message: ""
        },
        enableReinitialize: true,
        validationSchema: validationBidSchema,
        onSubmit: values => {
            if (!props?.isWalletConnected || !props?.isWalletConnected === undefined) {
                showErroToast('Please connect your wallet')
                setTimeout(() => {
                    navigate("/connect-wallet");
                }, 1000);
            }
            setAPILoading(true)
            let formValue = {
                Price: values.price,
                ArtworkId: itemDetailState?.ItemInfo?._id,
                Message: values.message
            }
            bidAmount(itemDetailState?.ItemInfo?.Currency, values.price, formValue);           
        },
    });
    var mooving = false;
    const [xState, setXstate] = useState(0);
    const [yState, setYstate] = useState(0);
    function move(e) {
        var newX = e.clientX - 225;
        var newY = e.clientY - 100;
        setXstate(newX);
        setYstate(newY);
    }

    function initialClick(e) {
        if (mooving) {
            document.removeEventListener("mousemove", move);
            mooving = false;
            return;
        }
        mooving = true
        document.addEventListener("mousemove", move, false);
    }

    useEffect(() => {
        var dog = document.getElementById("moovablepic");
        dog.addEventListener("mousedown", initialClick, false);
    }, [])
    const socketMint = async (data) => {
        let web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_CONTRACT_ABI), data.contractAddress);
        let account = await web3.eth.getAccounts();
        let TokenId = await contractInstance.methods.lastTokenId().call();
        try {
            let mint = await contractInstance.methods.mint(data?.edition, data?.ipfsHash, "0x00").send({
                from: account[0]
            });
            if (mint) {
               
            }
        } catch (error) {
            console.log("error", error)
            setmintLoadint(false);
            showErroToast(error?.message)
        }

    }
    function inchesToCentimeters(inches) {
        return inches * 2.54;
    }
    function centimetersToInches(centimeters) {
        return centimeters / 2.54;
    }
    const changeSize = (Dim, Hei, Wid, toSize) => {
        console.log("Dim,Hei,toSize", Dim, Hei, toSize);
        setsizeState(toSize)
        if (toSize === 'CM') {
            if (Dim !== toSize) {
                let height = inchesToCentimeters(Hei);
                let width = inchesToCentimeters(Wid);
                setHeightState(height);
                setWidthState(width);
            } else {
                setHeightState(Hei);
                setWidthState(Wid)
            }
        } else if (toSize === "IN") {
            if (Dim !== toSize) {
                let height = centimetersToInches(Hei);
                let width = centimetersToInches(Wid);
                setHeightState(height);
                setWidthState(width)
            } else {
                setHeightState(Hei);
                setWidthState(Wid)
            }
        }
    }
    const renderItems = (quantity) => {
        const renderedItems = [];
        for (let i = 0; i < quantity; i++) {
            renderedItems.push(<option key={i}>{i + 1 + ' / 1'}</option>);
        }
        return renderedItems;
    };
    return (
        <div className='login-as-user' style={{backgroundColor: "white"}}>
            <Header/>            
            <Banner></Banner>
            <Container >
                <div className='row'>
                    <div className='col-lg-1 d-flex justify-content-center'>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img src={img2} onClick={() => setViewRoom(!viewRoom)} className="sampleImage" ></img>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <img src={itemDetailState?.ItemInfo?.Media?.CDN} className='img-responsive' style={{ width: "100%", height: "700px" }} ></img>
                        <div className='bottomNav'>
                            <ul>
                                <li className={artist === 1 ? "active" : null} value="1" onClick={(e) => setArtist(e.target.value)} >Overview</li>
                                <li className={artist === 2 ? "active" : null} value="2" onClick={(e) => setArtist(e.target.value)}>owners</li>
                                <li className={artist === 3 ? "active" : null} value="3" onClick={(e) => setArtist(e.target.value)}>offer</li>
                                <li className={artist === 4 ? "active" : null} value="4" onClick={(e) => setArtist(e.target.value)}>history</li>
                            </ul>
                        </div>
                        {artist === 1 ? <OverViewArt></OverViewArt> : null}
                        {artist === 2 ? <BidsArt></BidsArt> : null}
                        {artist === 3 ? <OwnerArt></OwnerArt> : null}
                        {artist === 4 ? <HistoryArt></HistoryArt> : null}
                    </div>
                    <div className='col-lg-6'>
                        {props.loginState && sessionStorage.getItem("UserId") === itemDetailState?.OwnerInfo?.Id ? <div className="d-flex justify-content-end ArtIcon">
                            <button
                                onClick={() => {
                                    window.location.pathname = 'edit-item/' + itemDetailState?.ItemInfo?._id;
                                }}
                                className='btn btn-success'>Edit Item</button>

                        </div> : null}
                        <div className="d-flex justify-content-end ArtIcon">
                            {itemDetailState?.ItemInfo?.PhysicalArt ? <img src={iconOne}></img> : <img src={iconTwo}></img>}

                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='d-flex '>
                                    <div className='col-2'>
                                        <img src={itemDetailState?.UserInfo?.ProfilePicture?.CDN} className="artProfile" ></img>
                                    </div>
                                    <div className="col-9">
                                        <div>
                                            <p className='artArtistName'>ARTIST</p>
                                            <p className='artArtistNameTwo'>{itemDetailState?.UserInfo?.ProfileName}</p>
                                            <p className='artArtistNameThree'>{itemDetailState?.UserInfo?.Country}</p>
                                        </div>
                                        <div className='lineTwo'></div>
                                        <div className='secondText'>
                                            <p className='artArtistNameFour'>ARTWORK NAME</p>
                                            <p className='artArtistNameFive'>{itemDetailState?.ItemInfo?.Name}
                                            </p>

                                            <div className='d-flex '>
                                                <p className='artArtistNameSix'> Width {widthState} {sizeState} | Height {heightState} {sizeState}</p>
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                <select className='size-select-box' onChange={(e) => changeSize(itemDetailState?.ItemInfo?.Dimension, itemDetailState?.ItemInfo?.Height, itemDetailState?.ItemInfo?.Width, e.target.value)}>
                                                    <option value="IN">IN</option>
                                                    <option value="CM">CM</option>
                                                </select>
                                            </div>
                                            <div className='d-flex '>
                                                <p className='artArtistNameSeven'> Edition </p>
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                <select className='size-select-box' >
                                                    {renderItems(itemDetailState?.ItemInfo?.Edition)}
                                                </select>
                                            </div>
                                        </div>
                                        {itemStatus(itemDetailState?.ItemInfo?.PublishStatus, itemDetailState?.ItemInfo?.MarketPlaceStatus)}

                                        <div>
                                            <p className='ShippingDetails'> shipping details</p>
                                        </div>
                                        <div className='lineThree'>
                                        </div>
                                        <p className='shippingPara'>
                                            Shipping and taxes calculated at checkout
                                            this artwork is shipping from Australia
                                            shipping is insured and managed by Professional carriers. Delivery within 7 days.
                                        </p>
                                        <div>
                                            <p className='packageDetails'> Packaging details</p>
                                        </div>
                                        <div className='lineThree'></div>
                                        <div>
                                            <p className="packing">PACKAGING</p>
                                            <p className='packingText'>CANVAS Roll</p>
                                        </div>
                                        <div>
                                            <p className="packing">PACKAGING</p>
                                            <p className='packingText'>CANVAS Roll</p>
                                        </div>
                                        <div>
                                            <p className="packing">PACKAGING</p>
                                            <p className='packingText'>CANVAS Roll</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className='view-room-div' style={{ display: viewRoom ? "block" : "none", }}>
                <div className='d-flex justify-content-end'>
                    <button className='btn ' onClick={() => setViewRoom(false)}> X</button>
                </div>
                <div className='room-div'>
                    <div id="moovablepic" style={{ top: yState > 0 ? yState : "20%", left: xState > 0 ? xState : "45%", backgroundImage: `url(${itemDetailState?.ItemInfo?.Media?.CDN})` }}></div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                className="modalReact"
                backdrop="static"
                aria-hidden="true"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <button className='modalOffer' >Make An Offer</button>
                    <button className='btn close-modal' onClick={handleClose} >X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <img src={itemDetailState?.ItemInfo?.Media?.CDN} width="150px" height="200px" className="modalImage"></img>
                            </div>
                            <div className='col-lg-9'>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <img src={itemDetailState?.UserInfo?.ProfilePicture?.CDN} className="artProfile" ></img>
                                    </div>
                                    <div className='col-lg-10'>
                                        <div>
                                            <p className='artArtistName'>ARTIST</p>
                                            <p className='artArtistNameTwo'>{itemDetailState?.UserInfo?.ProfileName}</p>
                                            <p className='artArtistNameThree'>{itemDetailState?.UserInfo?.Country}</p>
                                            <p className='artistNetworkName'>ARTWORK NAME</p>
                                            <p className='modalPrice'>Price</p>
                                            <p className='box_Art_textTwo'>{itemDetailState?.ItemInfo?.Currency} {itemDetailState?.ItemInfo?.Price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={formikOffer.handleSubmit}>
                                <div className='modalTwo'>
                                    <button className='modalPriceBtn'>EURO</button>
                                    <p className="modalUSD">{itemDetailState?.ItemInfo?.Currency}</p>
                                    <input type="text" name='price' onChange={formikOffer.handleChange} value={formikOffer.values.price} className='offer-price' placeholder='Enter The Price' />
                                </div>
                                <div className='modalThree'>
                                    <textarea className='modalTextArea' name='message' onChange={formikOffer.handleChange} value={formikOffer.values.message} placeholder='Add Your Message...'></textarea>
                                </div>
                                <div className='modalFour'>
                                    <button type='submit' disabled={apiLoading} >Send Offer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Bid modal */}
            <Modal
                show={showbid}
                onHide={handlebidClose}
                className="modalReact"
                backdrop="static"
                aria-hidden="true"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <button className='modalOffer' >Make A Bid</button>
                    <button className='btn close-modal' onClick={handlebidClose} >X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <img src={itemDetailState?.ItemInfo?.Media?.CDN} width="150px" height="200px" className="modalImage"></img>
                            </div>
                            <div className='col-lg-9'>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <img src={itemDetailState?.UserInfo?.ProfilePicture?.CDN} className="artProfile" ></img>
                                    </div>
                                    <div className='col-lg-10'>
                                        <div>
                                            <p className='artArtistName'>ARTIST</p>
                                            <p className='artArtistNameTwo'>{itemDetailState?.UserInfo?.ProfileName}</p>
                                            <p className='artArtistNameThree'>{itemDetailState?.UserInfo?.Country}</p>
                                            <p className='artistNetworkName'>ARTWORK NAME</p>
                                            <p className='modalPrice'>Price</p>
                                            <p className='box_Art_textTwo'>{itemDetailState?.ItemInfo?.Currency} {itemDetailState?.ItemInfo?.Price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={formikBid.handleSubmit}>
                                <div className='modalTwo'>
                                    <button className='modalPriceBtn'>EURO</button>
                                    <p className="modalUSD">{itemDetailState?.ItemInfo?.Currency}</p>
                                    <input type="text" name='price' onChange={formikBid.handleChange} value={formikBid.values.price} className='offer-price' placeholder='Enter The Price' />
                                </div>
                                <div className='modalThree'>
                                    <textarea className='modalTextArea' name='message' onChange={formikBid.handleChange} value={formikBid.values.message} placeholder='Add Your Message...'></textarea>
                                </div>
                                <div className='modalFour'>
                                    <button type='submit' disabled={apiLoading} >Send Bid</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* sell modal */}
            <Modal
                size="lg"
                show={showSell}
                onHide={handleSellClose}

            >
                <Modal.Header closeButton>
                    <button className='modalOffer' >Sell</button>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-10 offset-lg-1'>
                                <form onSubmit={formik.handleSubmit} className='sell-form'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Price</label>
                                        <div className='d-flex inputwithCurrency'>
                                            <input type="number" className="form-control" name='price' onChange={formik.handleChange} value={formik.values.price} placeholder="Enter price" />&nbsp;&nbsp;{itemDetailState?.ItemInfo?.Currency}
                                        </div>
                                    </div>
                                    <div className='errors'>{formik.errors?.price}</div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className="form-check">
                                                <input type="checkbox" name="offerSale" value="offer" checked={formik.values.offerSale} className="form-check-input" onChange={(e) => {
                                                    formik.setFieldValue("offerSale", e.target.checked);
                                                    formik.setFieldValue("bidSale", false);
                                                }} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Offer Sale</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-check">
                                                <input type="checkbox" name="bidSale" value="bid" checked={formik.values.bidSale} className="form-check-input" onChange={(e) => {
                                                    formik.setFieldValue("offerSale", false);
                                                    formik.setFieldValue("bidSale", e.target.checked);
                                                }} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Bid sale</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    {formik.values?.bidSale || formik.values?.offerSale ? <div className='row'>
                                        <div className='col-lg-12'>
                                            <DateTimeRangePicker onChange={onChange} value={value} />
                                        </div>
                                    </div> : null}
                                    <br />
                                    <button type="submit" disabled={apiLoading} className="btn btn-primary">Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer/>
        </div>
    )
}

export default ArtDetails