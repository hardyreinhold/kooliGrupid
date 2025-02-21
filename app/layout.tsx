import "tailwindcss/tailwind.css";
import "./globals.css"
import Link from "next/link";

export const metadata = {
  title: "kooliGrupid",
  description: "A web app for groups",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header className="fixed w-full h-[10px] grid grid-cols-[1fr_auto_100px] gap-10 h-15 p-4">
          <Link href="/ "className="flex-grow ">kooliGrupid</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </Link>
          <Link href="/opetaja" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign up
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
