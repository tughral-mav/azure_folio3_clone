import Link from 'next/link';

/** The live's blue breadcrumb bar shown directly under the hero ("Home » <Page>"). */
export function Breadcrumb({ name }: { name: string }) {
  return (
    <div className="bg-brand">
      <div className="container-x py-3 text-sm text-white/90">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="px-2">»</span>
        <span>{name}</span>
      </div>
    </div>
  );
}
