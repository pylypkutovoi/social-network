import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/forms-controls/forms-controls';
import {required} from '../../utils/validators';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import s from '../common/forms-controls/forms-controls.module.css'
const LoginForm = ({handleSubmit, error}) => {
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
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
  const onSubmit = (formData) => {
    const {email, password, rememberMe} = formData;
    props.login(email, password, rememberMe);

  }
  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}
export default connect(mapStateToProps, {
  login
})(Login);