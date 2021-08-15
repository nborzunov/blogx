import { useState, useRef } from 'react';
import { logout } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';

const StyledButton = styled.div`
    width: 100%;
`;
export default function LogoutButton() {
    const dispatch = useDispatch();

    const cancelRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    function handleLogout() {
        dispatch(logout());
        onClose();
    }

    function onClose() {
        setIsOpen(false);
    }
    return (
        <>
            <StyledButton onClick={() => setIsOpen(true)}>Logout</StyledButton>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                autoFocus={false}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Logout
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to log out?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleLogout}
                                ml={3}
                            >
                                Log out
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
