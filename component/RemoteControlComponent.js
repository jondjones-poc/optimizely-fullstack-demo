const promotionBannerStyle = {
    width: '100%',
    display: 'block',
    position: 'relative',
    backgroundSize: '100%',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    fontSize: '2rem'
}

const RemoteControlComponent = ({...props}) => {

    const { promotionMessage } = props;

    return (
        <div className="container" style={promotionBannerStyle}>
                {promotionMessage}
        </div>
    )
}

export default RemoteControlComponent;