import type { MiddlewareHandler } from "astro";
import { API } from "./utils/api";
import { requireBearerToken } from "./utils/auth";

function isApiPath(pathname: string): boolean {
  const base = (import.meta.env.BASE_URL || "").replace(/\/$/, "");
  const prefix = base ? `${base}/api` : "/api";
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;
  if (!isApiPath(pathname)) {
    return next();
  }

  const origin = context.locals.runtime?.env?.ORIGIN;
  API.init(origin);

  if (context.request.method === "OPTIONS") {
    return API.cors(context.request);
  }

  const token = context.locals.runtime?.env?.API_BEARER_TOKEN;
  const authError = requireBearerToken(context.request, token);
  if (authError) return authError;

  return next();
};
