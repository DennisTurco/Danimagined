import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { works, getWork } from "@/lib/works";
import WorkDetail from "@/components/WorkDetail";

export function generateStaticParams() {
  return works.map((w) => ({ id: String(w.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const work = getWork(Number(id));
  if (!work) return { title: "Opera — Danimagined" };
  return {
    title: `${work.title} — Danimagined`,
    description: work.desc,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = getWork(Number(id));
  if (!work) notFound();

  return <WorkDetail work={work} />;
}
