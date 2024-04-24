'use client'

import { useContext } from 'react';
import NavigationBar from "@/components/NavigationBar"
import React, { useState } from 'react';
import Footer from "@/components/Footer"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    return (
        <section>
            <NavigationBar />
            {children}
            <Footer />
        </section>
    )
}