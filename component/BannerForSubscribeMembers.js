import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { withOptimizely } from '@optimizely/react-sdk';

const BannerForSubscribeMembers = (props) => {
  const { optimizely } = props
  const router = useRouter();

  const clearCookiesAndReload = () => {

    optimizely.onReady().then(() => {
      optimizely.track('banner_click')
    })

    Cookies.remove('state');
    Cookies.remove('requestedSalesPack');
    Cookies.remove('email');
    router.reload();
  }

  return (
	<div id="bannerForMembers">
    <div className="container">
      <div>
        <h2>Welcome Subscriber, have you heard about our new product?</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <img src="/demo/banner.gif" style={{width: '100%'}} alt="feature-flag" />
        </div>
      </div>
      <div className="row aln-center">
        <div className="col-4 col-6-medium col-12-small">
          <div>
            <h3>Feature One</h3>
          </div>
          <div>
            Unlock a world of endless possibilities with our premium subscription service. Join now to enjoy exclusive access to curated content, personalized recommendations, and members-only perks. Elevate your experience and subscribe today for a journey beyond the ordinary.
          </div>
        </div>
        <div className="col-4 col-6-medium col-12-small">
          <div>
            <h3>Feature Two</h3>
          </div>
          <div>
            Experience a new level of convenience and delight with our subscription service. Dive into a treasure trove of handpicked content tailored just for you. Subscribe now and indulge in a seamless, personalized entertainment journey like never before.
          </div>
        </div>
        <div className="col-4 col-6-medium col-12-small">
          <div>
            <h3>Feature Three</h3>
          </div>
          <div>
          Join the elite circle of enthusiasts with our subscription service, where premium meets personalized. Elevate your lifestyle with exclusive content, early access, and member-only privileges. Subscribe today and redefine your experience in the world of luxury and entertainment.
          </div>
        </div>
        <div className="col-12">
          <ul className="actions">
            <li>
              <button onClick={() => clearCookiesAndReload()}>
                Order Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

const WrappedMyComponent = withOptimizely(BannerForSubscribeMembers)
export default WrappedMyComponent;