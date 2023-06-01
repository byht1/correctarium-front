import styled from 'styled-components'

export const Label = styled.label`
  position: relative;
  width: var(--width-input);

  display: flex;
  flex-direction: column;
`

export const CustomInput = styled.input`
  outline: none;

  padding: 19px 20px;

  border: solid 1px #eeeeee;
  border-radius: 8px;

  font-size: 14px;
  font-stretch: normal;

  background-color: transparent;

  transition: var(--e-focus-border-color);

  &:focus {
    border-color: #0068e4;
  }

  &::placeholder {
    color: #a09d96;
  }
`

export const Text = styled.span`
  opacity: 0;
  position: absolute;
  top: -9px;
  left: 22px;

  font-size: 12px;
  font-weight: 400;
  line-height: normal;

  color: #a0a1a4;
  background-color: var(--background);

  transition: var(--e-focus-color), var(--e-opacity);

  ${CustomInput}:focus + & {
    color: #0068e4;
  }

  ${CustomInput}:not(:placeholder-shown) + & {
    opacity: 1;
  }
`

export const ErrorText = styled.span`
  display: block;
  margin-top: 5px;
  max-width: 100%;

  color: red;
`

export const AfterBox = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-50%);
`
