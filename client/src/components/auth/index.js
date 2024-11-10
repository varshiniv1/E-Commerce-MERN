import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from './authForm';

const RegisterLogin = (props) => {
    const [isRegister, setIsRegister] = useState(false); // Changed to a more descriptive name

    const toggleFormType = () => {
        setIsRegister((prev) => !prev); // Simplified toggle function
    };

    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        {isRegister ? (
                            <>
                                <h1>New customers</h1>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error
                                    sit voluptatem accusantium doloremque laudantium,
                                    totam rem aperiam, eaque ipsa quae ab illo
                                    inventore veritatis et quasi architecto beatae
                                    vitae dicta sunt explicabo.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1>Welcome back</h1>
                                <p>
                                    Ut enim ad minima veniam, quis nostrum
                                    exercitationem ullam corporis suscipit laboriosam,
                                    nisi ut aliquid ex ea commodi consequatur? Quis
                                    autem vel eum iure reprehenderit qui in ea
                                    voluptate velit esse quam nihil molestiae
                                    consequatur, vel illum qui dolorem eum.
                                </p>
                            </>
                        )}

                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={toggleFormType}
                        >
                            {isRegister ? "Already registered?" : "Need to register"}
                        </Button>
                    </div>
                    <div className="right">
                        <h2>{isRegister ? 'Register' : 'Sign in'}</h2>
                        <AuthForm formType={isRegister} {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
