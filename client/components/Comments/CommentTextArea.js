import styled from 'styled-components';

const TextArea = styled.textarea`
    outline: none;
    border: none;
    display: block;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    color: #555f77;
    width: 100%;
    resize: none;
    padding: 12px;
    border-radius: 6px;
    margin: 8px 0;
    min-height: 80px;
    margin-bottom: 24px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    &:focus {
        border: 2px solid rgb(108, 68, 252);
    }
`;

export default TextArea;