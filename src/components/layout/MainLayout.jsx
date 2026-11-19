/**
 * Single Responsibility Principle (SRP):
 * Page layout shell composing Navbar, page content, and Footer.
 */
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function MainLayout({ children, subtitle, actionButton }) {
  return (
    <>
      <Navbar subtitle={subtitle} actionButton={actionButton} />
      {children}
      <Footer />
    </>
  );
}
