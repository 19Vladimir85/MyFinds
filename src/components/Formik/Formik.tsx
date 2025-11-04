import { Formik, Field, Form, ErrorMessage } from 'formik';
import { LocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

interface Values {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const user = new LocalStorage('user');
  const navigate = useNavigate();

  const validate = (values: Values) => {
    const errors = {};
    if (!values.login) {
      errors.login = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };
  return (
    <div>
      <h1>Войти</h1>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={(values: Values, { setSubmitting }) => {
          user.set(values.login);
          setSubmitting(false);
          navigate('/');
        }}
        validate={validate}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <label htmlFor="login">login</label>
              <Field id="login" name="login" placeholder="login" />
              {errors.login && touched.login && <ErrorMessage name="login" />}

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="password"
              />
              {errors.password && touched.password && (
                <ErrorMessage name="password" />
              )}
              <button disabled={!touched} type="submit">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
