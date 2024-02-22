import React, { ChangeEvent, CSSProperties } from "react";
import {
  AutoCompleteContainer,
  AutoCompleteItem,
} from "./AutoCompleteContainer";
import { AutoCompleteInput } from "./AutoCompleteInput";
import { AutoCompleteItemButton } from "./AutoCompleteItemButton";

export interface AutoCompleteDataItem {
  text: string;
  value: string;
}
export interface AutoCompleteDropdownProps {
  data: AutoCompleteDataItem[];
  onItemSelected: (item: string) => void;
}
interface ComponentState {
  text: string;
  suggestions: any[];
}

interface HightlightTextProps
{
  matching:string;
  completeText:string;
}

const HighlightText : React.FC<HightlightTextProps> = ({matching, completeText}) => {
  return <><span style={{color:'red'}}>{matching}</span><span>{completeText.substring(matching.length, completeText.length)}</span></>;
};

const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({
  data,
  onItemSelected,
}) => {
  const [search, setSearch] = React.useState<ComponentState>({
    text: "",
    suggestions: [],
  });
  const [isComponentVisible, setIsComponentVisible] = React.useState(true);
  const componentStyle: CSSProperties = {
    display: isComponentVisible ? "block" : "none",
    width: "200vw",
    height: "200vh",
    backgroundColor: "transparent",
    position: "fixed",
    zIndex: 0,
    top: 0,
    left: 0,
  };

  const rootStyle: CSSProperties = {
    position: "relative",
    width: "320px",
  };

  const inputStyle: CSSProperties = {
    backgroundColor: "white",
  };

  const autocompleteListStyle: CSSProperties = {
    backgroundColor: "#e6e6e6",
  };
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: any[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data
        .sort()
        .filter((i: AutoCompleteDataItem) => regex.test(i.text));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const handleSuggestionSelected = (sug: AutoCompleteDataItem) => {
    setIsComponentVisible(false);
    setSearch({
      text: sug.text,
      suggestions: [],
    });
    if (onItemSelected) {
      onItemSelected(sug.text);
    }
  };

  const { suggestions } = search;
  return (
    <div style={rootStyle}>
      <div
        onClick={() => setIsComponentVisible(false)}
        style={componentStyle}
      />
      <div>
        <AutoCompleteInput
          id="input"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type={"text"}
          style={inputStyle}
        />
      </div>
      {suggestions.length > 0 && isComponentVisible && (
        <AutoCompleteContainer style={autocompleteListStyle}>
          {suggestions.map((item: AutoCompleteDataItem) => (
            <AutoCompleteItem key={item.value}>
              <AutoCompleteItemButton
                key={item.value}
                onClick={() => handleSuggestionSelected(item)}
              >
                <HighlightText matching={search.text} completeText={item.text} />
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )}
    </div>
  );
};

export default AutoCompleteDropdown;
