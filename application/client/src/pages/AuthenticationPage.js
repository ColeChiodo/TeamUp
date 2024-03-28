import '../Stylesheets/AuthenticationPage.css';

function AuthenticationPage() {
    return (
        <>
        <div className='bg'></div>
        <div className="container">
        <div className="authentication-page">
            <div className="login-left">
                <div className="login-left-content">
                    <h1>Login</h1>
                    <hr/>
                    <form action='/validateLogin'>
                        <input type="email" placeholder="Email" name="email" required></input>
                        <br/>
                        <input type="password" placeholder="Password" name="password" required></input>
                        <br/>
                        <a href="." className="forgot-password">Forgot Password?</a>
                        <br/>
                        <button type="submit" className='login'>Login</button>
                    </form>
                </div>
            </div>
            <div className="signup-right">
                <div className="signup-right-content">
                    <a href="/signup"><button className='signup'>Sign Up</button></a>
                    <h2>Why?</h2>
                    <p>
                        - Find Games in Your Area
                        <br/>
                        - Join Tournaments
                        <br/>
                        - Connect with others
                    </p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default AuthenticationPage