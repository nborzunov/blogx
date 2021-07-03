import styled from 'styled-components';

const Heading_1 = styled.h1``;
const Heading_2 = styled.h2``;
const Heading_3 = styled.h3`
    color: #444;
    font-size: 1.4em;
    font-weight: bold;
    margin: 10px 0 10px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
`;
const Heading_4 = styled.h4`
    color: #444;
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0 30px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
`;
const Heading_5 = styled.h5``;
const Heading_6 = styled.h6``;

export default function Heading({ variant, children }) {
    switch (variant) {
        case 'h3':
            return <Heading_3>{children}</Heading_3>;
        case 'h4':
            return <Heading_4>{children}</Heading_4>;
    }
    return <div></div>;
}
