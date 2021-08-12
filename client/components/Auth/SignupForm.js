import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';
import { signup } from '../../store/actions/auth';
import { Button, Form, Heading, Input, Link, Error, Spinner } from '../UI';

export default function SignupForm({ onClose, onOpenLoginModal }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isAuth } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuth) {
            const { modal, ...query } = router.query;
            router.push({
                pathname: router.pathname,
                query: query,
            });
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
            name: '',
            surname: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(1, 'Too short!')
                .max(50, 'Too long!'),
            surname: Yup.string()
                .required('Surname is required')
                .min(1, 'Too short!')
                .max(50, 'Too long!'),
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
            const result = dispatch(signup(values));

            if (result === 'ok') {
                onClose();
            } else {
                if (result.errors[0].field === 'name') {
                    setErrors({
                        name: result.errors[0].msg,
                    });
                }
                if (result.errors[0].field === 'surname') {
                    setErrors({
                        surname: result.errors[0].msg,
                    });
                }
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

    function handleLoginClick() {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                modal: 'login',
            },
        });
    }

    return (
        <Form>
            <Heading variant="h3">Sign Up</Heading>

            <>
                <Error>{touched.name && errors.name ? errors.name : ''}</Error>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    withIcon="true"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && errors.name ? errors.name : null}
                />
                <PermIdentityIcon />
            </>

            <>
                <Error>
                    {touched.surname && errors.surname ? errors.surname : ''}
                </Error>
                <Input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    withIcon="true"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                        touched.surname && errors.surname
                            ? errors.surname
                            : null
                    }
                />
                <PermIdentityIcon />
            </>

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

            <Link size="small" onClick={handleLoginClick}>
                Already have an account? Sign in
            </Link>

            <Button fullWidth type="submit" onClick={handleSubmit}>
                {loading ? <Spinner /> : 'Sign Up'}
            </Button>
        </Form>
    );
}
