import { device } from 'src/components/global/styled'
import styled from 'styled-components'

export const BoardWrapper = styled.div`
  & p {
    text-align: center;
    color: #0068e4;

    ${device.tablet} {
      & {
        text-align: right;
      }
    }
  }

  & p span {
    font-size: 60px;
    font-weight: 100;
    font-stretch: normal;
    line-height: 1.37;
    letter-spacing: -0.19px;

    color: #0068e4;
  }
`

export const ButtonSubmit = styled.button`
  display: block;
  margin: 30px auto 0 auto;
  padding: 18px 20px;
  width: 260px;

  border-radius: 8px;

  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.05px;
  text-align: center;

  box-shadow: 0 11px 19px #00000029;
  background-color: #1b2235;
  color: #ffffff;

  transition: var(--e-hover-background), var(--e-box-shadow);

  ${device.tablet} {
    & {
      margin-left: auto;
      margin-right: 0;
    }
  }

  &:hover,
  &:focus {
    background-color: #252e47;
    box-shadow: 0 7px 14px #00000029;
  }
`
