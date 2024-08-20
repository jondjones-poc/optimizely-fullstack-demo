import Link from "next/link";

const sectionStyle = {
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: '100%'
};

const Header = ({...props}) => {

    const { clientId } = props;

    return (
        <section id="header" style={sectionStyle}>
            <Link href="/">
                    <img src={`demo/${clientId}/header.png`}
                         style={{width: '100%'}}
                         alt="Header" />
            </Link>
        </section>
    )
}

export default Header
