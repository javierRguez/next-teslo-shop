import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 not found</h1>
      <Link href="/">Regresar</Link>
    </div>
  );
}
