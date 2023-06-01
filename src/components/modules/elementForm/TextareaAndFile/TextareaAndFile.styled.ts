import { device } from 'src/components/global/styled'
import styled from 'styled-components'

export const UserContentsWrapper = styled.div`
  position: relative;
  max-width: calc(100% - 30px);
  min-height: 200px;

  display: flex;
  flex-direction: column;

  ${device.tablet} {
    & {
      max-width: 660px;
    }
  }
`

export const Textarea = styled.textarea`
  outline: none;

  width: 100%;
  min-width: var(--width-input);
  min-height: 200px;
  padding: 20px 30px;
  overflow: auto;
  resize: none;

  border: 1px solid #eeeeee;
  border-radius: 16px;

  font-size: 100%;
  line-height: 1.15;

  background-color: transparent;

  transition: var(--e-focus-border-color);

  &:focus {
    border-color: #0068e4;
  }
`

export const FileWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;

  font-size: 14px;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: -0.05px;
`

export const DownloadText = styled.span`
  cursor: pointer;
  color: #0068e4;
`
