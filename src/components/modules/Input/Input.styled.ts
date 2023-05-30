import styled from 'styled-components'

export const Label = styled.label`
  position: relative;

  &:focus {
    color: #0068e4;
  }
`

export const CustomInput = styled.input`
  outline: none;

  width: 345px;
  padding: 19px 20px;

  border: solid 1px #eeeeee;
  border-radius: 8px;

  font-size: 14px;
  font-stretch: normal;

  ${Label}:focus & {
    border-color: #0068e4;
  }
`

export const Text = styled.span`
  padding: 19px 20px;
`

export const ErrorText = styled.span``
