import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { FORM_COLOR__PRIMARY } from './variables';

const ModalWrapper = styled.div`
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: none;
    justify-content: center;
    align-items: center;
    ${(props) =>
        props.isOpened &&
        `
    height: 100%;
    display: flex;
    `}
`;

const ModalBody = styled.div`
    display: inline-block;
    position: relative;
    z-index: 1000;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 16px;
    z-index: 1010;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s ease;
    border: none;

    background-color: ${FORM_COLOR__PRIMARY};
    &:hover{
        opacity: 0.8;
    }
    & .MuiSvgIcon-root {
        font-size: 1.5rem;
        color: white;
    }
`;

export default function Modal({ isOpened, onClose, children }) {


    const handleClose = e => {

        e.preventDefault()
        e.stopPropagation()
        if(e.target.id !== 'modal')return
        onClose()
    }
    return (
        <ModalWrapper isOpened={isOpened} onClick={e => handleClose(e)} id='modal'>
            <ModalBody>
                <ModalCloseButton onClick={onClose}>
                    <CloseIcon />
                </ModalCloseButton>

                {children}
            </ModalBody>
        </ModalWrapper>
    );
}
