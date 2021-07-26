import { useSelector, useDispatch } from 'react-redux';
import { removeError } from '../../store/actions/errors';
import { Modal } from '../UI';

export default function ErrorBoundary({ children }) {
    const { error } = useSelector((state) => state.error);
    const dispatch = useDispatch();

    return (
        <>
            {error && (
                <Modal onClose={(_) => dispatch(removeError())}>
                    <p>Something went wrong:</p>
                    <pre>{error}</pre>
                </Modal>
            )}
            {children}
        </>
    );
}
