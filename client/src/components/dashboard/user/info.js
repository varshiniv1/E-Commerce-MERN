import React,{useState} from 'react';
import DashboardLayout from '../../../hoc/dashboardLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from '../../../utils/tools';
import { useDispatch } from 'react-redux';
import { TextField, Button, Snackbar } from '@mui/material';
import { userUpdateProfile } from '../../../store/actions/user.actions';
import EmailStepper from './stepper';

const UserInfo = ({ users }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: users?.data?.firstname || '',
            lastname: users?.data?.lastname || '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .min(3, '3 char min')
                .max(30, '30 char max')
                .required('Sorry, you need the firstname'),
            lastname: Yup.string()
                .min(3, '3 char min')
                .max(30, '30 char max')
                .required('Sorry, you need the lastname'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await dispatch(userUpdateProfile(values));
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <DashboardLayout title="User information">
            <form className="mt-3 article_form" style={{ maxWidth: '250px' }} onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="firstname"
                        label="Enter your firstname"
                        variant="outlined"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik, 'firstname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="lastname"
                        label="Enter your lastname"
                        variant="outlined"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik, 'lastname')}
                    />
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Edit profile'}
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Profile updated successfully!"
            />
            <hr />
            <div>
                <EmailStepper users={users} />
            </div>
        </DashboardLayout>
    );
};

export default UserInfo;