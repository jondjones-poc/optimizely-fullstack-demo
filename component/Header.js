
const sectionStyle = {
    width: '100%',
    backgroundImage: `url(images/${process.env.NEXT_PUBLIC_CLIENT}header.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '350px'
  };


const Header = () => {
    return (
        <section id="header" style={ sectionStyle }>

        </section>
    )
}

export default Header
