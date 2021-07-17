import styled from 'styled-components';
import { COLOR__PRIMARY } from './variables';

const Button = styled.button`
    cursor: pointer;
    font-size: 1.1rem;
    opacity: 1;

    transition: all 0.1s ease-out;
    &:hover {
        opacity: 0.9;
    }
`;
const SubmitButton = styled(Button)`
    padding: 10px 50px;
    height: 100%;
    display: block;
    border: none;
    margin-top: 20px;
    background: ${COLOR__PRIMARY};
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    max-height: 60px;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 2px 2px;
    transform: rotateZ(0deg);
    border-bottom-width: 7px;
`;
const FullWidthButton = styled(SubmitButton)`
    width: 100%;
`;

const CasualButton = styled(Button)`
        margin: 4px 8px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    padding: 6px 16px;
`;

const IconButton = styled(Button)`

    margin: 4px;
    background: transparent;
    color: black;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:hover {
        opacity: 0.6;
    }
`;

const TabButton = styled(Button)`
    padding: 12px 24px;
    font-size: 1.25rem;
    background: transparent;
    font-weight: bold;
    font-family: inherit;
    border: 2px solid rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.9);
    margin: 0;
    & + & {
        margin-left: 12px;
    }
    &:hover {
        opacity: 1;
        border: 2px solid rgba(0, 0, 0, 0.5);
    }
    ${(props) =>
        props.active &&
        `
        color: black;
        border: 2px solid #6944ff;
        &:hover {
            opacity: 1;
            border: 2px solid #6944ff;
    }
    `}
`;

export default function ButtonComponent(props) {
    const { fullWidth, children, type, onClick, variant, active } = props;

    if (fullWidth) {
        return (
            <FullWidthButton onClick={onClick} type={type}>
                {children}
            </FullWidthButton>
        );
    } else if (variant === 'submit') {
        return <SubmitButton onClick={onClick} type={type}>
            {children}
        </SubmitButton>

    } else if (variant === 'icon') {
        return (
            <IconButton onClick={onClick} type={type}>
                {children}
            </IconButton>
        );
    } else if (variant === 'tab') {
        return (
            <TabButton onClick={onClick} type={type} active={active}>
                {children}
            </TabButton>
        );
    } else {
        return (
            <CasualButton onClick={onClick} type={type}>
                {children}
            </CasualButton>
        );
    }
}
