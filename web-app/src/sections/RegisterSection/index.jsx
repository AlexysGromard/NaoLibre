import React, { useState } from 'react';
import '../../style/authentication.css';
import userDAO from "../../dao/daoUser.mjs";


/**
 * Register section
 * This section represents the register page
 */
function Register(){

    const [info, setInfo] = useState(null);

    async function addUser(formData) {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        
        let {messageErreur,ok} = await userDAO.addUser(name,email,password)
        if (ok){
            sessionStorage.setItem("email",email)
            sessionStorage.setItem("password",password)

            document.location.href = "/"
        }else{
            setInfo(messageErreur)
        }
        

    }
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Access form data using event.target.elements or formData (if using a library)
        const formData = new FormData(event.target); // Assuming you're using FormData

        addUser(formData);
    }

    let infospan = info === null ? null : <span className='erreur-text'>{info}</span>   

    return(
        <div id='authentication-content'>
            <div className='authentication-header'>
                <h1 className='authentication-title'>Sign Up</h1>
                <h2 className='authentication-subtitle'>To take advantage of all features</h2>
            </div>
            <div id='authentication-actions'>
                <form id='authentication-form' onSubmit={handleSubmit}>
                    <div className="input-container">
                        <img src='./assets/input_@.png' className="input-logo" alt="Email" />
                        <input className='input' type="email" name="email" id="email" placeholder="Email" required />
                    </div>
                    <div className="input-container">
                        <img src='./assets/input_key.png' className="input-logo" alt="Password" />
                        <input className='input' type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <div className="input-container">
                        <img src='./assets/input_key.png' className="input-logo" alt="PasswordConfirmation" />
                        <input className='input' type="password" name="PasswordConfirmation" id="PasswordConfirmation" placeholder="Password confirmation" required />
                    </div>
                    <div className="input-container">
                        <img src='./assets/input_person.png' className="input-logo" alt="name" />
                        <input className='input' type="text" name="name" id="name" placeholder="Name (first and last name)" required />
                    </div>
                    {infospan}
                    <input className="button fill" type="submit" value="Sign Up"/>
                </form>
                <div id='authentication-footer'>
                    <span>Already have an account ?</span>
                    <a className="button surrounded" href="/login">Sign In</a>
                </div>
            </div>

        </div>
    );
}

export default Register;