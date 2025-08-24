import { MongoClient, ObjectId } from "mongodb";
import { permanentRedirect, redirect } from "next/navigation";

// Define the connection URI
const uri = process.env.MONGODB_URI;

export default async function ShortUrlPage({
  params,
}: Readonly<{
  params: Promise<{ shortUrl: string }>;
}>) {
  const { shortUrl } = await params;

  if (!shortUrl) {
    return <div>Homepage or 404 Not Found</div>;
  }

  let result = null;
  let client = null;

  try {
    client = await MongoClient.connect(uri!);
    const db = client.db("sample_mflix");

    result = (await db
      .collection("urls")
      .findOne({ shortUrl: `${shortUrl}` })) as {
      longUrl: string;
      shortUrl: string;
      clicks: number;
      date: Date;
      _id: ObjectId;
    };
    result.clicks += 1;

    await db
      .collection("urls")
      .updateOne({ _id: result._id }, { $set: { clicks: result.clicks } });
  } catch (error) {
    console.error("Database connection or query failed:", error);
    return <div>An error occurred.</div>;
  } finally {
    if (client) {
      await client.close();
    }
  }

  if (result) {
    permanentRedirect(result.longUrl);
  } else {
    return <div>Short URL not found.</div>;
  }
}
