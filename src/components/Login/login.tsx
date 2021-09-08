import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/forms-controls/forms-controls';
import {required} from '../../utils/validators';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import s from '../common/forms-controls/forms-controls.module.css';
import { AppState } from '../../redux/redux-store';


type LoginFormOwnProps = {
  captchaUrl: string | null
}

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValues, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
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
        {captchaUrl && <img src={captchaUrl} alt=""/>}
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
const LoginReduxForm = reduxForm<LoginFormValues, LoginFormOwnProps>({form: 'login'})(LoginForm);

export const Login: React.FC = () => {
  const captchaUrl = useSelector((state: AppState) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = (formData: LoginFormValues) => {
    const {email, password, rememberMe, captcha} = formData;
    dispatch(login(email, password, rememberMe, captcha));

  }
  if (isAuth) {
    return <Redirect to={"/profile"}/>
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}
