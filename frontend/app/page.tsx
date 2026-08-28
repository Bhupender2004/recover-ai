"use client";

import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ExecutiveMetrics } from "../components/ExecutiveMetrics";
import { PaymentAnalyzer } from "../components/PaymentAnalyzer";
import { PrioritizedPaymentsTable } from "../components/PrioritizedPaymentsTable";
import { WhoBenefits } from "../components/WhoBenefits";
import { BusinessValue } from "../components/BusinessValue";
import { HowItWorks } from "../components/HowItWorks";
import { EnterpriseTrust } from "../components/EnterpriseTrust";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* 1. TOP NAVIGATION */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HERO SECTION */}
        <Hero />

        {/* EXECUTIVE METRICS CARDS */}
        <ExecutiveMetrics />

        {/* MAIN AI DECISION ENGINE & ANALYZER */}
        <PaymentAnalyzer />

        {/* AI-PRIORITIZED PAYMENTS QUEUE */}
        <PrioritizedPaymentsTable />

        {/* WHO BENEFITS FROM RECOVERAI */}
        <WhoBenefits />

        {/* BUSINESS VALUE & RECOVERY PIPELINE */}
        <BusinessValue />

        {/* 4-STEP SYSTEM ARCHITECTURE */}
        <HowItWorks />

        {/* ENTERPRISE TRUST & STACK */}
        <EnterpriseTrust />

      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}