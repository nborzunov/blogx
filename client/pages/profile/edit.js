import { useState } from 'react';
import { useFormik } from 'formik';
import { Spinner } from '../../components/UI';
import Layout from '../../components/Layout/Layout';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import * as profileAPI from '../../api/ProfileAPI/ProfileAPI';
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
} from '@chakra-ui/react';
export default function EditProfilePage({ profileData }) {
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const { handleSubmit, handleChange, values, setValues, handleBlur } =
        useFormik({
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
            onSubmit: async (values) => {
                setLoading(true);
                let formData = new FormData();

                for (let value in values) {
                    formData.append(value, values[value]);
                }
                const res = await profileAPI.updateProfile(formData);

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
        <Layout title="Edit profile">
            <Container minWidth="1000px" padding="24px">
                <Stack spacing={4}>
                    <Heading size="lg" color="gray.700">
                        Edit Profile
                    </Heading>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon
                                children="Age"
                                width="90px"
                                padding={4}
                            />
                            <ChakraInput
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon
                                children="Country"
                                width="90px"
                                padding={4}
                            />
                            <ChakraInput
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon
                                children="City"
                                width="90px"
                                padding={4}
                            />
                            <ChakraInput
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon
                                children="Avatar"
                                width="90px"
                                padding={4}
                            />
                            <ChakraInput
                                autoComplete="off"
                                focusBorderColor="light.primary"
                                type="file"
                                py={1}
                                name="avatar"
                                value={values.avatar.src}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        avatar: e.target.files[0],
                                    })
                                }
                            />
                        </InputGroup>
                    </Stack>

                    <Heading size="lg" color="gray.700">
                        Socials
                    </Heading>

                    <Stack spacing={3}>
                        <InputGroup>
                            <InputLeftAddon>
                                <Box width="200px">
                                    <Flex columns={2}>
                                        <Box p={1}>
                                            <TwitterIcon />
                                        </Box>
                                        <Box p={1}>
                                            <div>https://twitter.com/</div>
                                        </Box>
                                    </Flex>
                                </Box>
                            </InputLeftAddon>

                            <ChakraInput
                                name="twitter"
                                value={values.twitter}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon>
                                <Box width="200px">
                                    <Flex columns={2}>
                                        <Box p={1}>
                                            <FacebookIcon />
                                        </Box>
                                        <Box p={1}>
                                            <div>https://facebook.com/</div>
                                        </Box>
                                    </Flex>
                                </Box>
                            </InputLeftAddon>

                            <ChakraInput
                                name="facebook"
                                value={values.facebook}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon>
                                <Box width="200px">
                                    <Flex columns={2}>
                                        <Box p={1}>
                                            <InstagramIcon />
                                        </Box>
                                        <Box p={1}>
                                            <div>https://instagram.com/</div>
                                        </Box>
                                    </Flex>
                                </Box>
                            </InputLeftAddon>

                            <ChakraInput
                                name="instagram"
                                value={values.instagram}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftAddon>
                                <Box width="200px">
                                    <Flex columns={2}>
                                        <Box p={1}>
                                            <LanguageIcon />
                                        </Box>
                                        <Box p={1}>
                                            <div>https://</div>
                                        </Box>
                                    </Flex>
                                </Box>
                            </InputLeftAddon>

                            <ChakraInput
                                placeholder="Website, e.g. mywebsite.com"
                                name="website"
                                value={values.website}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                focusBorderColor="light.primary"
                            />
                        </InputGroup>
                    </Stack>

                    <Heading size="lg" color="gray.700">
                        About me
                    </Heading>

                    <Textarea
                        placeholder="About me.."
                        name="aboutme"
                        resize="vertical"
                        value={values.aboutme}
                        onChange={handleChange}
                        autoComplete="off"
                        focusBorderColor="light.primary"
                    />
                    <Box p={0} m={0}>
                        <Button
                            isLoading={loading}
                            spinner={<Spinner />}
                            variant="submit"
                            onClick={handleSubmit}
                            isFullWidth={false}
                        >
                            Update profile
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Layout>
    );
}

EditProfilePage.getInitialProps = async ({ req }) => {
    try {
        const res = await profileAPI.getCurrentProfile(req.cookies.token);

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
