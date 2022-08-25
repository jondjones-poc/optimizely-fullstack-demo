import React from 'react'

const sectionStyle = (backgroundColor) => (
{
        width: '100%',
        backgroundColor : backgroundColor,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '20vh'
});


const titleStyle =  {
    color: 'black',
    margin: 'auto',
    fontSize: '3rem',
    textAlign: 'center',
    paddingTop: '35px'
};

const ABComponent = ({...props}) => {

    const { backgroundColor } = props;
    console.log("ABComponent", props);

    const addEvent = () => {
        console.log("AB Component Event Example")
        props.optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="container" id="component-a"  style={sectionStyle(backgroundColor)} onClick={addEvent} >
            <h1 style={titleStyle}>
                {props.componentTitle}
            </h1>
        </div>
    )
}

export default ABComponent