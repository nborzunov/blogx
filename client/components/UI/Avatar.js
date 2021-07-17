import styled from 'styled-components';

const AvatarWrapper = styled.div`

    border-radius: 50%;
    overflow: hidden;
    position: relative;

    ${(props) =>
        props.size === 'large' &&
        `
        margin: 32px;
        box-shadow: 0px 5px 50px 0px rgb(108, 68, 252),
        0px 0px 0px 7px rgba(107, 74, 255, 0.5);
        width: 150px;
        height: 150px;
        @media screen and (max-width: 576px) {
            width: 120px;
            height: 120px;
        }
    `}
    ${(props) =>
        props.size === 'small' &&
        `
        margin: 8px;
        width: 40px;
        height: 40px;
        box-shadow: 0px 5px 20px 0px rgb(108, 68, 252),
        0px 0px 0px 4px rgba(107, 74, 255, 0.5);
    
    `}
`;
const Avatar = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

export default function (props) {
    return (
        <AvatarWrapper size={props.size}>
            <Avatar src={props.src} alt={props.alt} />
        </AvatarWrapper>
    );
}
