import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Healthline Dashboard",
  description: "Manage hospital data securely",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100" style={{ backgroundColor: '#F1F8F9' }} >
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

