
const sectionStyle = {
    width: '100%',
    backgroundImage: `url(images/${process.env.NEXT_PUBLIC_CLIENT}footer.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'fit',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '400px'
  };


const Footer = () => {
    return (
        <section id="footer" style={ sectionStyle }>

        </section>
    )
}

export default Footer
