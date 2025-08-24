"use client";

import { addLink } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2Icon, Copy, CopyCheck } from "lucide-react";

export function FormModal() {
  const [originalUrl, setOriginalUrl] = useState("");
  const generateShortLink = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  const [shortenLink, setShortenLink] = useState("");
  const [showCopyLink, setShowCopyLink] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [error, setError] = useState(false);
  const validateLink = (link: string) => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return regex.test(link);
  };
  const handleShortenLink = async () => {
    if (validateLink(originalUrl)) {
      const payload = {
        longUrl: originalUrl,
        shortUrl: generateShortLink(),
        clicks: 0,
        date: new Date(),
      };
      setShortenLink(payload.shortUrl);
      setShowCopyLink(true);
      const response = await addLink(payload);
      console.log(response);
      if (response) {
        setOriginalUrl("");
        console.log("success");
      }
    } else {
      setError(true);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Add Link
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-1">Shorten a link!</AlertDialogTitle>
          <AlertDialogDescription>
            <Label className="mb-2">Original Link</Label>
            <Input
              placeholder="paste the link you want to shorten"
              value={originalUrl}
              onChange={(e) => {
                setError(false);
                setOriginalUrl(e.target.value);
              }}
            />
            {error && (
              <Alert className="mt-4 fade-in-25">
                <AlertTitle className="mb-2 text-red-600">
                  Invalid link
                </AlertTitle>
                <AlertDescription>Please enter a valid link</AlertDescription>
              </Alert>
            )}
            {showCopyLink && (
              <Alert className="mt-4 fade-in-25">
                <CheckCircle2Icon color="green" />
                <AlertTitle className="mb-2 text-green-600">
                  Success! Your shorted link has been created
                </AlertTitle>
                <AlertDescription>
                  <div className="flex justify-between w-full">
                    {process.env.NEXT_PUBLIC_BASE_URL}
                    {shortenLink}
                    <div className="flex gap-2">
                      <span>{copyLink ? "Copied!" : "Copy to clipboard"}</span>
                      {copyLink ? (
                        <CopyCheck className=" text-green-500" />
                      ) : (
                        <Copy
                          color="black"
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${process.env.NEXT_PUBLIC_BASE_URL}${shortenLink}`
                            );
                            setCopyLink(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setTimeout(() => {
                setError(false);
                setShowCopyLink(false);
                setCopyLink(false);
                setOriginalUrl("");
              }, 500);
            }}
          >
            Close
          </AlertDialogCancel>
          {!showCopyLink && (
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleShortenLink();
              }}
            >
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
