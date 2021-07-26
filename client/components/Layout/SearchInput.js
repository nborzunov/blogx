import styled from 'styled-components';

const InputWrapper = styled.fieldset`
    position: relative;
    padding: 0;
    margin: 0;
    border: 0;
    width: 270px;
    height: 32px;

    @keyframes color-1 {
        0% {
            background-color: #eb73b9;
        }
        100% {
            background-color: #17ead9;
        }
    }
    & * {
        box-sizing: content-box;
    }
`;

const Input = styled.input`
    border: 0;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    background: white;
    border-radius: 3px;
    box-shadow: 0px 8px 15px rgba(75, 72, 72, 0.1);
    transition: all 0.4s ease;
    font-size: 1.1rem;
    &:focus {
        outline: none;
        box-shadow: 0px 9px 20px rgba(75, 72, 72, 0.3);
        + .icons-container {
            .icon-close {
                opacity: 1;
                transform: translateX(0);
            }
            .icon-search {
                opacity: 0;
                transform: translateX(200%);
            }
        }
    }
`;

const IconContainer = styled.div`
    position: absolute;
    top: 15px;
    right: -28px;
    width: 25px;
    height: 25px;
    overflow: hidden;
`;
const IconSearch = styled.div`
    position: relative;
    top: 0px;
    left: 0px;
    width: 45%;
    height: 45%;
    opacity: 1;
    border-radius: 50%;
    border: 3px solid #6078ea;
    transition: opacity 0.25s ease,
        transform 0.43s cubic-bezier(0.694, 0.048, 0.335, 1);
    &:after {
        content: '';
        position: absolute;
        bottom: -9px;
        right: -2px;
        width: 4px;
        border-radius: 3px;
        transform: rotate(-45deg);
        height: 10px;
        background-color: #6078ea;
    }
`;

const IconClose = styled.div`
    position: absolute;
    top: 2px;
    left: 2px;
    width: 75%;
    height: 75%;
    opacity: 0;
    cursor: pointer;
    transform: translateX(-200%);
    border-radius: 50%;
    transition: opacity 0.25s ease,
        transform 0.43s cubic-bezier(0.694, 0.048, 0.335, 1);
    &:before {
        content: '';
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border: 2px solid transparent;
        border-top-color: #6078ea;
        border-left-color: #6078ea;
        border-bottom-color: #6078ea;
        transition: opacity 0.2s ease;
    }
`;

const IconXUp = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 3px;
        width: 50%;
        height: 2px;
        background-color: #6078ea;
        transform: rotate(45deg);
    }
    &:after {
        content: '';
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 50%;
        height: 2px;
        background-color: #6078ea;
        transform: rotate(-45deg);
    }
`;

const IconXDown = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 4px;
        width: 50%;
        height: 2px;
        background-color: #6078ea;
        transform: rotate(-45deg);
    }
    &:after {
        content: '';
        position: absolute;
        top: 5px;
        right: 1px;
        width: 50%;
        height: 2px;
        background-color: #6078ea;
        transform: rotate(45deg);
    }
`;

export default function SearchInput({ onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <InputWrapper name="input">
                <Input type="text" placeholder="Search..." />
                <IconContainer className="icons-container">
                    <IconSearch className="icon-search" />
                    <IconClose className="icon-close">
                        <IconXUp className="x-up" />
                        <IconXDown className="x-down" />
                    </IconClose>
                </IconContainer>
            </InputWrapper>
        </form>
    );
}
