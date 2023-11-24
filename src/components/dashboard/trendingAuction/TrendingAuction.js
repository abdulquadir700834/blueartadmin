import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ScrollAnimation from "react-animate-on-scroll";
import fire from '../../../assets/fire.png';
import avatar from '../../../assets/u1.jpg';
import { useGetLiveAuctionQuery } from '../../../Store/Store'

const TrendingAuction = (props) => {
    const { data } = useGetLiveAuctionQuery();
    const { title, icon } = props;

    const LiveAuctionsCards = data?.data?.item_count?.length > 0 && data?.data?.item_count?.map((e, index) => (
        <div key={index}>
            <div className="nft-card card shadow-sm bg-gray border-0">
                <div className="card-body">
                    <div className="img-wrap">
                        {/* Image */}
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/images/item/thumb/${e.thumb}`} alt='img' style={{ width: "300px", height: "250px" }} />
                        <div className={`badge bg-dark position-absolute section`} >
                            <img src={fire} alt='New Bid' />
                            New Bid
                        </div>
                    </div>

                    {/* Others Info */}
                    <div className="row gx-2 align-items-center mt-3">
                        <div className="col-4 text-end">
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="row gx-2 align-items-center mt-2">
                        <div className="col-8">
                            <div className="name-info d-flex align-items-center">
                                <div className="author-img position-relative">
                                    <img className="shadow" src={avatar} alt={"author"} />
                                    <i className={`bi bi-check position-absolute bg-success `} />
                                </div>

                                <div className="name-author">
                                    <OverlayTrigger placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                            <Tooltip id={`liveAuctionNFT`}>
                                                {e.name}
                                            </Tooltip>
                                        }
                                    >
                                        <Link className="name d-block hover-primary text-truncate" to={``} >
                                            {e.name}
                                        </Link>
                                    </OverlayTrigger>
                                    <Link
                                        className="author d-block fz-12 hover-primary text-truncate"
                                    >
                                        @{e.description}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="price text-end">
                                <span className="fz-12 d-block">Current Bid</span>
                                <h6 className="mb-0">{e.price} BNB</h6>
                            </div>
                        </div>

                        <div className="col-12">
                            <Link
                                className={`btn btn-primary rounded-pill btn-sm mt-3 w-100`}
                                to={''}
                            >
                                <i className={`bi primary me-1`} ></i>
                                Place a Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="col-12 col-xxl-6">
            <ScrollAnimation animateIn="fadeInUp" delay={500} animateOnce={true} >
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                            <h5 className="mb-0">{title}</h5>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                {LiveAuctionsCards}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
    )
}

export default TrendingAuction;