import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/Formik/Formik';

export const LoginPage: React.FC = () => {
  return (
    <>
      <LoginForm />
      <Link to="/registration">
        <div>Зарегистрироваться</div>
      </Link>
    </>
  );
};
