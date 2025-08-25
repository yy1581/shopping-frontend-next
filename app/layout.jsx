import Header from "@/components/Header";
import { LocaleProvider } from "@/lib/contexts/LocaleContext";
import "./globals.css";

export const metadata = {
  title: "Ymazon",
  description: "Welcome to Ymazon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LocaleProvider defaultValue="ko">
          <Header />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
