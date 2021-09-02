import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Textarea} from "../../common/forms-controls/forms-controls";
import {maxLength, required} from "../../../utils/validators";

const maxLength50 = maxLength(50);

export type AddMessageFormValues = {
  newMessageBody: string;
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValues>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLength50]}
          name="newMessageBody"
          placeholder="Enter your message"
          cols="50" rows="3"

        />
        <div>
          <button>Send message</button>
        </div>

      </div>

    </form>
  )
}

export default reduxForm<AddMessageFormValues>({form: "addMessageForm"})(AddMessageForm)

