import React, { useEffect, useState } from "react";
import "./selector.scss";

const Selector = () => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  return (
    <div className="box">
      <div
        onClick={() => setOpen(!open)}
        className="select"
        style={{
          color: !selected && "#4a5568",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "0.25rem",
        }}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ transform: open && "rotate(180deg)" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2736 11.4934C14.4348 11.3423 14.4429 11.0891 14.2918 10.928L8.29184 4.52798C8.21622 4.44732 8.11059 4.40156 8.00002 4.40156C7.88946 4.40156 7.78383 4.44732 7.70821 4.52798L1.70821 10.928C1.55712 11.0892 1.56528 11.3423 1.72645 11.4934C1.88761 11.6445 2.14075 11.6363 2.29184 11.4751L8.00002 5.38641L13.7082 11.4751C13.8593 11.6363 14.1124 11.6445 14.2736 11.4934Z"
            fill="#FF3E5B"
          />
        </svg>
      </div>
      <ul
        className="dropdown"
        style={open ? { maxHeight: "15rem" } : { maxHeight: "0rem" }}
      >
        <div className="input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search"
            className="list"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="icons"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.69565 2C4.99775 2 2 4.99775 2 8.69565C2 12.3936 4.99775 15.3913 8.69565 15.3913C10.3646 15.3913 11.891 14.7807 13.0635 13.7706L17.1464 17.8536C17.3417 18.0488 17.6583 18.0488 17.8536 17.8536C18.0488 17.6583 18.0488 17.3417 17.8536 17.1464L13.7706 13.0635C14.7807 11.891 15.3913 10.3646 15.3913 8.69565C15.3913 4.99775 12.3936 2 8.69565 2ZM3 8.69565C3 5.55003 5.55003 3 8.69565 3C11.8413 3 14.3913 5.55003 14.3913 8.69565C14.3913 11.8413 11.8413 14.3913 8.69565 14.3913C5.55003 14.3913 3 11.8413 3 8.69565Z"
              fill="#FF3E5B"
            />
          </svg>
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            style={{
              padding: "0.5rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              backgroundColor:
                country?.name?.toLowerCase() === selected?.toLowerCase()
                  ? "#4299e1"
                  : "",
              color:
                country?.name?.toLowerCase() === selected?.toLowerCase()
                  ? "#ffffff"
                  : "",
              display: country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "none",
            }}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
