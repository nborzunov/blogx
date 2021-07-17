import { useFormik } from 'formik';
import Markdown from 'markdown-to-jsx';
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
import { createPost } from '../../store/actions/posts';
import Layout from './../../components/Layout/Layout';
import TopPost from './../../components/Posts/TopPost';
import withAuth from '../../hocs/withAuth';
import Link from 'next/link';

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

const PreviewWrapper = styled.div`
    margin: 24px;
    width: 1000px;
`;

function ProfilePage(props) {
    const dispatch = useDispatch();

    function setPreviewImage(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            setValues({ ...values, previewImage: e.target.result });
        };
        reader.readAsDataURL(file);
    }

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
            title: '',
            subtitle: '',
            keywords: '',
            previewImage: '',
            body: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .max(50, 'Too Long!'),
            keywords: Yup.string()
                .required('Keywords are required')
                .max(50, 'Too Long!'),
            subtitle: Yup.string()
                .required('Subtitle is required')
                .max(200, 'Too Long!'),
            body: Yup.string().required('Body is required'),
        }),
        onSubmit: async (values) => {
            const result = await dispatch(createPost(values));
        },
    });
    return (
        <Layout title="Create Post">
            <EditWrapper>
                <Heading variant="h1">Create Post</Heading>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        autocomplete="off"
                    />
                    <Input
                        placeholder="Subtitle"
                        name="subtitle"
                        value={values.subtitle}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Keywords"
                        name="keywords"
                        value={values.keywords}
                        onChange={handleChange}
                    />
                    <FileUpload
                        name="previewImage"
                        value={values.previewImage.src}
                        onChange={(e) => setPreviewImage(e.target.files[0])}
                    />

                    <TextField
                        placeholder="Post Content"
                        name="body"
                        value={values.body}
                        onChange={handleChange}
                    ></TextField>

                    <Button variant="submit" type="submit">
                        Upload Post
                    </Button>
                </Form>
            </EditWrapper>

            {values.previewImage && (
                <PreviewWrapper>
                    <Heading variant="h1">Preview</Heading>
                    <TopPost post={values} isPreview />
                    <Markdown>{values.body}</Markdown>
                </PreviewWrapper>
            )}
        </Layout>
    );
}

export default withAuth(ProfilePage);