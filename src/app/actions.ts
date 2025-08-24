"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function getAllLinks() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("urls");
    const data: unknown = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function addLink(body: {
  longUrl: string;
  shortUrl: string;
  clicks: number;
}) {
  try {
    const { longUrl, shortUrl, clicks } = body;
    //example short url
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("urls");
    const result = await collection.insertOne({
      longUrl,
      shortUrl,
      clicks,
      date: new Date(),
    });
    revalidatePath("/");
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add link" }, { status: 500 });
  }
}
export async function revalidateAndRedirect(path: string) {
  let timeout = null;
  await new Promise((resolve) => (timeout = setTimeout(resolve, 2000)));
  if (timeout) clearTimeout(timeout);

  revalidatePath(path);
}
