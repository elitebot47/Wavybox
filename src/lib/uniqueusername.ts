import { prisma } from "@/lib/prisma";

export default async function UniqueUsernameGenerator(
  email: string
): Promise<string> {
  const base = email.split("@")[0];
  while (true) {
    const username = `${base}${base.slice(-1)}${Math.floor(
      Math.random() * 1000
    )}`;
    if (
      !(await prisma.user.findUnique({
        where: {
          username,
        },
      }))
    ) {
      return username;
    }
  }
}
