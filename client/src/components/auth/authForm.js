import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../../utils/loader';
import { errorHelper } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { userRegister, userSignIn } from '../../store/actions/user.actions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthForm = (props) => {
    const notifications = useSelector((state) => state.notifications);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const formik = useFormik({
        initialValues: { email: 'francis@gmail.com', password: 'testing123' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry, the email is required')
                .email('This is an invalid email'),
            password: Yup.string()
                .required('Sorry, the password is required'),
        }),
        onSubmit: (values) => {
            setLoading(true);
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        if (props.formType) {
            dispatch(userRegister(values));
        } else {
            dispatch(userSignIn(values));
        }
    };

    useEffect(() => {
        if (notifications?.success) {
            navigate('/dashboard'); // Use navigate instead of props.history.push
        } else if (notifications?.error) {
            // Handle error notification
            setLoading(false); // Set loading to false on error
        }
    }, [notifications, navigate]); // Ensure navigate is included in dependencies

    return (
        <div className="auth_container">
            {loading ? (
                <Loader />
            ) : (
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="password"
                            label="Enter your password"
                            variant="outlined"
                            type="password"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                    >
                        {props.formType ? 'Register' : 'Login'}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AuthForm;
