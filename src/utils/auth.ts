import { API } from "./api";

function timingSafeEqualString(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

/** Returns an error Response if the request is not authorized; otherwise null. */
export function requireBearerToken(
  request: Request,
  expectedToken: string | undefined
): Response | null {
  if (expectedToken === undefined || expectedToken.length === 0) {
    return API.error(
      "API authentication is not configured (set API_BEARER_TOKEN)",
      request,
      503
    );
  }

  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return API.error(
      "Missing or invalid Authorization header (expected Bearer token)",
      request,
      401
    );
  }

  const provided = header.slice("Bearer ".length).trim();
  if (!timingSafeEqualString(provided, expectedToken)) {
    return API.error("Invalid bearer token", request, 401);
  }

  return null;
}
