'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { formatCurrency } from '@/utils/format';
import { TAX_CONSTANTS } from '@/constants/tax';

// Mock data for the dashboard
const invoices: Invoice[] = [
  {
    id: 'INV-2024-0891',
    vendorName: 'Sharma Auto Parts',
    date: '2024-01-14',
    amount: 840000,
    daysOverdue: 62,
    status: 'critical',
  },
  {
    id: 'INV-2024-0902',
    vendorName: 'Rajesh Packaging Pvt Ltd',
    date: '2024-02-05',
    amount: 320000,
    daysOverdue: 40,
    status: 'warning',
  },
  {
    id: 'INV-2024-0915',
    vendorName: 'Balaji Logistics',
    date: '2024-02-20',
    amount: 150000,
    daysOverdue: 25,
    status: 'safe',
  },
  {
    id: 'INV-2024-0922',
    vendorName: 'Sharma Auto Parts',
    date: '2024-02-28',
    amount: 410000,
    daysOverdue: 17,
    status: 'safe',
  },
  {
    id: 'INV-2024-0850',
    vendorName: 'TechCorp IT Solutions',
    date: '2023-12-10',
    amount: 1200000,
    daysOverdue: 97,
    status: 'critical',
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const criticalInvoices = invoices.filter((inv) => inv.status === 'critical');
  const taxExposure = criticalInvoices.reduce(
    (sum, inv) => sum + inv.amount * TAX_CONSTANTS.DISALLOWANCE_RATE,
    0
  );

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] text-ink pb-20">
      {/* Top Nav */}
      <nav className="bg-white border-b border-border flex items-center justify-between px-6 h-14 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="font-mono font-medium text-[13px] tracking-widest text-ink uppercase">
            Bill<span className="text-accent">Force</span> Buyer Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-paper2 rounded-full flex items-center justify-center font-medium text-xs">
            AP
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl mb-1">Accounts Payable Exposure</h1>
            <p className="text-muted text-[14px]">
              Section 43B(h) compliance overview for MSME vendors.
            </p>
          </div>
          <button className="bg-ink text-paper rounded text-[13px] font-medium px-4 py-2 flex items-center gap-2 transition-colors hover:bg-[#2a2520]">
            <Download className="w-4 h-4" /> Export Form 3CD Data
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
            <div className="text-[12px] text-muted font-mono uppercase tracking-wider mb-2">
              Total MSME Outstanding
            </div>
            <div className="font-serif text-3xl">{formatCurrency(totalOutstanding)}</div>
          </div>
          <div className="bg-white border border-border rounded-lg p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#f5a882]"></div>
            <div className="text-[12px] text-muted font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-accent" /> Tax Exposure Risk
            </div>
            <div className="font-serif text-3xl text-accent">{formatCurrency(taxExposure)}</div>
            <div className="text-[12px] text-muted mt-1">
              {criticalInvoices.length} invoices over 45 days
            </div>
          </div>
          <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
            <div className="text-[12px] text-muted font-mono uppercase tracking-wider mb-2">
              Upcoming Deadlines (7 Days)
            </div>
            <div className="font-serif text-3xl text-[#b8860b]">
              {invoices.filter((i) => i.status === 'warning').length}
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#fcfcfc]">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vendor or invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded bg-white text-[13px] outline-none focus:border-ink transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 text-[13px] border border-border rounded px-3 py-2 bg-white hover:bg-paper2 transition-colors">
              <Filter className="w-4 h-4" /> Filter by Status
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#fcfcfc] text-muted font-mono text-[11px] uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-normal">Invoice / Vendor</th>
                  <th className="px-6 py-3 font-normal">Date</th>
                  <th className="px-6 py-3 font-normal">Amount</th>
                  <th className="px-6 py-3 font-normal">Days Overdue</th>
                  <th className="px-6 py-3 font-normal">Status</th>
                  <th className="px-6 py-3 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-paper/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-ink">{inv.id}</div>
                      <div className="text-muted mt-0.5 text-[12px]">{inv.vendorName}</div>
                    </td>
                    <td className="px-6 py-4 text-muted">{inv.date}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(inv.amount)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-mono ${inv.status === 'critical' ? 'text-accent' : inv.status === 'warning' ? 'text-[#b8860b]' : 'text-accent2'}`}
                      >
                        {inv.daysOverdue} days
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {inv.status === 'critical' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f5a882]/20 text-[#c8440a]">
                          <AlertTriangle className="w-3 h-3" /> &gt; 45 Days
                        </span>
                      )}
                      {inv.status === 'warning' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#fef0c7] text-[#b45309]">
                          <AlertTriangle className="w-3 h-3" /> 30-45 Days
                        </span>
                      )}
                      {inv.status === 'safe' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#dcfce7] text-[#166534]">
                          <CheckCircle2 className="w-3 h-3" /> &lt; 30 Days
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-accent hover:underline text-[12px] font-medium">
                        View Notice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInvoices.length === 0 && (
            <div className="p-8 text-center text-[13px] text-muted">
              No invoices found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
