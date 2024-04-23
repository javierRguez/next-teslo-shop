import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const headersList = headers();
  const fullUrl = headersList.get("x-pathname") || "";
  const gender = fullUrl.split("/")[2];
  const capitalizeGender = gender.charAt(0).toUpperCase() + gender.slice(1);

  return {
    title: capitalizeGender,
  };
}

export default function genderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
