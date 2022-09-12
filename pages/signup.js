import { getDataFile } from "../utils/fullstackConnector";
import { getOdpProfileData } from "../utils/odpConnector";
import styles from './signup.module.css'

const Signup = (props) => {

    const { country, interests, last_name } = props;

    return (
        <>
            <section id="main">
                <div className="container">
                    <div className="row">
                        <div id="content" className="col-12 col-12-medium imp-medium">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <form>
                                <h3>Sign Up {interests} {last_name}</h3>
                                <div className="mb-3">
                                    <label>
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.formControl}
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>
                                        Last name
                                    </label>
                                    <input type="text"
                                           className={styles.formControl}
                                           placeholder="Last name" />
                                </div>
                                <div className="mb-3">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className={styles.formControl}
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className={styles.formControl}
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Sign Up
                                    </button>
                                </div>
                                <p className={styles.forgotPassword}>
                                    Already registered <a href="/sign-in">sign in?</a>
                                </p>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const datafile = await getDataFile();

    const profileData = await getOdpProfileData("david.knipe@optimizely.com");

    return {
        props: {
            datafile: datafile,
            profile: profileData ?? {}
        }
    }
}

export default Signup;