import axios from 'axios';
import Layout from './../components/Layout/Layout';
import styled from 'styled-components';
import { Container, Heading } from '../components/UI';
import PostCard from './../components/Posts/PostCard';
import { useRouter } from 'next/router';
const ContentWrapper = styled.div`
    padding: 24px;
    width: 1000px;
    & > h1 {
        margin: 0;
        margin-bottom: 16px;
        & > span {
        }
    }
`;
const PostsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    & > * {
        width: 100%;
        height: 200px;
        & > * {
            width: 100%;
            height: 200px;
        }
    }
`;

const RadioWrapper = styled.ul`
    display: flex;
    list-style: none;
    margin: 16px 0;
    & li {
        & input[type='radio'] {
            display: none;
        }
        & label {
            padding: 8px 16px;
            font-size: 1.1rem;
            background: rgba(0, 0, 0, 0.1);
            margin: 16px 8px;
            border: 2px solid rgba(0, 0, 0, 0.1);
            transition: 0.2s ease;
            border-radius: 8px;
            &:hover {
                cursor: pointer;
                border: 2px solid rgba(0, 0, 0, 0.2);
            }
            &.active {
                border: 2px solid rgba(0, 0, 0, 0.5);
            }
        }
    }
`;

export default function SearchPage(props) {
    const router = useRouter();
    const category = props.query.type;

    function handleRadioClick(e) {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                type: e.target.name,
            },
        });
    }
    return (
        <Layout title={`${props.query.query} - Search Results`}>
            <Container size="md">
                <ContentWrapper>
                    <Heading variant="h1">
                        Search results: {props.query.query}{' '}
                        <span>{props.result.length} results</span>
                    </Heading>

                    <RadioWrapper>
                        <li>
                            <input
                                type="radio"
                                id="people"
                                name="people"
                                onClick={handleRadioClick}
                            />
                            <label
                                for="people"
                                className={
                                    category === 'people' ? 'active' : ''
                                }
                            >
                                People
                            </label>
                        </li>

                        <li>
                            <input
                                type="radio"
                                id="posts"
                                name="posts"
                                onClick={handleRadioClick}
                            />
                            <label
                                for="posts"
                                className={category === 'posts' ? 'active' : ''}
                            >
                                Posts
                            </label>
                        </li>

                        <li>
                            <input
                                type="radio"
                                id="comments"
                                name="comments"
                                onClick={handleRadioClick}
                            />
                            <label
                                for="comments"
                                className={
                                    category === 'comments' ? 'active' : ''
                                }
                            >
                                Comments
                            </label>
                        </li>
                    </RadioWrapper>

                    <PostsGrid>
                        {props.result.data.map((item) => (
                            <PostCard post={item} />
                        ))}
                    </PostsGrid>
                </ContentWrapper>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const searchQuery = query.query;

    try {
        const res = await axios.get(
            `http://localhost:4000/search/${query.type}?query=${encodeURI(
                searchQuery
            )}&page=${query.page}`
        );
        return {
            props: {
                query: query,
                result: res.data,
            },
        };
    } catch (err) {}
}
