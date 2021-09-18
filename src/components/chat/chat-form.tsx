import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/chat-reducer';
import { AppState } from '../../redux/redux-store';
import { Formik, Form, Field, FormikHelpers} from 'formik';

type FormValuesType = {
  messageText: string;
}

const ChatForm: React.FC = () => {
  const dispatch = useDispatch();
  const chatStatus = useSelector((state: AppState) => state.chat.status);
  const handleMessage = (values: FormValuesType, { setSubmitting, resetForm }: FormikHelpers<FormValuesType>) => {
    if (!values.messageText) {
      setSubmitting(false);
      return;
    }
    dispatch(sendMessage(values.messageText));
    setSubmitting(false);
    resetForm();
  }
  return (
    <div>
      <Formik
        initialValues={{messageText: ''}}
        onSubmit={handleMessage}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field component="textarea" name="messageText"/>
            <div>
              <button disabled={chatStatus !== 'ready' || isSubmitting} type="submit">send</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ChatForm;
