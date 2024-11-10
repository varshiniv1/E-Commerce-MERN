import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toastify styles are imported
import cookie from 'react-cookies'

// WavesButton component
export const WavesButton = ({ type, altClass, linkTo, style, title, runAction, iconSize }) => {
    let template;

    switch (type) {
        case "default":
            template = (
                <Link
                    className={altClass || 'link_default'} // Use altClass or default class
                    to={linkTo}
                    style={style} // Directly use style prop
                >
                    {title}
                </Link>
            );
            break;

        case "bag_link":
            template = (
                <div
                    className="bag_link"
                    onClick={runAction} // Directly call runAction
                    style={style}
                >
                    <AddShoppingCartIcon style={{ fontSize: iconSize }} />
                </div>
            );
            break;

        default:
            template = null; // Return null for the default case
    }

    return template;
};

// Define PropTypes for WavesButton
WavesButton.propTypes = {
    type: PropTypes.oneOf(['default', 'bag_link']).isRequired,
    altClass: PropTypes.string,
    linkTo: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string.isRequired,
    runAction: PropTypes.func,
    iconSize: PropTypes.string,
};

// Utility function to render card images
export const renderCardImage = (image) => {
    return image.length > 0 ? image[0] : '/images/image_not_available.png'; // Corrected typo
};

// Utility function to show toast notifications
export const showToast = (type, msg) => {
    const options = {
        position: "bottom-right", // Use the string directly instead of `toast.POSITION.BOTTOM_RIGHT`
    };

    switch (type) {
        case 'SUCCESS':
            toast.success(msg, options);
            break;
        case 'ERROR':
            toast.error(msg, options);
            break;
        default:
            return false;
    }
};

// Error helper for Formik
export const errorHelper = (formik, value) => ({
    error: Boolean(formik.errors[value] && formik.touched[value]),
    helperText: formik.touched[value] ? formik.errors[value] : null,
});

// Token cookie functions
export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token', { path: '/' });
export const getAuthHeader = () => ({
    headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
});
