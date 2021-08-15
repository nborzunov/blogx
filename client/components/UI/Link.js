import styled from 'styled-components';
import Link from 'next/link';
import {
    LINK_SIZE__LARGE,
    LINK_SIZE__MEDIUM,
    LINK_SIZE__SMALL,
    LINK_COLOR__LARGE,
    LINK_COLOR__MEDIUM,
    LINK_COLOR__SMALL,
    MARGIN_LARGE,
    MARGIN_MEDIUM,
    MARGIN_SMALL,
    PADDING_LARGE,
    PADDING_MEDIUM,
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
    margin: ${MARGIN_LARGE};
    padding: ${PADDING_LARGE};
    text-transform: uppercase;
`;

const MediumLink = styled.a`
    color: ${LINK_COLOR__MEDIUM};
    font-size: ${LINK_SIZE__MEDIUM};
    margin: ${MARGIN_MEDIUM};
    padding: ${PADDING_MEDIUM};
    font-weight: bold;
`;

const SmallLink = styled(StyledLink)`
    color: ${LINK_COLOR__SMALL};
    font-size: ${LINK_SIZE__SMALL};
    margin: ${MARGIN_SMALL};
    padding: ${PADDING_SMALL};
`;

function returnLinkBySize(size, children, onClick) {
    switch (size) {
        case 'large':
            return <LargeLink onClick={onClick}>{children}</LargeLink>;
        case 'medium':
            return <MediumLink onClick={onClick}>{children}</MediumLink>;
        case 'small':
            return <SmallLink onClick={onClick}>{children}</SmallLink>;
    }
}
export default function UILink({ href, size, as, onClick, children }) {
    if (!href) {
        return returnLinkBySize(size, children, onClick)
    }
    return (
        <Link href={href} as={as} passHref>
            {returnLinkBySize(size, children, onClick)}
        </Link>
    );
}
