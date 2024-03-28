import '../Stylesheets/SignupPage.css';

function checkboxEvent(value) {
    const schoolAffiliation = document.getElementsByName("yes-no");

    console.log("Checkbox Event Triggered");

    if (schoolAffiliation[0].checked) {
        document.querySelector(".email").placeholder = "School Email";
        document.querySelector(".dropdown").innerHTML = "<select className=\"select\"name=\"school\" id=\"school\"><option value=\"default\">Select School</option></select>"
            
    }
    else {
        document.querySelector(".email").placeholder = "Email";
        document.querySelector(".dropdown").innerHTML = "";
    }
}

function SignupPage() {

    return (
        <>
        <div className="container">
        <div className="signup-page">
            <div className='bg'>
                <h1 className="signup-title">Sign Up</h1>
            </div>
            <form className="signup-form" action='/createAccount'>
                <div className="name">
                    <input type="text" placeholder="First Name" name="first-name" className='inputBox' required></input>
                    <input type="text" placeholder="Last Name" name="last-name" className='inputBox' required></input>
                </div>
                <br/>
                <div className="schoolAffiliation">
                    <label for="yes">"I am Affiliated with a School."</label>
                    <input type="checkbox" id="yes" name="yes-no" value="yes" onClick={checkboxEvent}></input>
                </div>
                <div className='school-info'>
                    <div className='dropdown'></div>
                    <input className="email inputBox" type="email" placeholder="Email" name="emailInput" required></input>
                </div>
                <input type="password" placeholder="Password" name="password" className='inputBox' required></input>
                <br/>
                <input type="password" placeholder="Confirm Password" name="confirm-password" className='inputBox' required></input>
                <br/>
                <div className="error-message"></div>
                <button type="submit" className='submit-button'>Create Account</button>
                <a href="/authentication" className="login-link">Have an account? Login here.</a>
            </form>
        </div>
        </div>
        </>
    )
}

export default SignupPage