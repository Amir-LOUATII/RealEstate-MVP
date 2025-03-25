const bcrypt = require("bcryptjs");

export async function hashUserPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function compareUserPasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export { bcrypt as default };
