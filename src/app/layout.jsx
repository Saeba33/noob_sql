import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
  title: "NoobSQL",
  description: "Apprenez SQL avec le système de ceintures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.js"
        ></script>
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
