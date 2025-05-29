import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90rem] mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
