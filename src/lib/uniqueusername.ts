import { prisma } from "@/lib/prisma";

export default async function UniqueUsernameGenerator(
  email: string
): Promise<string> {
  let base = email.split("@")[0];
  if (base.length >= 7) {
    base = base.substring(0, 7);
  }
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
