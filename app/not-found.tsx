import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");

  return (
    <div className="flex flex-col justify-center items-center mx-auto text-center ">
      <Image height={200} width={400} src="/images/404.png" alt="404" />
      <div className="w-3/4 space-y-4">
        <h2 className="font-bold">Page Not Found</h2>
        <p>Could not find requested resource</p>
        <p className="italic">
          View{" "}
          <Link href="/post" className="underline">
            All posts
          </Link>
        </p>
      </div>
    </div>
  );
}
