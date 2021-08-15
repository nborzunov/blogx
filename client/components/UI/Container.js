import styled from 'styled-components';
import { WIDTH_ASIDE, WIDTH_LARGE, WIDTH_MAIN } from './variables';

const StyledContainer = styled.div`
    ${(props) =>
        props.width && props.width === '100vw'
            ? `
    min-height: calc(100vh - 250px);
    max-width: 100vw;
    `
            : `
    max-width: ${props.width};
    `}

    ${(props) =>
        props.justifyContent &&
        `
    display: flex;
    justify-content: ${props.justifyContent};
    `}
    ${(props) =>
        props.alignItems &&
        `
    display: flex;
    align-items: ${props.alignItems};
    `}
    ${(props) =>
        props.flexDirection &&
        `
    display: flex;
    flex-direction: ${props.flexDirection};
    `}
`;

export default function Container({
    maxWidth,
    justifyContent,
    alignItems,
    flexDirection,
    children,
}) {
    const getFormatedMaxWidth = (format) => {
        switch (format) {
            case 'fullWidth':
                return '100vw';
            case 'lg':
                return WIDTH_LARGE;
            case 'md':
                return WIDTH_MAIN;
            case 'sm':
                return WIDTH_ASIDE;
            default:
                return 'auto';
        }
    };
    return (
        <StyledContainer
            width={getFormatedMaxWidth(maxWidth)}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            alignItems={alignItems}
        >
            {children}
        </StyledContainer>
    );
}
