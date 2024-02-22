import styled from "styled-components";

export const ValueWrapper = styled.input`
  box-sizing: border-box;   
  line-height: 32px; 
  border-radius: 1px;
  border: 1px solid #b6c1ce;  
  width: 100%;
  height: 32px;
  padding-left: 8px;
  padding-right: 32px;

`;

export const AutoCompleteIcon = styled.span`
  height: 32px;
  width: 32px;  
  position: absolute;
  transition: all 150ms linear;
  transform: ${(props: any) => (props.isOpen ? "rotate(0.5turn)" : "none")};
  transform-origin: center;
  display: flex;
  top: 0;
  right: 0;

  svg {
    margin: auto;
  }

  ${ValueWrapper}:focus + & {
    color: ${(props: any) => props.color || "0063cc"};
    fill: ${(props: any) => props.fill || "0063cc"};
  }
`;

export const AutoCompleteInput = styled(ValueWrapper)`
  transition: border-color 150ms linear;
  &:focus {
    border-color: #0063cc;
    outline: none;
    + ${AutoCompleteIcon} {
      color: ${(props: any) => props.color || "0063cc"};
      fill: ${(props: any) => props.fill || "0063cc"};
    }
  }
`;