import React from 'react'
import { Box, ContactBox, FooterBox, Img, Wrapper } from './Footer.styled'
import { Container } from 'src/components/global/styled'
import Logo from './img/logo.png'

export const Footer = () => {
  return (
    <FooterBox>
      <Container>
        <Wrapper>
          <Box>
            <p>Договір публічної оферти</p>
            <p>&copy; Correctarium</p>
            <time>2015–2023</time>
          </Box>
          <Img src={Logo} alt="logo" />
          <ContactBox>
            <p>Надіслати текст на переклад:</p>
            <a href="mailto:manager@correctarium.com">manager@correctarium.com</a>
          </ContactBox>
        </Wrapper>
      </Container>
    </FooterBox>
  )
}
