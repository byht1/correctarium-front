import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 16px;

  background-color: #eaeaea;
`

export const FileName = styled.p`
  font-size: 20px;
  font-weight: 700;
`

export const Length = styled.p`
  font-size: 15px;
`

export const AnotherFile = styled.button`
  outline: none;
  margin-top: 5px;

  border-bottom: 1px dashed #999999;

  font-size: 13px;

  color: #999999;
  background-color: transparent;
`
