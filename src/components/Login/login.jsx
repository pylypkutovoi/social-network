import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/forms-controls/forms-controls';
import {required} from '../../utils/validators';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import s from '../common/forms-controls/forms-controls.module.css'
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name={"email"} placeholder={"Login"}
                 component={Input} validate={[required]}
          />
        </div>
        <div>
          <Field name={"password"} type="password"
                 placeholder={"Password"}
                 component={Input} validate={[required]}
          />
        </div>
        <div>
          <Field name={"rememberMe"} type={"checkbox"} component={Input}/>
        </div>
        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && <Field component={Input} name="captcha" type="password" validate={[required]}
        />}
        {error && <div className={s.formError}>
          {error}
        </div>
        }

        <div>
          <button>Login</button>
        </div>
      </form>
  )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    const {email, password, rememberMe, captcha} = formData;
    props.login(email, password, rememberMe, captcha);

  }
  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  }
}
export default connect(mapStateToProps, {
  login
})(Login);