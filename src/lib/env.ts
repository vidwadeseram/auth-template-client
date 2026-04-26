export function validateEnv() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing. Please add it to your environment variables."
    );
  }
  try {
    new URL(apiUrl);
  } catch (error) {
    throw new Error(
      `NEXT_PUBLIC_API_URL must be a valid URL. Received: ${apiUrl}`
    );
  }
}

if (typeof window !== "undefined") {
  validateEnv();
}
