import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="w-100 my-3">
      <InputGroup className="search-box">
        <Form.Control
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          className="border-0 search-input"
        />
        <InputGroup.Append>
          <Button type="submit" variant="primary" className="search-button">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
