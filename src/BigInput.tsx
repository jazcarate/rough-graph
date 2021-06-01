import styled from 'styled-components';
import { color } from './GlobalStyle';


export default function BigInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <Wrapper>
      <InputField placeholder={label} {...rest} />
      <Label>{label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
`;

const Label = styled.label`
  position: absolute;
  z-index: -1;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${color};
`;

const InputField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${color};
  outline: 0;
  font-size: 1.3rem;
  color: ${color};
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  &:required,&:invalid { box-shadow:none; }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ ${Label} {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ ${Label} {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #db7093;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #db7093, #fd1bf9);
    border-image-slice: 1;
  }
`;
