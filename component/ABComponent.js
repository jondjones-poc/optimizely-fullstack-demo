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

    const addEvent = () => {
        optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="container" id="component-a"  style={sectionStyle(props.backgroundColor)} onClick={addEvent} >
            <h1 style={titleStyle}>
                {props.componentTitle}
            </h1>
        </div>
    )
}

export default ABComponent