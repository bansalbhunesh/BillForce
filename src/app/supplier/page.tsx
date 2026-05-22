'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, CheckCircle2, FileText, Send, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { NoticePDF } from '@/components/NoticePDF';
import { formatCurrency } from '@/utils/format';
import { TAX_CONSTANTS } from '@/constants/tax';

type Step = 1 | 2 | 3 | 4;

export default function SupplierFlow() {
  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Notice Data
  const [invoiceAmount, setInvoiceAmount] = useState<number | ''>('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [udyamNumber, setUdyamNumber] = useState('');

  // Extracted/Calculated Data
  const daysOverdue = 62; // Hardcoded for demo/prototype
  const taxDisallowance = Number(invoiceAmount) * TAX_CONSTANTS.DISALLOWANCE_RATE || 0;
  const interestAccrued =
    Number(invoiceAmount) * TAX_CONSTANTS.INTEREST_RATE * (daysOverdue / 365) || 0;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true);
      // Simulate OCR delay
      setTimeout(() => {
        setInvoiceAmount(840000);
        setInvoiceDate('2024-01-14');
        setBuyerName('Ramesh Auto Components Pvt. Ltd.');
        setInvoiceNumber('INV-2024-0891');
        setIsProcessing(false);
        setStep(2);
      }, 1500);
    }
  };

  const handleUdyamVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!udyamNumber) return;
    setIsProcessing(true);
    // Simulate API Verification delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1000);
  };

  const noticeData = {
    buyerName,
    invoiceNumber,
    invoiceDate,
    invoiceAmount: Number(invoiceAmount),
    udyamNumber,
    daysOverdue,
    taxDisallowance,
    interestAccrued,
  };

  const renderStepIcon = (s: Step) => {
    if (step > s) return <CheckCircle2 className="w-5 h-5 text-accent2" />;
    return (
      <span
        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-mono ${step === s ? 'bg-accent text-white' : 'bg-border text-muted'}`}
      >
        {s}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-paper pb-20">
      <nav className="sticky top-0 z-50 bg-paper border-b border-border flex items-center px-6 h-14 gap-4">
        <Link href="/" className="text-muted hover:text-ink transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="font-mono font-medium text-[13px] tracking-widest text-ink uppercase">
          Supplier Flow
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-10 px-6">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10 -translate-y-1/2"></div>
          {[
            { s: 1, label: 'Upload' },
            { s: 2, label: 'Verify' },
            { s: 3, label: 'Notice' },
            { s: 4, label: 'Send' },
          ].map((st) => (
            <div
              key={st.s}
              className={`flex flex-col items-center gap-2 bg-paper px-2 ${step === st.s ? 'text-ink font-medium' : 'text-muted'}`}
            >
              {renderStepIcon(st.s as Step)}
              <span className="text-[11px] font-mono tracking-wider uppercase">{st.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-border rounded-lg shadow-sm p-8 min-h-[400px]">
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center animate-fadein">
              <h2 className="font-serif text-2xl mb-2">Upload your unpaid invoice</h2>
              <p className="text-muted text-[14px] mb-8">
                We will automatically extract the details using AI.
              </p>

              <label
                className={`w-full max-w-md border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-colors hover:bg-paper2 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {isProcessing ? (
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                ) : (
                  <Upload className="w-10 h-10 text-muted" />
                )}
                <div className="text-[14px] font-medium text-ink">
                  {isProcessing ? 'Extracting data with AI...' : 'Click to upload or drag and drop'}
                </div>
                <div className="text-[12px] text-muted">PDF, JPG, or PNG</div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleUpload}
                />
              </label>
            </div>
          )}

          {/* STEP 2: UDYAM VERIFY */}
          {step === 2 && (
            <div className="animate-fadein">
              <h2 className="font-serif text-2xl mb-2">Verify your Udyam Status</h2>
              <p className="text-muted text-[14px] mb-8">
                This makes your notice legally binding under the MSMED Act.
              </p>

              <div className="bg-paper2 p-4 rounded-md mb-8 flex gap-4 text-[13px] border border-border">
                <div className="flex-1">
                  <div className="text-muted font-mono text-[10px] uppercase mb-1">
                    Invoice Amount
                  </div>
                  <div className="font-medium text-ink">
                    {formatCurrency(Number(invoiceAmount))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-muted font-mono text-[10px] uppercase mb-1">Buyer</div>
                  <div className="font-medium text-ink truncate">{buyerName}</div>
                </div>
              </div>

              <form onSubmit={handleUdyamVerify} className="max-w-md">
                <label className="flex flex-col gap-1.5 mb-6">
                  <span className="font-mono text-[12px] text-muted tracking-wide">
                    Udyam Registration Number
                  </span>
                  <input
                    type="text"
                    required
                    value={udyamNumber}
                    onChange={(e) => setUdyamNumber(e.target.value.toUpperCase())}
                    placeholder="UDYAM-XX-00-0000000"
                    className="border border-border rounded bg-white px-3.5 py-2.5 font-sans text-[16px] text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-ink text-paper rounded font-medium text-[15px] px-7 py-3 w-full flex items-center justify-center gap-2 transition-colors hover:bg-[#2a2520] disabled:opacity-70"
                >
                  {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isProcessing ? 'Verifying...' : 'Verify & Generate Notice'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: NOTICE GENERATION */}
          {step === 3 && (
            <div className="animate-fadein">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-serif text-2xl mb-1">Notice Generated</h2>
                  <p className="text-muted text-[14px]">
                    Your Section 43B(h) payment notice is ready.
                  </p>
                </div>
                <PDFDownloadLink
                  document={<NoticePDF {...noticeData} />}
                  fileName={`Notice_${invoiceNumber}.pdf`}
                  className="bg-accent text-white rounded font-medium text-[13px] px-4 py-2 flex items-center gap-2 transition-colors hover:bg-[#a33508]"
                >
                  {({ loading }) =>
                    loading ? (
                      'Preparing PDF...'
                    ) : (
                      <>
                        <FileText className="w-4 h-4" /> Download PDF
                      </>
                    )
                  }
                </PDFDownloadLink>
              </div>

              {/* Notice Preview Box (simplified HTML representation of the PDF) */}
              <div className="border border-border rounded p-6 bg-paper2 mb-8 text-[13px] leading-relaxed relative opacity-80 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center -rotate-12 z-10">
                  <div className="font-serif text-5xl text-accent2 opacity-10 border-4 border-accent2 p-4 rounded">
                    PREVIEW
                  </div>
                </div>
                <div className="font-serif text-lg border-b border-border pb-2 mb-4">
                  Payment Notice under Section 43B(h)
                </div>
                <p>
                  To: <strong>{buyerName}</strong>
                </p>
                <p className="mt-2">
                  This notice pertains to Invoice <strong>{invoiceNumber}</strong> dated{' '}
                  <strong>{invoiceDate}</strong> for services rendered, in the amount of{' '}
                  <strong>{formatCurrency(Number(invoiceAmount))}</strong>.
                </p>
                <p className="mt-2">
                  As a registered MSME under Udyam Registration <strong>{udyamNumber}</strong>, the
                  undersigned is protected under the MSMED Act, 2006...
                </p>
                <div className="bg-[#fff8f5] border border-[#f5c4b3] rounded p-3 mt-4">
                  <div className="text-[10px] text-muted font-mono uppercase">
                    Tax disallowance at 30%
                  </div>
                  <div className="text-[14px] font-medium text-accent">
                    {formatCurrency(Math.round(taxDisallowance))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="bg-ink text-paper rounded font-medium text-[15px] px-7 py-3 w-full transition-colors hover:bg-[#2a2520]"
              >
                Proceed to Delivery →
              </button>
            </div>
          )}

          {/* STEP 4: DELIVERY */}
          {step === 4 && (
            <div className="text-center py-8 animate-fadein">
              <div className="w-16 h-16 bg-accent2/10 text-accent2 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl mb-2">Ready to send</h2>
              <p className="text-muted text-[15px] max-w-sm mx-auto mb-10">
                Share the notice directly with the buyer&apos;s finance team via WhatsApp.
              </p>

              <a
                href={`https://wa.me/?text=Payment%20Notice%20under%20Section%2043B(h)%20for%20Invoice%20${invoiceNumber}.%20Tax%20exposure%20risk:%20${encodeURIComponent(formatCurrency(Math.round(taxDisallowance)))}.%20Please%20review%20the%20attached%20notice.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded font-medium text-[16px] px-8 py-4 transition-transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5" />
                Send via WhatsApp
              </a>

              <div className="mt-8 text-[13px] text-muted">
                <Link href="/" className="hover:text-ink underline">
                  Return to home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
