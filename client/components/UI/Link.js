import styled from 'styled-components';
import Link from 'next/link';
import {
    LINK_SIZE__LARGE,
    LINK_SIZE__MEDIUM,
    LINK_SIZE__SMALL,
    LINK_COLOR__LARGE,
    LINK_COLOR__SMALL,
    MARGIN_MIDDLE,
    PADDING_MIDDLE,
    PADDING_SMALL,
} from './variables';

const StyledLink = styled.a`
    display: inline-block;
    text-decoration: none;
    transition: 0.2s ease;
    opacity: 1;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const LargeLink = styled(StyledLink)`
    color: ${LINK_COLOR__LARGE};
    font-size: ${LINK_SIZE__LARGE};
    text-transform: uppercase;
    margin: ${MARGIN_MIDDLE};
    padding: ${PADDING_MIDDLE};
`;

const MediumLink = styled.a``;

const SmallLink = styled(StyledLink)`
    font-size: 1.1em;
    color: ${LINK_COLOR__SMALL};
    padding: ${PADDING_SMALL};
    text-decoration: none;
`;

function returnLinkBySize(size, title, onClick) {
    switch (size) {
        case 'large':
            return <LargeLink onClick={onClick}>{title}</LargeLink>;
        case 'medium':
            return <LargeLink onClick={onClick}>{title}</LargeLink>;
        case 'small':
            return <SmallLink onClick={onClick}>{title}</SmallLink>;
    }
}
export default function UILink({ href, size, title, onClick }) {

    if(!href) {
        return(
            <>
            {returnLinkBySize(size, title, onClick)}
            </>

        )
    }
    return (
        <Link href={href} passHref>
            {returnLinkBySize(size, title, onClick)}
        </Link>
        
    );
}
