import { device } from 'src/components/global/styled'
import styled from 'styled-components'

export const Title = styled.h2`
  width: 100%;
  margin-bottom: 38px;

  font-size: 30px;
  font-stretch: normal;
  line-height: 1.47;
  letter-spacing: normal;

  ${device.tablet} {
    & {
      margin-bottom: 70px;
    }
  }
`
