import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../store/actions/auth';
import { Button, Heading, Input, Link, Form, Error, Spinner } from '../UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoginForm({ onClose }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isAuth } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuth) {
            router.push(router.pathname);
        }
    }, [isAuth]);

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setErrors,
        handleBlur,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required')
                .max(50, 'Too Long!'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password should be 6 chars minimum')
                .max(50, 'Too Long!'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const result = await dispatch(login(values));

            if (result === 'ok') {
                onClose();
            } else {
                if (result.errors[0].field === 'email') {
                    setErrors({
                        email: result.errors[0].msg,
                    });
                }
                if (result.errors[0].field === 'password') {
                    setErrors({
                        password: result.errors[0].msg,
                    });
                }
            }
            setLoading(false);
        },
    });

    return (
        <Form>
            <Heading variant="h3">Log In</Heading>

            <>
                <Error>
                    {touched.email && errors.email ? errors.email : ''}
                </Error>
                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    withIcon="true"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? errors.email : null}
                />
                <MailOutlineIcon />
            </>

            <>
                <Error>
                    {touched.password && errors.password ? errors.password : ''}
                </Error>
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    withIcon="true"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                        touched.password && errors.password
                            ? errors.password
                            : null
                    }
                />
                <LockOpenIcon />
            </>

            <Link size="small" href="/" title="Forgot password?" />

            <Button fullWidth type="submit" onClick={handleSubmit}>
                {!loading && 'Log in'}
                {loading && <Spinner />}
            </Button>
        </Form>
    );
}
