import styled from 'styled-components';

const Heading_1 = styled.h1`
    color: #444;
    font-size: 2.4em;
    font-weight: bold;
    margin: 12px 24px;
`;
const Heading_2 = styled.h2`
    color: #444;
    font-size: 1.8em;
    font-weight: bold;
    margin: 10px 24px;
    padding-bottom: 20px;
`;
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
const Heading_5 = styled.h5`
    color: #444;
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0 30px 0;
`;
const Heading_6 = styled.h6`
    color: #444;
    font-size: 1em;
    margin: 10px 0 30px 0;
`;

export default function Heading({ variant, children }) {
    switch (variant) {
        case 'h1':
            return <Heading_1>{children}</Heading_1>;
        case 'h2':
            return <Heading_2>{children}</Heading_2>;
        case 'h3':
            return <Heading_3>{children}</Heading_3>;
        case 'h4':
            return <Heading_4>{children}</Heading_4>;
        case 'h5':
            return <Heading_5>{children}</Heading_5>;
        case 'h6':
            return <Heading_6>{children}</Heading_6>;
    }
    return <div></div>;
}
