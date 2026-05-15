import type { APIRoute } from "astro";
import { API } from "../../utils/api";

export const GET: APIRoute = async ({ locals, request }) => {
  try {
    const bucket = locals.runtime.env.CLOUD_FILES;
    if (!bucket) {
      return API.error("Cloud storage not configured", request, 500);
    }

    const options = { limit: 500 };
    const listed = await bucket.list(options);
    let truncated = listed.truncated;

    // @ts-ignore R2 list cursor
    let cursor = truncated ? listed.cursor : undefined;

    while (truncated) {
      const next = await bucket.list({
        ...options,
        cursor: cursor,
      });
      listed.objects.push(...next.objects);

      truncated = next.truncated;
      // @ts-ignore R2 list cursor
      cursor = next.cursor;
    }

    return API.json(listed.objects, request);
  } catch (error) {
    console.error("Error listing assets:", error);
    return API.error("Failed to list assets", request, 500);
  }
};
