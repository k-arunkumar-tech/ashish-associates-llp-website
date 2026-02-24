"use client";

import { PracticeAreaDetail } from "@/src/pages/PracticeAreas";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug = params.slug;

  return <PracticeAreaDetail slug={slug} />;
}