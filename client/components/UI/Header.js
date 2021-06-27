import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.css';
import { withRouter } from 'next/router';

function Header({ router }) {
    return (
        <div className={styles.header}>
            <a
                href="#"
                className={styles.header__link}
                onClick={() => router.back()}
            >
                back
            </a>

            <div>
                <Link href="/posts">
                    <a className={styles.header__link}>posts</a>
                </Link>
            </div>

            <div>
                <Link href="/login">
                    <a className={styles.header__link}>login</a>
                </Link>
                <Link href="/signup">
                    <a className={styles.header__link}>signup</a>
                </Link>
            </div>
        </div>
    );
}

export default withRouter(Header);
