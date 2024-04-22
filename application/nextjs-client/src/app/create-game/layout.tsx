'use client'

import { useContext } from 'react';
import NavigationBar from "@/components/NavigationBar"
import React, { useState } from 'react';

export default function CreateGameLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    

    return (
        <section>
            <NavigationBar />
            {children}
        </section>
    )
}