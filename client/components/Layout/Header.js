import React, {useState} from 'react';

import styles from '../../styles/Header.module.css';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {Link, Modal} from '../UI';
import LoginForm from '../Auth/LoginForm'
import SignupForm from '../Auth/SignupForm'

function Header({ router }) {
    const { isAuth, name, surname, avatar, id } = useSelector(
        (state) => state.auth
    );

    const [isLoginModalOpened, setLoginModalOpened] = useState(false);
    const [isSignupModalOpened, setSignupModalOpened] = useState(false);
    
    const onToggleLoginModal = _ => setLoginModalOpened(!isLoginModalOpened);
    const onToggleSignupModal = _ => setSignupModalOpened(!isSignupModalOpened);

    return (
        <div className={styles.header}>
            <Modal isOpened={isLoginModalOpened} setModal={setLoginModalOpened}>
                <LoginForm setModal={setLoginModalOpened}/>
            </Modal>

            <Modal isOpened={isSignupModalOpened} setModal={setSignupModalOpened}>
                <SignupForm setLoginModal={setLoginModalOpened} setSignupModal={setSignupModalOpened}/>
            </Modal>


            <Link size="large" title="back" onClick={() => router.back()} />

            <Link href="/posts" size="large" title="posts" />

            <div>
                {!isAuth && (
                    <>
                        <Link size="large" title="login" onClick={onToggleLoginModal} />

                        <Link size="large" title="signup" onClick={onToggleSignupModal} />
                    </>
                )}
                {isAuth && (
                    <>
                        <Link
                            href={`/profile/${id}`}
                            size="large"
                            title={`${name} ${surname}`}
                        />
                        <Link href={`/logout`} size="large" title="logout" />
                    </>
                )}
            </div>
        </div>
    );
}

export default withRouter(Header);
