import styled from 'styled-components'

export const ArrowButton = styled.button`
  outline: none;

  position: absolute;
  top: 50%;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  transform: translateY(-50%) rotate(0);

  transition: var(--e-transform);

  &.show {
    transform: translateY(-50%) rotate(180deg);
  }
`
