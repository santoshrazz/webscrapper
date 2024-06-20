"use client";
import React, { FormEvent, useState } from "react";
import { scrapAndStoreAmazonProduct } from "../lib";

export const InputComponent = () => {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setloading] = useState(false);
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setloading(true);
      const response = await scrapAndStoreAmazonProduct(searchParams);
    } catch (error: any) {
      console.log(`An error occured while while fetching data `, error.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        className="p-4 m-4 min-w-36 bg-slate-400/30 focus:border-none focus:outline-none text-black"
        placeholder="Enter Link"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      ></input>
      <button
        type="submit"
        className="inline-flex items-center bg-blue-900 hover:bg-blue-700 text-white justify-center px-5 py-3 text-base font-medium text-center  border border-gray-300 rounded-lg  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
