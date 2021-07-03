import styled from 'styled-components';
import { FORM_COLOR__PRIMARY } from './variables';

const FullWidthButton = styled.button`
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    background: ${FORM_COLOR__PRIMARY};
    color: #fff;
    display: block;
    border: none;
    margin-top: 20px;
    position: absolute;
    left: 0;
    bottom: 0;
    max-height: 60px;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 2px 2px;
    transform: rotateZ(0deg);
    transition: all 0.1s ease-out;
    border-bottom-width: 7px;
    cursor: pointer;
    font-size: 1.1rem;
    opacity: 1;
    &:hover {
        opacity: 0.9;
    }
`;

export default function Button(props) {
    const { fullWidth, children, type } = props;

    if (fullWidth) {
        return (
            <FullWidthButton onClick={props.onClick} type={type}>
                {children}
            </FullWidthButton>
        );
    }
    return <button>{children}</button>;
}
