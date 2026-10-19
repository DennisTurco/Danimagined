import { notFound } from "next/navigation";

// Gli indirizzi inesistenti passano da qui per mostrare la 404 con menu e footer.
export default function CatchAll() {
  notFound();
}
