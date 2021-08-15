import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Modal, Container } from '../UI';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { getUser } from '../../store/actions/auth';
import tokenService from '../../utils/tokenService';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    IconButton,
    MenuDivider
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import LogoutButton from './LogoutButton';

const HeaderWrapper = styled.div`
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    background: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 950;
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    & a {
        margin: 0;
    }
`;

function Header({ router }) {
    const { isAuth, name, surname, avatar, id } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    function onCloseModal() {
        const { modal, ...query } = router.query;
        router.push({
            pathname: router.pathname,
            query: query,
        });
    }

    function onOpenLoginModal() {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, modal: 'login' },
        });
    }

    function onOpenSignupModal() {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, modal: 'signup' },
        });
    }

    let token = null;
    if (typeof window !== 'undefined') {
        token = tokenService.getToken();
    }
    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [token]);

    return (
        <Container maxWidth="md">
            {router.query.modal && (
                <Modal onClose={onCloseModal}>
                    {router.query.modal.includes('login') && (
                        <LoginForm onClose={onCloseModal} />
                    )}
                    {router.query.modal.includes('signup') && (
                        <SignupForm
                            onOpenLoginModal={onOpenLoginModal}
                            onClose={onCloseModal}
                        />
                    )}
                </Modal>
            )}
            <HeaderWrapper>
                <IconButton
                    icon={<KeyboardBackspaceIcon />}
                    onClick={() => router.back()}
                    variant="outline"
                />

                <SearchInput />

                <div>
                    {isAuth && (
                        <Link size="large" href={`/profile/${id}`}>
                            {`${name} ${surname}`}
                        </Link>
                    )}
                    {isAuth && (
                        <Menu>
                            <MenuButton
                                icon={<HamburgerIcon />}
                                as={IconButton}
                                aria-label="Options"
                                variant="outline"
                            />
                            <MenuList>
                                <MenuGroup title="Profile">
                                    <NextLink href="/profile/edit">
                                        <MenuItem>Edit</MenuItem>
                                    </NextLink>
                                </MenuGroup>

                                <MenuDivider />

                                <MenuGroup title="Settings">
                                    <MenuItem>Theme..</MenuItem>
                                    <MenuItem>Language..</MenuItem>
                                </MenuGroup>

                                <MenuDivider />
                                
                                <MenuGroup title="Auth">
                                    <MenuItem closeOnSelect={false}>
                                        <LogoutButton />
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    )}
                    {!isAuth && (
                        <>
                            <Link size="large" onClick={onOpenLoginModal}>
                                Login
                            </Link>
                            <Link size="large" onClick={onOpenSignupModal}>
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </HeaderWrapper>
        </Container>
    );
}

export default withRouter(Header);
