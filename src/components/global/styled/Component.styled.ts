import styled from 'styled-components'
import { device } from './mediaRules'

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;

  ${device.tablet} {
    & {
      padding: 0 60px;
    }
  }
`
