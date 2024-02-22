import styled from "styled-components";

export const AutoCompleteContainer = styled.ul`
  border-radius: 2px;
  margin: 0;
  position: absolute;
  box-sizing: border-box;
  max-height: 280px;
  overflow-y: auto;
  z-index: 1;
  background: #fff;
  padding: 8px 0;
  list-style-type: none;
  min-width: 320px;
 
  top: 100%;
  left: 0;
  border: 1px solid #b6c1ce;
 
`;

export const AutoCompleteItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 0 24px;
  &:hover {
    background-color: #ebf4ff;
  }
`;