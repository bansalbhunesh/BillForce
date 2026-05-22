"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [amount, setAmount] = useState<number | "">("");
  const [days, setDays] = useState<number | "">("");

  const amt = Number(amount) || 0;
  const d = Number(days) || 0;
  
  let tax = 0;
  let interest = 0;
  let total = 0;

  if (amt && d) {
    tax = amt * 0.30;
    interest = amt * 0.18 * (d / 365);
    total = tax + interest;
  }

  const formatCurrency = (n: number) => {
    if (!n) return "₹ —";
    return '₹ ' + Math.round(n).toLocaleString('en-IN');
  };

  return (
    <>
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-paper border-b border-border flex items-center justify-between px-10 h-14">
        <div className="font-mono font-medium text-[13px] tracking-widest text-ink uppercase">
          Bill<span className="text-accent">Force</span>
        </div>
        <a 
          href="#pricing"
          className="bg-accent text-white border-none rounded text-[13px] font-medium px-5 py-2 cursor-pointer transition-colors hover:bg-[#a33508]"
        >
          Start for ₹299/mo
        </a>
      </nav>

      {/* TICKER */}
      <div className="bg-accent text-white py-2 overflow-hidden font-mono text-xs tracking-wider">
        <div className="flex gap-16 animate-scroll whitespace-nowrap">
          <span>Section 43B(h) — effective April 2024</span>
          <span>•</span>
          <span>45 days to pay MSME invoices</span>
          <span>•</span>
          <span>Tax disallowance on unpaid amounts</span>
          <span>•</span>
          <span>52% of B2B payments already overdue</span>
          <span>•</span>
          <span>Section 43B(h) — effective April 2024</span>
          <span>•</span>
          <span>45 days to pay MSME invoices</span>
          <span>•</span>
          <span>Tax disallowance on unpaid amounts</span>
          <span>•</span>
          <span>52% of B2B payments already overdue</span>
          <span>•</span>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-[calc(100vh-56px)] grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-10 py-12 md:py-20 gap-10 md:gap-16 max-w-7xl mx-auto relative">
        <div>
          <div className="inline-block font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-accent border border-accent px-2.5 py-1 rounded-sm mb-6 opacity-0 animate-fadeup" style={{ animationDelay: '0.1s' }}>
            For MSME suppliers
          </div>
          <h1 className="font-serif text-4xl md:text-[3.8rem] leading-[1.15] tracking-tight opacity-0 animate-fadeup" style={{ animationDelay: '0.2s' }}>
            Stop chasing payments.<br/>
            <em className="text-accent italic">Send a notice</em><br/>
            that actually works.
          </h1>
          <p className="mt-6 text-[17px] text-muted leading-relaxed max-w-[440px] opacity-0 animate-fadeup" style={{ animationDelay: '0.3s' }}>
            Section 43B(h) makes your buyer lose tax deductions for every day they delay past 45 days. We turn that into a legally formatted notice in 2 minutes — without a CA, without a lawyer.
          </p>
          <div className="flex flex-wrap gap-3 mt-10 opacity-0 animate-fadeup" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/supplier"
              className="bg-accent text-white rounded font-medium text-[15px] px-7 py-3.5 transition-all hover:bg-[#a33508] hover:-translate-y-px"
            >
              Generate my first notice →
            </Link>
            <a 
              href="#how"
              className="bg-transparent text-ink border border-border rounded font-normal text-[15px] px-7 py-3.5 transition-all hover:border-ink hover:-translate-y-px"
            >
              See how it works
            </a>
          </div>
          <div className="mt-10 flex gap-8 opacity-0 animate-fadeup" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-[1.8rem] text-accent2">45</span>
              <span className="text-xs text-muted">days — legal deadline</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-[1.8rem] text-accent2">30%</span>
              <span className="text-xs text-muted">tax disallowance on delays</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-[1.8rem] text-accent2">2 min</span>
              <span className="text-xs text-muted">to generate your notice</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-md shadow-[8px_12px_40px_rgba(0,0,0,0.08)] p-8 relative opacity-0 animate-fadein" style={{ animationDelay: '0.5s' }}>
          <div className="absolute -top-2.5 left-5 bg-paper2 text-muted font-mono text-[10px] tracking-widest px-2 py-0.5 border border-border rounded-sm">
            NOTICE PREVIEW
          </div>
          <div className="border-b-2 border-ink pb-3 mb-4">
            <div className="font-serif text-[1.1rem]">Payment Notice under Section 43B(h)</div>
            <div className="text-[11px] text-muted font-mono mt-0.5">Income Tax Act, 1961 — MSME Development Act, 2006</div>
          </div>
          <div className="text-[12.5px] leading-relaxed text-[#2a2520]">
            <p>To: <strong>Ramesh Auto Components Pvt. Ltd.</strong></p>
            <p className="mt-2">This notice pertains to Invoice <strong>INV-2024-0891</strong> dated <strong>14 Jan 2025</strong> for services rendered, in the amount of <strong>₹8,40,000</strong>.</p>
            <p className="mt-2">As a registered MSME under Udyam Registration <strong>UDYAM-PB-06-0042381</strong>, the undersigned is protected under the MSMED Act, 2006. Under Section 43B(h) of the Income Tax Act, 1961, any unpaid MSME dues beyond 45 days become <strong>non-deductible</strong> for the payer in the relevant financial year.</p>
            
            <div className="bg-[#fff8f5] border border-[#f5c4b3] rounded px-3.5 py-2.5 my-3.5 grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] text-muted font-mono uppercase">Invoice amount</div>
                <div className="text-[14px] font-medium text-accent">₹8,40,000</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] text-muted font-mono uppercase">Days overdue</div>
                <div className="text-[14px] font-medium text-accent">62 days</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] text-muted font-mono uppercase">Tax disallowance at 30%</div>
                <div className="text-[14px] font-medium text-accent">₹2,52,000</div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] text-muted font-mono uppercase">Interest accrued</div>
                <div className="text-[14px] font-medium text-accent">₹17,430</div>
              </div>
            </div>
            
            <p className="text-[12px]">Payment is requested immediately to avoid further tax implications. This notice is generated under the provisions of Section 43B(h) and may be referenced in Form 3CD filing.</p>
          </div>
          <div className="text-[11px] text-muted mt-3 border-t border-border pt-2.5">
            Generated by BillForce · Udyam verified · Legally formatted
          </div>
          
          <div className="absolute bottom-5 right-5 w-16 h-16 rounded-full border-2 border-[#c8440a33] flex items-center justify-center font-mono text-[8px] text-center text-accent tracking-wider -rotate-12 opacity-50">
            SECTION<br/>43B(h)<br/>NOTICE
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="bg-ink text-paper py-20 px-6 md:px-10">
        <div className="max-w-[860px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-5">The reality</div>
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-normal leading-[1.2] mb-6">
            You built something. They used it.<br/>Now they <em className="italic text-[#f5a882]">won't pay.</em>
          </h2>
          <p className="text-[#b8b4ac] max-w-[560px] mt-4 text-[15px]">
            A WhatsApp message gets ignored. A phone call gets deferred. But a legal notice citing the exact tax penalty your buyer is accruing? That gets read by the finance team — today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="border border-white/10 rounded-md p-6">
              <div className="font-serif text-[2.8rem] text-accent leading-none mb-2">₹25L</div>
              <p className="text-[14px] text-[#b8b4ac] leading-relaxed">
                The tax hit a company faces on ₹1 crore of unpaid MSME invoices held past March 31. Most finance teams don't know until their CA tells them at audit.
              </p>
            </div>
            <div className="border border-white/10 rounded-md p-6">
              <div className="font-serif text-[2.8rem] text-accent leading-none mb-2">52%</div>
              <p className="text-[14px] text-[#b8b4ac] leading-relaxed">
                of B2B payments in India are already overdue beyond 90 days. Your buyer is probably already non-compliant and doesn't know it.
              </p>
            </div>
            <div className="border border-white/10 rounded-md p-6">
              <div className="font-serif text-[2.8rem] text-accent leading-none mb-2">45</div>
              <p className="text-[14px] text-[#b8b4ac] leading-relaxed">
                days is the legal limit. After that, your buyer's tax deduction disappears. After 60 days, bank interest on your unpaid dues is not deductible either.
              </p>
            </div>
            <div className="border border-white/10 rounded-md p-6">
              <div className="font-serif text-[2.8rem] text-accent leading-none mb-2">₹0</div>
              <p className="text-[14px] text-[#b8b4ac] leading-relaxed">
                is what a CA charges to send a notice like this. But a CA visit costs ₹5,000–15,000 and takes a week to schedule. BillForce generates it in 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-3 text-center">How it works</div>
        <h2 className="font-serif text-3xl md:text-[2.6rem] font-normal mb-12 text-center">
          Four steps. Two minutes.<br/>A notice that means business.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Upload your invoice", desc: "Photo, PDF, or fill a form. We extract the date, amount, and buyer details automatically." },
            { num: "02", title: "We verify your Udyam", desc: "Enter your Udyam number once. We auto-verify via the government API and embed it in every notice." },
            { num: "03", title: "Notice generated", desc: "A formatted PDF: invoice details, days overdue, exact tax exposure for the buyer, Section 43B(h) citation." },
            { num: "04", title: "Send via WhatsApp", desc: "Share the PDF directly from WhatsApp. Buyer's finance team gets a trackable link showing their live tax exposure." },
          ].map((step, i) => (
            <div key={i} className="flex flex-col gap-2 p-6 bg-paper2 rounded-md border border-border relative">
              <div className="font-mono text-[11px] text-muted tracking-widest">{step.num} —</div>
              <div className="text-[15px] font-medium">{step.title}</div>
              <div className="text-[13px] text-muted leading-relaxed">{step.desc}</div>
              {i < 3 && <div className="hidden lg:block absolute -right-[15px] top-1/2 -translate-y-1/2 text-muted text-[18px]">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-2">Tax exposure calculator</div>
        <h2 className="font-serif text-3xl md:text-[2.4rem] font-normal mb-2">See what your buyer is losing<br/>by not paying you.</h2>
        <p className="text-muted mb-10 text-[15px]">Enter the invoice details below. This is exactly what appears in your notice.</p>
        
        <div className="bg-paper2 border border-border rounded-lg p-8">
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="font-mono text-[12px] text-muted tracking-wide">Invoice amount (₹)</label>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
              placeholder="e.g. 500000"
              className="border border-border rounded bg-white px-3.5 py-2.5 font-sans text-[16px] text-ink outline-none transition-colors focus:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="font-mono text-[12px] text-muted tracking-wide">Days overdue (beyond 45 days)</label>
            <input 
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value ? Number(e.target.value) : "")}
              placeholder="e.g. 30"
              className="border border-border rounded bg-white px-3.5 py-2.5 font-sans text-[16px] text-ink outline-none transition-colors focus:border-accent"
            />
          </div>
          
          <div className="bg-ink text-paper rounded-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-[#888] font-mono uppercase">Tax disallowance (30%)</div>
              <div className="font-serif text-[1.6rem] text-[#f5a882]">{formatCurrency(tax)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-[#888] font-mono uppercase">Interest accrued</div>
              <div className="font-serif text-[1.6rem] text-[#f5a882]">{formatCurrency(interest)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-[#888] font-mono uppercase">Total buyer exposure</div>
              <div className="font-serif text-[1.6rem] text-[#f5a882]">{formatCurrency(total)}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[11px] text-[#888] font-mono uppercase">Cost of your notice</div>
              <div className="font-serif text-[1.6rem] text-paper">₹299 / mo</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/supplier"
              className="inline-block bg-accent text-white rounded font-medium text-[15px] px-7 py-3.5 transition-all hover:bg-[#a33508] hover:-translate-y-px"
            >
              Generate this notice now →
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 md:px-10 bg-paper2">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-2">Pricing</div>
          <h2 className="font-serif text-3xl md:text-[2.4rem] font-normal mb-2">One price. Unlimited notices.</h2>
          <p className="text-muted text-[15px] mb-10">Less than what you'd lose in one day of delayed payment.</p>
          
          <div className="bg-white border border-border rounded-lg p-10 text-left relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-mono text-[10px] tracking-widest px-3.5 py-1 rounded-full whitespace-nowrap">
              SUPPLIER PLAN — MOST POPULAR
            </div>
            <div className="mt-2 text-[13px] text-muted font-mono">MONTHLY</div>
            <div className="font-serif text-5xl text-ink mt-2 mb-0">
              ₹299 <span className="text-[1rem] font-sans text-muted font-normal">/ month</span>
            </div>
            <div className="text-[12px] text-muted mb-6">No setup fee · Cancel anytime · Works on any Android</div>
            
            <ul className="flex flex-col gap-2.5 my-6">
              {[
                "Unlimited Section 43B(h) notice generation",
                "Udyam auto-verification (one-time setup)",
                "Tax exposure calculator embedded in every notice",
                "WhatsApp-ready PDF delivery",
                "Notice history and read-receipts",
                "Hindi + English notice language",
                "Form 3CD reference numbers auto-generated"
              ].map((feat, i) => (
                <li key={i} className="text-[14px] flex gap-2 items-start">
                  <span className="text-accent2 font-medium shrink-0">✓</span>
                  {feat}
                </li>
              ))}
            </ul>
            
            <Link 
              href="/supplier"
              className="block w-full text-center bg-ink text-paper rounded border-none font-sans text-[15px] font-medium p-3.5 mt-4 transition-colors hover:bg-[#2a2520]"
            >
              Start generating notices →
            </Link>
            <div className="text-center text-[12px] text-muted mt-4">
              30-day money back if your first notice doesn't get a response.
            </div>
          </div>
          
          <p className="mt-6 text-[13px] text-muted text-center">
            Need the buyer-side dashboard for your finance team?{" "}
            <Link href="/dashboard" className="text-accent no-underline hover:underline">
              See Buyer Plan →
            </Link>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-10 flex flex-col md:flex-row items-center justify-between text-[13px] text-muted gap-4">
        <div className="font-mono font-medium text-ink uppercase tracking-widest">
          Bill<span className="text-accent">Force</span>
        </div>
        <div>Section 43B(h) · MSMED Act, 2006 · Income Tax Act, 1961</div>
        <div>Made for Indian MSMEs</div>
      </footer>
    </>
  );
}
