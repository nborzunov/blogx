import styled from 'styled-components';
import { WIDTH_ASIDE, WIDTH_LARGE, WIDTH_MAIN } from './variables';

const StyledContainer = styled.div`
    min-height: calc(100vh - 250px);
    display: flex;

    ${props => props.width && `
    max-width: ${props.width};
    flex-direction: ${props.flexDirection === 'row' ? 'row' : 'column' };
    justify-content: ${props.justifyContent};
    align-items: ${props.alignItems};
    `}
`;

export default function Container({maxWidth, justifyContent = 'start', alignItems = 'start', flexDirection = 'row', children }) {
    const getFormatedMaxWidth = (format) => {
        switch(format){
            case 'fullWidth':
                return '100%';
            case 'xl':
                return WIDTH_LARGE;
            case 'md':
                return WIDTH_MAIN;
            case 'sm':
                return WIDTH_ASIDE;
            default:
                return 'auto'
        }
    }
    return <StyledContainer 
    width={getFormatedMaxWidth(maxWidth)}
    flexDirection={flexDirection}
    justifyContent={justifyContent}
    alignItems={alignItems}
    >{children}</StyledContainer>;
}
