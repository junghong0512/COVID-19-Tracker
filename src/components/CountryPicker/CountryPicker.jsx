import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl>
      <NativeSelect
        className={styles.formControl}
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((fetchedCountry, index) => (
          <option key={index} value={fetchedCountry}>
            {fetchedCountry}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
