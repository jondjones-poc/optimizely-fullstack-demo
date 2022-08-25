import Link from "next/link";

const sectionStyle = {
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: '100%'
};

const imageStyle = {
    width: '100%'
};

const Header = ({...props}) => {

    const { clientId } = props;

    return (
        <section id="header" style={sectionStyle}>
            <Link href="/">
                <a>
                    <img src={`images/${clientId}/header.png`} style={imageStyle} alt="Header" />
                </a>
            </Link>
        </section>
    )
}

export default Header
