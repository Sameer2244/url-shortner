"use client";

import React from "react";
import { Button } from "../ui/button";
import { revalidateAndRedirect } from "@/app/actions";

export default function RedirectComponent({
  shortUrl,
}: Readonly<{ shortUrl: string }>) {
  return (
    <div>
      <Button
        variant={"link"}
        onClick={() => {
          window.open(
            `${process.env.NEXT_PUBLIC_BASE_URL}${shortUrl}`,
            "_blank"
          );
          revalidateAndRedirect(shortUrl);
        }}
        className="text-sm text-blue-500 hover:underline cursor-pointer"
      >{`${process.env.NEXT_PUBLIC_BASE_URL}${shortUrl}`}</Button>
    </div>
  );
}
