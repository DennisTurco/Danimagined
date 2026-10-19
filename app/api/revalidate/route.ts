import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/lib/content";

// Chiamato dal webhook di Sanity a ogni pubblicazione: aggiorna subito le pagine.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET non impostato" }, { status: 500 });
  }
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Firma non valida" }, { status: 401 });
    }
    revalidateTag(SANITY_TAG);
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ message: "Richiesta non valida" }, { status: 400 });
  }
}
