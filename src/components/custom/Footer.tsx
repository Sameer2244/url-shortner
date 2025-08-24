import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center w-full">
      created by{" "}
      <Link
        href="https://www.linkedin.com/in/sameer-kadam-17834614b/"
        className="text-blue-400 underline ml-1"
        target="_blank"
      >
        Sameer
      </Link>
    </footer>
  );
}
