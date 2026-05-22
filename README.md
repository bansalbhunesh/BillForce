# BillForce

**Stop chasing payments. Send a notice that actually works.**

BillForce is a purpose-built compliance tool designed to help Indian MSMEs leverage Section 43B(h) of the Income Tax Act to get paid on time. It provides a legally formatted notice generator for suppliers and a tax exposure dashboard for buyers.

## The Problem

Under Section 43B(h) of the Income Tax Act, 1961 (effective April 2024), any company that delays payments to an MSME beyond 45 days loses their tax deduction on that expense for the year. This results in a massive 30% tax hit on the unpaid amount. Most finance teams are unaware of this exposure until audit time.

## The Solution

BillForce turns this legal forcing function into a two-sided product:

1. **For MSME Suppliers:** A 2-minute notice generator. Upload an overdue invoice, verify your Udyam number, and instantly generate a legally formatted PDF notice citing Section 43B(h) and calculating the exact tax penalty the buyer is facing. Ready to share via WhatsApp.
2. **For Buyers (Finance Teams):** An Accounts Payable exposure dashboard. Import vendor invoices to automatically identify MSMEs, track the 45-day clock, and visualize live tax disallowance exposure before it hits the bottom line.

## Key Features

- **Automated Notice Generation:** Creates a CA-grade legal notice in minutes.
- **Tax Exposure Calculator:** Embedded tool to calculate the exact 30% tax disallowance and 18% accrued interest.
- **WhatsApp Ready:** Designed to be shared instantly where Indian businesses communicate most.
- **Buyer Dashboard:** A clean, actionable interface for finance teams to manage MSME vendor payables.
- **Responsive Design:** Beautiful, modern UI that works flawlessly on desktop or an ₹8K Android phone.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **PDF Generation:** `@react-pdf/renderer`
- **Typography:** Instrument Serif, DM Sans, DM Mono

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: The main landing page.
- `src/app/supplier/page.tsx`: The supplier flow for generating notices.
- `src/app/dashboard/page.tsx`: The buyer flow for tracking tax exposure.
- `src/components/NoticePDF.tsx`: The React-PDF component for the generated legal notice.

## License

This project is built for MSMEs in India.
