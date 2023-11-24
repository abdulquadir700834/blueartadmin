import { Link } from "react-router-dom";

const HeroCard = (props) => {
    const { backgroundImage, heading, subHeading, buttonGroup } = props;
    return (
        <>
            <div className="col-12">

                <div className="card dashboard-hero-card p-2 border-0 bg-img shadow-sm" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})` }}>
                    <div className="card-body p-4">
                        <h3 className="mb-3 text-white">
                            {heading}
                        </h3>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HeroCard;