"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormResetBtn = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormResetBtn;
