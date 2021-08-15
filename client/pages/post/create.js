import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Layout from './../../components/Layout/Layout';
import TopPost from './../../components/Posts/TopPost';
import PostContent from './../../components/Posts/PostContent';
import * as postAPI from '../../api/PostAPI/PostAPI';
import { Spinner } from '../../components/UI';
import {
    Input as ChakraInput,
    InputGroup,
    Stack,
    InputLeftAddon,
    Flex,
    Box,
    Textarea,
    Button,
    Heading,
    useToast,
    Container,
    Link,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function ProfilePage(props) {
    const toast = useToast();

    const [loading, setLoading] = useState(false);

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

            subtitle: Yup.string()
                .required('Subtitle is required')
                .max(200, 'Too Long!'),
            keywords: Yup.string()
                .required('Keywords are required')
                .max(50, 'Too Long!'),
            previewImage: Yup.object()
                .nullable()
                .required('Preview image is required'),
            body: Yup.string().required('Body is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            let formData = new FormData();

            for (let value in values) {
                formData.append(value, values[value]);
            }

            const res = await postAPI.createPost(formData);

            setLoading(false);

            if (res.status === 200) {
                return toast({
                    title: 'Profile has been successfully updated',
                    status: 'success',
                    position: 'bottom',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                return toast({
                    title: 'Something went wrong',
                    status: 'error',
                    position: 'bottom',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
    });
    return (
        <Layout title="Create Post">
            <Container minWidth="1000px" padding="24px">
                <Stack spacing={4}>
                    <Heading size="lg" color="gray.700">
                        Create Post
                    </Heading>
                    <Stack spacing={4}>
                        <FormControl isInvalid={errors.title && touched.title}>
                            <InputGroup>
                                <InputLeftAddon
                                    children="Title"
                                    width="90px"
                                    padding={4}
                                />
                                <ChakraInput
                                    id="title"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                    focusBorderColor="light.primary"
                                />
                            </InputGroup>
                            <FormErrorMessage ml="90px">
                                {errors.title}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={errors.subtitle && touched.subtitle}
                        >
                            <InputGroup>
                                <InputLeftAddon
                                    children="Subtitle"
                                    width="90px"
                                    padding={4}
                                />
                                <ChakraInput
                                    id="subtitle"
                                    name="subtitle"
                                    value={values.subtitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                    focusBorderColor="light.primary"
                                />
                            </InputGroup>
                            <FormErrorMessage ml="90px">
                                {errors.subtitle}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={errors.keywords && touched.keywords}
                        >
                            <InputGroup>
                                <InputLeftAddon
                                    children="Keywords"
                                    width="90px"
                                    padding={4}
                                />
                                <ChakraInput
                                    id="keywords"
                                    name="keywords"
                                    value={values.keywords}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                    focusBorderColor="light.primary"
                                />
                            </InputGroup>
                            <FormErrorMessage ml="90px">
                                {errors.keywords}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={
                                errors.previewImage && touched.previewImage
                            }
                        >
                            <InputGroup>
                                <InputLeftAddon
                                    children="Preview"
                                    width="90px"
                                    padding={4}
                                />
                                <ChakraInput
                                    autoComplete="off"
                                    focusBorderColor="light.primary"
                                    type="file"
                                    py={1}
                                    id="previewImage"
                                    name="previewImage"
                                    value={values.previewImage.src}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            previewImage: e.target.files[0],
                                        })
                                    }
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            <FormErrorMessage ml="90px">
                                {errors.previewImage}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>

                    <Heading size="lg" color="gray.700">
                        Post Content
                    </Heading>

                    <FormControl isInvalid={errors.body && touched.body}>
                        <InputGroup>
                            <Textarea
                                id="body"
                                name="body"
                                value={values.body}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                resize="vertical"
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <FormErrorMessage>{errors.body}</FormErrorMessage>
                    </FormControl>

                    <Flex
                        p={0}
                        m={0}
                        gridColumnGap="16px"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            isLoading={loading}
                            spinner={<Spinner />}
                            variant="submit"
                            onClick={handleSubmit}
                            isFullWidth={false}
                        >
                            Create Profile
                        </Button>
                        <Flex gridColumnGap="6px" alignItems="center">
                            <InfoIcon />
                            <div>
                                Our app is using markdown syntax.{' '}
                                <Link
                                    href="https://www.markdownguide.org/basic-syntax/"
                                    isExternal
                                    color="blue.500"
                                >
                                    Learn more..
                                </Link>
                            </div>
                        </Flex>
                    </Flex>
                </Stack>
            </Container>

            {values.previewImage && (
                <Container minWidth="1000px" p="24px">
                    <Heading size="lg" color="gray.700" mb="16px">
                        Preview
                    </Heading>
                    <TopPost post={values} isPreview />
                    <PostContent post={values} />
                </Container>
            )}
        </Layout>
    );
}
