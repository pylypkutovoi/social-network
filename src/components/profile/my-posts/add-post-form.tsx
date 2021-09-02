import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { maxLength, required } from '../../../utils/validators';
import { Textarea } from '../../common/forms-controls/forms-controls';

const max200 = maxLength(200);

export type AddPostFormValues = {
    newPostText: string;
  }

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValues>> = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            component={Textarea}
            name="newPostText"
            cols="50" rows="3"
            validate={[required, max200]}
            placeholder={"post message"}
          />
        </div>
        <button>Add post</button>
  
      </form>
    )
  }
  
export default reduxForm<AddPostFormValues>({
    form: "AddPostForm"
  })(AddPostForm);