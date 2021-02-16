import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/forms-controls/forms-controls";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>Save</button>
      <p>{error}</p>
      <div>
        Full name:
        <Field component={Input} name="fullName" placeholder="Full name"/>
      </div>
      <div>
        Looking for a job:
        <Field component={Input} name="lookingForAJob" type="checkbox"  />
      </div>
      <div>
        My professional skills:
        <Field component={Textarea} name="lookingForAJobDescription" placeholder="My professional skills" />
      </div>
      <div>
        About me:
        <Field component={Textarea} name="aboutMe" placeholder="About me" />
      </div>
      <div>
        Contacts: {Object.keys(profile.contacts).map(key => {
        return (
          <div key={key}>
            {key}
            <Field component={Input} name={"contacts."+ key} placeholder={key}/>
          </div>
        )
      })
      }
      </div>
    </form>
  )
}

export default reduxForm({form: "profileDataForm"})(ProfileDataForm);