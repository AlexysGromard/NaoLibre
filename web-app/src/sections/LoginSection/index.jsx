import React, { useState } from 'react';
import '../../style/authentication.css';
import userDAO from "../../dao/daoUser.mjs";
import Popover from '@mui/material/Popover';

/**
 * Login section
 * This section represents the login page
 */
function Login() {
    const [anchorEl, setAnchorEl] = useState(null);

    const [info, setInfo] = useState(null);

    async function connectUser(formData) {
        const email = formData.get("email");
        const password = formData.get("password");
        const { message, ok } = await userDAO.findUser(email, password);
        if (ok) {
            sessionStorage.setItem("email", email)
            sessionStorage.setItem("password", password)
            document.location.href = "/"
        }else{
            setInfo(message)
        }
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.target); // Assuming you're using FormData
        connectUser(formData);
    }

    function notAvailablePopup(event) {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popup-forgot-password' : undefined;

    let infospan = info === null ? null : <span className='erreur-text'>{info}</span>   
    return (
        <div id='authentication-content'>
            <div className='authentication-header'>
                <h1 className='authentication-title'>Sign In</h1>
                <h2 className='authentication-subtitle'>To access your user space</h2>
            </div>
            <div id='authentication-actions'>
                <form id='authentication-form' onSubmit={handleSubmit}>
                    <div className="input-container">
                        <img src='./assets/input_user.png' className="input-logo" alt="Email" />
                        <input className='input' type="email" name="email" id="email" placeholder="Email" required />
                    </div>
                    <div className="input-container">
                        <img src='./assets/input_key.png' className="input-logo" alt="Password" />
                        <input className='input' type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <a onClick={notAvailablePopup} id='forgot-password'>Forgot password ?</a>
                    {infospan}
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div style={{ padding: '20px' }}>This feature is not available yet!</div>
                    </Popover>
                    <input className="button fill" type="submit" value="Sign In" />
                </form>
                <div id='authentication-footer'>
                    <span>Don’t have an account ?</span>
                    <a className="button surrounded" href="/register">Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
