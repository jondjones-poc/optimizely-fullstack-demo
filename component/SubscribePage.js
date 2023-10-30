import { useEffect, useState } from "react";
import { withOptimizely, useDecision } from '@optimizely/react-sdk';

import BannerForSubscribeMembers from "../component/BannerForSubscribeMembers";
import SignupForm from "../component/SignupForm";

function SubscribePage(props) {

    // Getting data using withOptimizely
    const { optimizely } = props;


    const [ decision ] = useDecision('landing_page');
    const [showSigninForm, setShowSigninForm] = useState(true)

    useEffect(() => {
        const showSigninForm = decision.variables['ShowSigninForm'];
        setShowSigninForm(showSigninForm)
    }, [decision])

    return (
      <div>
           {showSigninForm
            ? <SignupForm email={optimizely?.user?.attributes.email}  />
            : <BannerForSubscribeMembers />}
      </div>
    )
  }

const WrappedMyComponent = withOptimizely(SubscribePage)
export default WrappedMyComponent;