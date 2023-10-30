import styles from '../styles/Banner.module.css'

const sectionStyle = (backgroundColor) => (
{
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    padding: '60px 0',
    textAlign: 'center',
    background: backgroundColor,
    color: 'white',
    padding: `60px 0`,
    textAlign: `center`,
});

const Banner = ({...props}) => {

    const { backgroundColor, bannerText, buttonUrl } = props;

    return (

        <div className="container">
            <div className="header" id="component-a" style={sectionStyle(backgroundColor)} >

                <h1 className={styles.titleHeading}>
                    {props.componentTitle}
                </h1>

                <div className={styles.titleText}>
                    {bannerText} today!
                </div>

                <a className={styles.btnBgstroke} href={buttonUrl} >
                    Learn More
                </a>

            </div>
        </div>
    )
}

export default Banner;