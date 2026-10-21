import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Christian Sandoval | Soul & Tech",
  description: "Senior UX/UI Developer & Frontend Architect. Putting soul into code through storytelling and research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  // Forzamos 'light' como valor predeterminado si no hay preferencia guardada
                  if (!theme) theme = 'light';
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${jetbrains.variable}`}>
        <div className="noise-bg" />
        <CustomCursor />
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
