import React from "react";
import "./App.css";
import AutoCompleteDropdown from "./components/AutoCompleteDropdown";
import { CSSProperties } from "styled-components";
import { AutoCompleteDataItem } from "./components/AutoCompleteDropdown/AutoCompleteDropdown";
import { getCountries } from "./services/country-service";

function App() {
  const [selectedItem, setSelectedItem] = React.useState("");
  const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  };
  const [data, setData] = React.useState<AutoCompleteDataItem[]>([
    { text: "Loading", value: "NN" },
  ]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getCountries();
    const nData: AutoCompleteDataItem[] = [];
    if (res && res.data) {
      res.data.forEach((it: any) => {
        nData.push({ text: it.name.common, value: it.fifa });
      });
    }
    setData(nData);
  };
  return (
    <div className="App">
      <h2>Autocomplete component sample</h2>
      <div style={containerStyle}>
        <span>Choose a country: </span>
        <AutoCompleteDropdown data={data} onItemSelected={setSelectedItem} />
      </div>
      <h4>Selected Item: {selectedItem}</h4>
    </div>
  );
}

export default App;
