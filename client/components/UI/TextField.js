import styled from 'styled-components';
import {COLOR__PRIMARY} from './variables';

const TextField = styled.textarea`
    display: block;
    padding: 15px 10px;
    width: 275px;
    border: 1px solid #ddd;
    transition: border-width 0.2s ease;
    border-radius: 2px;
    color: #ccc;
    font-size: 1.1rem;
    resize: none;
    ${(props) =>
        props.value &&
        `
    color: #444;
    `}
    &:last-child {
        margin-bottom: 16px;
    }
    & + .MuiSvgIcon-root {
        color: #fff;
        font-size: 1.5em;
        position: absolute;
        margin-top: -36px;
        opacity: 0;
        left: 0;
        transition: all 0.1s ease-in;
    }

    &:focus {
        ${props => props.withIcon && `
            & + .MuiSvgIcon-root {
                opacity: 1;
                left: 27px;
                transition: all 0.25s ease-out;
            }
            border-left-width: 35px;
        `}
       
        outline: none;
        color: #444;

        border-color: ${COLOR__PRIMARY};
        
        ${(props) =>
            props.error &&
            `
        border-color: red;
        `}
        
    }
`;

export default TextField;
