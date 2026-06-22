import Image from 'next/image';
import Link from 'next/link';
import { OFFICES } from '@/lib/offices';

/** Global office directory footer — matches the live golden master (bg #050D20). */
export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/75">
      <div className="container-x py-16">
        <Image
          src="/wp-content/uploads/2023/04/azure_logo_ftr.png"
          alt="Folio3 Azure"
          width={150}
          height={40}
          className="mb-10 h-auto w-[150px]"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o) => (
            <div key={o.country}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-bright">{o.country}</h4>
              <div className="space-y-3">
                {o.lines.map((line, i) => {
                  const phone = /(tel|support)/i.test(line) ? line.match(/\+?[\d][\d()\s-]{6,}\d/) : null;
                  return (
                    <p key={i} className="text-sm leading-relaxed text-white/70">
                      {phone ? (
                        <a href={`tel:${phone[0].replace(/[^\d+]/g, '')}`} className="hover:text-white">{line}</a>
                      ) : (
                        line
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()}, Folio3 Software Inc., All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/cookie-policy/" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
