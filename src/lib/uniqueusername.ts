import { prisma } from "@/lib/prisma";

export default async function UniqueUsernameGenerator(
  email: string
): Promise<string> {
  const base = email.split("@")[0];
  const seperators = ["-", "_", "~"];
  while (true) {
    const username = `${base}${
      seperators[Math.floor(Math.random() * seperators.length)]
    }${base.slice(Math.floor(Math.random() * base.length))}${Math.floor(
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
