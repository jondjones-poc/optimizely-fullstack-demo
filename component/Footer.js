
const sectionStyle = {
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '100%'
};

const imageStyle = {
    width: '100%'
};

const Footer = ({clientId}) => {

    return (
        <section id="footer" style={sectionStyle}>
            <img src={`images/${clientId}/footer.png`} style={imageStyle} alt="Footer" />
        </section>
    )
}

export default Footer
