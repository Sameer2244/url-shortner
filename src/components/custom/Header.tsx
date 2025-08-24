import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-end w-full py-4 px-5">
      <Link
        href="https://github.com/Sameer2244/url-shortner"
        className="text-blue-400 underline ml-1"
        target="_blank"
      >
        click here for source code
      </Link>
    </header>
  );
}
