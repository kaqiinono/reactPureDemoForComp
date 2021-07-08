import './index.scss';
import PropTypes from 'prop-types';

const Card = ({ data }) => {
    return (
        <div className="item height-fixed__item" style={{ transform: `translate(0, ${data.scrollY}px)` }}>
            <div className="item__wrapper">
                <div className="item__info">
                    <img alt="" src={data.avatar} className="item__avatar" />
                </div>
                <div>
                    <p className="item__text">E-mail: {data.email}</p>
                    <p className="item__text">Phone: {data.phone}</p>
                    <p className="item__text">City: {data.address.city}</p>
                    <p className="item__text">Street: {data.address.street}</p>
                </div>
            </div>
        </div>
    );
};
Card.propTypes = {
    data: PropTypes.array.isRequired
};
export default Card;
