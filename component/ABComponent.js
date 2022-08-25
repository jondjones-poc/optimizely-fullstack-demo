import React from 'react'
import styles from './ABComponent.module.css'

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


const ABComponent = ({...props}) => {

    const { backgroundColor, bannerText } = props;

    const addEvent = () => {
        console.log("AB Component Event Example")
        props.optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="header" id="component-a" style={sectionStyle(backgroundColor)} >

            <h1 className={styles.titleHeading}>
                {props.componentTitle}
            </h1>

            <div className={styles.titleText}>
                {bannerText} today!
            </div>

            <a className={styles.btnBgstroke} onClick={addEvent} >
                Buy now
            </a>

        </div>
    )
}

export default ABComponent