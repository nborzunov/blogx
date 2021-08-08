import * as Yup from 'yup';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { createRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
    Button,
    FileUpload,
    Form,
    Heading,
    Input,
    TextField,
} from '../../components/UI';
import { updateProfile } from '../../store/actions/profile';
import Layout from '../../components/Layout/Layout';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import * as profile from '../../api/ProfileAPI/ProfileAPI';

const EditWrapper = styled.div`
    width: 1000px;
    & form {
        margin: 0;
        max-width: 100%;
        box-shadow: none;
        & > * {
            margin: 16px 0;
        }
        & > input {
            width: 100%;
        }
        & > textarea {
            width: 100%;
            min-height: 200px;
            height: auto;
        }
        & > button {
            margin-left: 20px;
            margin-bottom: 24px;
        }
    }
`;

const SocialBox = styled.div`
    & > input {
        width: 100%;
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
            twitter: profileData.twitter ? profileData.twitter : '',
            facebook: profileData.facebook ? profileData.facebook : '',
            instagram: profileData.instagram ? profileData.instagram : '',
            website: profileData.website ? profileData.website : '',
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
            const result = await dispatch(
                updateProfile(new FormData(formRef.current))
            );
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

                    <Heading variant="h1">Avatar</Heading>

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

                    <Heading variant="h1">Socials</Heading>

                    <SocialBox>
                        <Input
                            type="text"
                            placeholder="Twitter, e.g. twitter.com/blogx"
                            name="twitter"
                            withIcon="true"
                            value={values.twitter}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // error={touched.email && errors.email ? errors.email : null}
                        />
                        <TwitterIcon />
                    </SocialBox>

                    <SocialBox>
                        <Input
                            type="text"
                            placeholder="Facebook, e.g. facebook.com/blogx"
                            name="facebook"
                            withIcon="true"
                            value={values.facebook}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // error={touched.email && errors.email ? errors.email : null}
                        />
                        <FacebookIcon />
                    </SocialBox>

                    <SocialBox>
                        <Input
                            type="text"
                            placeholder="Instagram, e.g. instagram.com/blogx"
                            name="instagram"
                            withIcon="true"
                            value={values.instagram}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // error={touched.email && errors.email ? errors.email : null}
                        />
                        <InstagramIcon />
                    </SocialBox>

                    <SocialBox>
                        <Input
                            type="text"
                            placeholder="Website, e.g. mywebsite.com"
                            name="website"
                            withIcon="true"
                            value={values.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // error={touched.email && errors.email ? errors.email : null}
                        />
                        <LanguageIcon />
                    </SocialBox>

                    <Heading variant="h1">About me</Heading>
                    <TextField
                        placeholder="About me.."
                        name="aboutme"
                        value={values.aboutme}
                        onChange={handleChange}
                    />

                    <Button variant="submit" type="submit">
                        Update profile
                    </Button>
                </Form>
            </EditWrapper>
        </Layout>
    );
}

EditProfilePage.getInitialProps = async ({ req }) => {
    try {
        const res = await profile.getCurrentProfile(req.cookies.token);

        if (res.status === 200) {
            return { profileData: res.data };
        } else {
            console.error(res.data.msg);
            return { profileData: {} };
        }
    } catch (err) {
        console.error(err.message);
        return { profileData: {} };
    }
};
