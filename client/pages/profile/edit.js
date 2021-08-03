import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';
import {
    Button,
    FileUpload,
    Form,
    Heading,
    Input,
    TextField,
} from '../../components/UI';
import { updateProfile } from '../../store/actions/profile';
import { createRef } from 'react';

const EditWrapper = styled.div`
    width: 1000px;
    & form {
        margin: 0;
        max-width: 100%;
        box-shadow: none;
        & > * {
            margin: 16px 0;
        }
        & input {
            width: 100%;
        }
        & textarea {
            width: 100%;
            min-height: 200px;
            height: auto;
        }
        & button {
            margin-left: 20px;
            margin-bottom: 24px;
        }
    }
`;

export default function EditProfilePage({ profileData }) {
    const router = useRouter();

    const dispatch = useDispatch();

    const { isAuth } = useSelector((state) => state.auth);

    const formRef = createRef();

    const {
        handleSubmit,
        handleChange,
        values,
        setValues,
        touched,
        errors,
        setErrors,
        handleBlur,
    } = useFormik({
        initialValues: {
            age: profileData.age ? profileData.age : '',
            country: profileData.country ? profileData.country : '',
            city: profileData.city ? profileData.city : '',
            avatar: '',
            aboutme: profileData.aboutme ? profileData.aboutme : '',
        },
        validationSchema: Yup.object({
            // title: Yup.string()
            //     .required('Title is required')
            //     .max(50, 'Too Long!'),
            // keywords: Yup.string()
            //     .required('Keywords are required')
            //     .max(50, 'Too Long!'),
            // subtitle: Yup.string()
            //     .required('Subtitle is required')
            //     .max(200, 'Too Long!'),
            // body: Yup.string().required('Body is required'),
        }),
        onSubmit: async (values) => {
            const result = await dispatch(updateProfile(new FormData(formRef.current)));
        },
    });

    return (
        <Layout title="Edit profile">
            <EditWrapper>
                <Heading variant="h1">Edit Profile</Heading>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Input
                        placeholder="Age"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        autocomplete="off"
                    />
                    <Input
                        placeholder="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                    />

                    <FileUpload
                        name="avatar"
                        value={values.avatar.src}
                        title="Update avatar"
                        onChange={(e) =>
                            setValues({
                                ...values,
                                avatar: e.target.files[0],
                            })
                        }
                    />

                    <TextField
                        placeholder="About me.."
                        name="aboutme"
                        value={values.aboutme}
                        onChange={handleChange}
                    ></TextField>

                    <Button variant="submit" type="submit">
                        Update profile
                    </Button>
                </Form>
            </EditWrapper>
        </Layout>
    );
}

EditProfilePage.getInitialProps = async ({req}) => {
    try{
        console.log(req.cookies.token)
        const res = await axios.get(`http://localhost:4000/profile`, {
            headers: {
                'x-auth-token': req.cookies.token,
            },
        });

        if (res.status === 200) {
            return { profileData: res.data };
        } else {
            console.error(res.data.msg)
            return { profileData: {} };
        }
    } catch(err){
        console.error(err.message)
        return { profileData: {} };
    }


};
