import { FormModal } from "@/components/custom/FormModal";
import RedirectComponent from "@/components/custom/RedirectComponent";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShortUrl } from "@/type";
import { getAllLinks } from "./actions";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

export default async function Home() {
  const response = await getAllLinks();
  const links = (await response.json()) as ShortUrl[];
  return (
    <>
      <Header />
      <div className="flex min-h-[90vh] flex-col items-center justify-start">
        <div className="w-[60rem] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">URL Shortner</h1>
            <FormModal />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Original URL</TableHead>
                <TableHead>Shortened URL</TableHead>
                <TableHead className="w-[4rem]">Clicks</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>
                    {link.longUrl.length > 40
                      ? link.longUrl.slice(0, 40) + "..."
                      : link.longUrl}
                  </TableCell>
                  <TableCell>
                    <RedirectComponent shortUrl={link.shortUrl} />
                  </TableCell>
                  <TableCell>{link.clicks}</TableCell>
                  <TableCell>
                    {new Date(link.date).toLocaleDateString("en-GB")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </>
  );
}
