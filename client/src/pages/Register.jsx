import {Form, redirect, useNavigation, Link } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';  
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='john'  />
        <FormRow type='text' name='lastName' lableText='Last Name' defaultValue='smith' />
        <FormRow type='text' name='location' defaultValue='Seattle'  />
        <FormRow type='text' name='email' defaultValue='johnsmith@gmail.com'  />
        <FormRow type='text' name='password' defaultValue='secret123' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>Already a member?  
          <Link to='/login' className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;