import { useRouter } from 'next/router';

const withAuth = (Component) => {
    const Auth = (props) => {
       
        const router = useRouter();
        const { isAuth } = props;

        if (!isAuth && !router.query.modal) {
            try{
                router.push(`${router.pathname}?modal=login`)
            } catch(err) {}
            
        }


        return <Component {...props} />;
    };


    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;
