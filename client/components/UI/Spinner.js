import styled from 'styled-components';

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Bounce = styled.div`
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    animation: sk-bouncedelay 1s infinite;
    &.bounce_1 {
        animation-delay: -0.32s;
    }
    &.bounce_2 {
        animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
        0% {
            transform: scale(0);
        }

        40% {
            transform: scale(1);
        }

        80% {
            transform: scale(0);
        }

        100% {
            transform: scale(0);
        }
    }
`;


export default function Spinner() {
    return(
        <SpinnerWrapper>
            <Bounce className='bounce_1'/>
            <Bounce className='bounce_2'/>
            <Bounce className='bounce_3'/>
        </SpinnerWrapper>
    )
}
