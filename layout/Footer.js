
const sectionStyle = {
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '100%'
};

const Footer = ({clientId}) => {

    return (
        <section id="footer" style={sectionStyle}>

            <img src={`demo/${clientId}/footer.png`}
                 style={{width: '100%'}}
                 alt="Footer" />

        </section>
    );
}

export default Footer;