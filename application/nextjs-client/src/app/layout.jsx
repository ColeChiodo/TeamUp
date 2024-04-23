import { Rubik } from 'next/font/google';
import "../styles/globals.css";
import React from 'react';

const rubik_init = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-rubik'
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${rubik_init.variable} rubik`}>
          {children}
      </body>
    </html>
  );
}