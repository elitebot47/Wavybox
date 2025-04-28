import argon2 from "argon2";
import { string } from "zod";

export async function HashPassword(password: string): Promise<string> {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2d,
      timeCost: 3,
      memoryCost: 4096,
      parallelism: 2,
      hashLength: 32,
    });
  } catch (error) {
    throw new Error("error hashing password");
  }
}

export async function verifyPassword(
  hashedpassword: string,
  password: string
): Promise<boolean | undefined> {
  return await argon2.verify(hashedpassword, password);
}
