import { device } from 'src/components/global/styled'
import styled from 'styled-components'

export const FooterBox = styled.footer`
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  font-weight: 400;

  background-color: #fcfcfc;

  ${device.tablet} {
    & {
      text-align: left;
    }
  }

  & a {
    text-decoration: underline;

    color: #454c5d;
    transition: var(--e-focus-color);

    &:hover {
      color: #4a90e2;
    }
  }
`

export const Wrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 41px;

  ${device.tablet} {
    & {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`

export const Img = styled.img`
  width: 110px;
  ${device.mobileM} {
    & {
      order: 1;
    }
  }
`

export const Box = styled.div`
  ${device.mobileM} {
    & {
      order: 3;
    }
  }
`

export const ContactBox = styled.div`
  ${device.mobileM} {
    & {
      order: 2;
    }
  }
`
