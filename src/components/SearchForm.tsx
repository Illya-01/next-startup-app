import React from "react";
import Form from "next/form";
import SearchFormResetBtn from "./SearchFormResetBtn";
import { SearchIcon } from "lucide-react";

const SarchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search startup"
      />
      <div className="flex gap-2">
        {query && <SearchFormResetBtn />}
        <button type="submit" className="search-btn">
          <SearchIcon className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SarchForm;
