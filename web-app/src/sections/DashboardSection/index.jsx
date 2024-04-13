import React from 'react';
import SectionTitle from "../../components/SectionTitle";
import '../../style/authentication.css';
import './style.css';
import userDAO from "../../dao/daoUser.mjs";

/**
 * Dashboard section
 * This component is the dashboard for an identified user
 */
class Dashboard extends React.Component{
    constructor() {
        super();
        this.state = {
            nameUser: "",
            emailUser: "",
            pointUser:0
        }
        this.modifyUser = this.modifyUser.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * This function is called when the component is mounted.
     * It fetches the user data from the server.
     */
    componentDidMount() {
        //charge les information du user
        userDAO.findUser(sessionStorage.getItem("email"),sessionStorage.getItem("password")).then(({message,ok,user})=>
                                                                                        this.setState({nameUser: user.name, emailUser:sessionStorage.getItem("email"), pointUser:user.point}))
    }

    /**
     * This function is called when the component is updated.
     * It updates the state with the new props.
     */
    handleChangeName = (event) => {
        this.setState({nameUser: event.target.value, emailUser: this.state.emailUser}); // Update state with new value
    }

    /**
     * This function is called when the component is updated.
     * It updates the state with the new props.
     */
    handleChangeEmail = (event) => {
        this.setState({nameUser: this.state.nameUser, emailUser: event.target.value}); // Update state with new value
    }
    /**
     * This function is called when the user wants to disconnect.
     * It clears the session storage.
     */
    disconnect() {
        sessionStorage.clear()
    }

    /**
     * This function is called when the user wants to delete his account.
     * It deletes the account from the server and redirects to the login page.
     */
    deleteAccount(){

        const email = sessionStorage.getItem("email")
        const password = sessionStorage.getItem("password")
        sessionStorage.clear()
        if (!email || !password){
            window.location.href = "/"
            return;
        }

        userDAO.deleteUser(email,password).then((data) => {
            window.location.href = "/login"
        })

    }

    /**
     * This function is called when the user wants to modify his account.
     * It modifies the account from the server.
     * @param {FormData} formData - The form data to modify the user
     * @returns {Promise} - The promise to modify the user
     */
    async modifyUser(formData) {
        const oldEmail = sessionStorage.getItem("email")
        const oldPassword = sessionStorage.getItem("password")
        const newEmail = formData.get("email");
        const name = formData.get("name");
        let newPassword = formData.get("password");
        if (newPassword === "" || newPassword === null){
            newPassword = oldPassword
        }
        const res = await userDAO.modifyUser(name, oldEmail, oldPassword, newEmail, newPassword);
        if (res.ok){
            sessionStorage.setItem("email",newEmail)
            sessionStorage.setItem("password",newPassword)
            document.location.href = "/dashboard"
        }
    }

    /**
     * This function is called when the user submits the form.
     * It prevents the default form submission and calls the modifyUser function.
     */
    handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Access form data using event.target.elements or formData (if using a library)
        const formData = new FormData(event.target); // Assuming you're using FormData

        this.modifyUser(formData);
    }

    render() {
        return (
            <div id='authentication-form' action="" method="get">
                <SectionTitle title="Welcome USER" subtitle="User space"/>
                <div className='dashboard-section'>
                    <span className='dashboard-section-title'>Your data</span>
                    <form id='dashboard-infos' onSubmit={this.handleSubmit}>
                        <div className="input-container">
                            <img src='./assets/input_@.png' className="input-logo" alt="Email"/>
                            <input className='input' type="email" name="email" id="email" placeholder="Email"
                                   value={this.state.emailUser} onChange={this.handleChangeEmail} required/>
                        </div>
                        <div className="input-container">
                            <img src='./assets/input_person.png' className="input-logo" alt="Name"/>
                            <input className='input' type="text" name="name" id="Name"
                                   placeholder="Name (first and last name)" value={this.state.nameUser} onChange={this.handleChangeName}
                                   required/>
                        </div>
                        <div className="input-container">
                            <img src='./assets/input_key.png' className="input-logo" alt="password"/>
                            <input className='input' type="password" autoComplete="new-password" name="password" id="password"
                                   placeholder="Password" />
                        </div>
                        <input className="button fill" type="submit" value="Save"/>
                    </form>
                    <div className='dashboard-section'>
                        <span className='dashboard-section-title'>Reward</span>
                        <div id='rewards-number'>
                            <span>{this.state.pointUser}</span>
                        </div>
                        <span>*You can earn points by indicating to other users the passenger occupancy in a vehicle.</span>
                    </div>
                    <div className='dashboard-section' id='actions-section'>
                        <span className='dashboard-section-title'>Actions</span>
                        <div id='actions-btn'>
                            <a className='button fill' href="/" onClick={this.disconnect}>Logout</a>
                            <a className='button surrounded' href="/" onClick={this.deleteAccount}>Delete account</a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;