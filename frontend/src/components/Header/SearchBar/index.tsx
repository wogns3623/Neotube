import React from "react";
import Icon from "components/Icon";
import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <form className="SearchBar">
      <div className={"input-box"}>
        <input type="text" placeholder="검색"></input>

        <Icon className="vkb">
          <img
            src="https://www.gstatic.com/inputtools/images/tia.png"
            alt="virtual keyboard"
          />
        </Icon>
      </div>

      <Icon type="search" />
    </form>
  );
};

export default SearchBar;
