import React from 'react'

const DiscountBanner = ({...props}) => {

    const { componentMessage, discount } = props;

    const bannerClicked = () => {
        optimizelyClient?.track('banner_click', userId, {variation: postId});
        console.log(`Banner ${postId} clicked`)
    }

    if (!componentMessage) {
      return null;
    }

    return (
      <section id="banner">
      <div className="container">
        <p>{componentMessage}</p>
        {discount ?
          <ul className="actions">
            <li>
              <a href="#" className="button icon solid fa-file">
                Order now and get a {discount}% discount
              </a>
            </li>
          </ul>
        : null}
      </div>
    </section>
    )
}

export default DiscountBanner;