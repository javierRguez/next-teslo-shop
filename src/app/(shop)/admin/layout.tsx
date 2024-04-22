import { auth } from "@/auth.config";
import { Role } from "@/interfaces";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== Role.ADMIN) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
