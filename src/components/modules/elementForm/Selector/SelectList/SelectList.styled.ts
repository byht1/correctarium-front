import styled from 'styled-components'
export const List = styled.ul`
  position: absolute;
  z-index: 2;
  top: calc(100% + 10px);
  left: 0;
  right: 0;

  padding: 12px 0;

  border: solid 1px #eeeeee;
  border-radius: 8px;
  box-shadow: 0 15px 66px #0000000a;
  background-color: var(--background);
`

type PropElement = {
  $isCurrent: boolean
}

export const Element = styled.li<PropElement>`
  padding: 0 20px;
  background-color: ${({ $isCurrent }) => ($isCurrent ? '#eeeeee' : 'var(--background)')};
  transition: var(--e-hover-background);

  &:hover {
    background-color: #eeeeee;
  }
`
