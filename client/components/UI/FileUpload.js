import styled from 'styled-components';
import { useState } from 'react';
import { COLOR__PRIMARY } from './variables';

const InputWrapper = styled.div`

`;
const Label = styled.label`
    display: inline-block;
    background-color: ${COLOR__PRIMARY};
    color: white;
    text-transform: uppercase;
    font-size: 1.1rem;
    padding: 10px 24px;
    transition: all 0.2s ease;
    margin: 0;
    
    &:hover {
        opacity: 0.9;
        cursor: pointer;
    }
`;

const Input = styled.input`
    display: none;
`;
export default function FileUpload({onChange, value, name, title}) {
    let [file, setFile] = useState(null);

    let handleChange = function(e) {
        setFile(e.target.files[0]);
        onChange(e)
    }

    return (
        <InputWrapper>
            <Label htmlFor="upload">{file ? file.name : title}</Label>
            <Input name={name} value={value} id="upload" type="file" onChange={handleChange}/>
        </InputWrapper>
    );
}
