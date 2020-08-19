import React from 'react';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  & + & {
    margin-top: 15px;
  }
`;

const StyledInputElement = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;
  font-size: 14px;
  padding: 5px 12.5px;
`;

interface InputProps {
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function StyledInput(props: InputProps) {
  return (
    <StyledInputWrapper>
      {props.icon && props.icon}
      <StyledInputElement placeholder={props.placeholder} type={props.type} onChange={props.onChange} name={props.name} value={props.value} />
    </StyledInputWrapper>
  );
}

export default StyledInput;
