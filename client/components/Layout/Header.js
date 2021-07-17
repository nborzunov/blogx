import React, { useState } from 'react';

import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Link, Modal, Container } from '../UI';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    width: 1000px;
    height: 64px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
`;

function Header({ router }) {
    const { isAuth, name, surname, avatar, id } = useSelector(
        (state) => state.auth
    );

    function onCloseModal() {
        router.push(router.pathname);
    }
    function onOpenLoginModal() {
        router.push(`${router.pathname}?modal=login`);
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
                <Link size="large" title="back" onClick={() => router.back()} />

                <Link href="/posts" size="large" title="posts" />

                <div>
                    {!isAuth && (
                        <>
                            <Link
                                size="large"
                                title="login"
                                href={`${router.pathname}?modal=login`}
                            />

                            <Link
                                size="large"
                                title="signup"
                                href={`${router.pathname}?modal=signup`}
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
