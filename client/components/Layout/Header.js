import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Link, Modal, Container, Input } from '../UI';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import styled from 'styled-components';
import SearchInput from './SearchInput';
const HeaderWrapper = styled.div`
    width: 1000px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    max-width: 1200px;
    margin: auto;
    background: white;
`;

function Header({ router }) {
    const { isAuth, name, surname, avatar, id } = useSelector(
        (state) => state.auth
    );

    function onCloseModal() {
        const {modal, ...query} = router.query;
        router.push({
            pathname: router.pathname,
            query: query
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

    function onSearchSubmit(e) {
        e.preventDefault();

        router.push({
            pathname: '/search/',
            query: {
                query: e.target[0].children[0].value,
                page: 1,
                type: 'posts',
            },
        });
    }
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
                <div>
                    <Link
                        size="large"
                        title="back"
                        onClick={() => router.back()}
                    />
                    <Link href="/posts" size="large" title="posts" />
                </div>

                <div>
                    <SearchInput onSubmit={onSearchSubmit} />
                </div>

                <div>
                    {!isAuth && (
                        <>
                            <Link
                                size="large"
                                title="login"
                                onClick={onOpenLoginModal}
                            />

                            <Link
                                size="large"
                                title="signup"
                                onClick={onOpenSignupModal}
                            />
                        </>
                    )}
                    {isAuth && (
                        <>
                            <Link
                                href={`/profile/${id}`}
                                size="large"
                                title={`${name} ${surname}`}
                            />

                            <Link
                                href={`/logout`}
                                size="large"
                                title="logout"
                            />
                        </>
                    )}
                </div>
            </HeaderWrapper>
        </Container>
    );
}

export default withRouter(Header);
