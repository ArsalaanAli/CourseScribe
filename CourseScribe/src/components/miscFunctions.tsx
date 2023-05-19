import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export function getUserEmail(session: Session) {
  const email: string = session!.user!.email!;
  const newEmail = email
    .replaceAll(".", "+")
    .replaceAll("$", "+")
    .replaceAll("#", "+")
    .replaceAll("[", "+")
    .replaceAll("]", "+")
    .replaceAll("/", "+");
  return newEmail;
}
