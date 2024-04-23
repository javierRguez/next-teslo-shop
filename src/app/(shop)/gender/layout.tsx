import { Gender } from "@/interfaces";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: { gender: Gender };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Leerlo desde URL
  const headersList = headers();
  const fullUrl = headersList.get("x-pathname") || "";
  const gender = fullUrl.split("/")[2];
  const capitalizeGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  // =====================================

  /* Leerlo desde params

    const capitalizeGender = params.gender.charAt(0).toUpperCase() + gender.slice(1);
  
  */

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
