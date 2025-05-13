import React from 'react'

const SegmentationQueryStringBanner = ({...props}) => {

    const { componentMessage, discount } = props;

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
              <a href="/signup" className="button icon solid fa-file">
                Order now and get a {discount}% discount (passed in via FX)
              </a>
            </li>
          </ul>
        : null}
      </div>
    </section>
    )
}

export default SegmentationQueryStringBanner;

