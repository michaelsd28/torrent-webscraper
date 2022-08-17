import React, { useState, useContext, useRef } from "react";
import { DataContext } from "../Data Context/Top_context";
import { useHistory } from "react-router-dom";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { useEffect } from "react";
import { useStyles } from "./StylesAutocomplete";

const ip = "https://torrent-app-v2.herokuapp.com/"

const link = ip+"pirate-search/";

function Search_bar() {

  !localStorage.getItem("suggestion")  && localStorage.setItem("suggestion",JSON.stringify([]))


  const inputEl = useRef(null);
  const { setSearch, setInput_value, setSearch_link, setLoading } =
    useContext(DataContext);
  const [state, setState] = useState("");
  const [options, setOptions] = useState("");
  const [openState, setopenState] = useState(false);
  const [hit2, sethit2] = useState(false);
  const [downKEY, setdownKEY] = useState(false);

  const [myArr, setmyArr] = useState(
    JSON.parse(localStorage.getItem("suggestion"))
  );


  const filter_suggestion = myArr.filter(
    (item, index) => myArr.indexOf(item) === index
  );
  localStorage.setItem("suggestion", JSON.stringify(filter_suggestion));

  /* click outside to close */
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!inputEl.current.contains(event.target)) {
        setopenState(false);
      }
    });
  }, []);

  const history = useHistory();

  const pirateSearch = () => {
    let path = "pirate-search";
    history.push(path);
  };

  const classes = useStyles();

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: myArr,
    open: openState,
    getOptionLabel: (option) => option,
    
    onInputChange: (event, value, reason) => {
      try {
        setLoading(false);
        event.key === "Enter" && setopenState(false);

        setOptions(event.target.value);
        setInput_value(event.target.value);
      } catch (error) {
        console.log(error, "error");

        setOptions(value);
        setInput_value(value);
      }
    },

    inputValue: `${options}`,
  });

  return (
    <div >
      <div ref={inputEl} className="text-field-container">
        <div  {...getRootProps()}>
          <input
          className="search-box-top"
            onClick={(e) => {
              setopenState(true);
            }}
            onKeyDown={(event) => {
              event.key === "ArrowDown" && setdownKEY(true);
              event.key === "ArrowDown" && sethit2(false);
              event.key === "Backspace" && setopenState(true);
              if (event.key === "Enter")   setopenState(false);
              

              const eventValue = event.target.value;

              console.log(hit2, "hit2", 1);

              console.log(downKEY, "downKEY");
              if (event.key === "Enter" && downKEY) {

                sethit2(true);
                setopenState(false);
                if (hit2) {
       

                  setSearch(event.target.value);
                  setSearch_link(link);
                  setLoading(false);
                  let path = "pirate-search";
                  sethit2(false);
                  setdownKEY(false);
                  setopenState(false);
                  history.push(path);
                }
              }

              if (
                event.key === "Enter" &&
                event.target.value.length !== 0 &&
                !downKEY
              ) {
                let eventValue = event.target.value;
                setSearch(eventValue);
                !myArr.includes(options) && myArr.push(options);

                setSearch_link(link);
                setLoading(false);
                setopenState(false);

                let path = "pirate-search";

                sethit2(false);
                history.push(path);
              }
            }}
          
            type="Search 🔍"
            placeholder="search"
            size="30"
            {...getInputProps()}
          />

          <span onClick={pirateSearch}>
            <i
              onClick={() => {
                setSearch(options);
                !myArr.includes(options) && myArr.push(options);

                setSearch_link(link);
                setLoading(false);
                setopenState(false);

                let path = "pirate-search";

                sethit2(false);
                history.push(path);
              }}
              className="fas fa-search"
            ></i>
          </span>
        </div>
        {groupedOptions.length > 0 ? (
          <div style={{ zIndex: "100" }} className="sub-container">
            <ul
              className={classes.listbox + " ul-search"}
              {...getListboxProps()}
            >
              {groupedOptions.map((option, index) => (
                <p
                  onClick={(e) => {
                    setState(option);
                    setOptions(option);
                    setInput_value(option);
                    setSearch(option);
                    setopenState(false);
                    setSearch_link(link);
           
                  }}
                  style={{ padding: "0", margin: "0", position: "relative" }}
                  key={index}
                >
                  <li
                    style={{ padding: "5px" }}
                    key={index}
                    className="li-material"
                    {...getOptionProps({ option, index })}
                  >
                    {option}
                  </li>{" "}
                  <p
                    className="trash-suggestion"
                    style={{ padding: "0", margin: "0" }}
                  >
                    <i
                      onClick={() => {
                        myArr.splice(myArr.indexOf(option), 1);
                        console.log(option, "trashed");
                        setopenState(true);
                      }}
                      style={{
                        position: "absolute",
                        left: "230px",
                        top: "6px",
                      }}
                      className="fas fa-trash small-trash"
                    ></i>
                  </p>
                </p>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Search_bar;
