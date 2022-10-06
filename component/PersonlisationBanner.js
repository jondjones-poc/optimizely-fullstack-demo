import React from 'react'

const PersonlisationBanner = ({...props}) => {

  console.log('PersonlisationBanner', props);

  const { profileData } = props;

  const {
    job_title: jobTitle,
    last_name: lastName,
    first_name: firstName } = profileData;

  return (
    <section id="banner">
      <div className="container">
        Hello {firstName} {lastName} from {jobTitle}
      </div>
    </section>
  )
}

export default PersonlisationBanner;