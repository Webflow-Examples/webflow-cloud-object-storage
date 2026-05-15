import type { APIRoute } from "astro";
import { API } from "../../utils/api";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const bucket = locals.runtime.env.CLOUD_FILES;
    if (!bucket) {
      return API.error("Cloud storage not configured", request, 500);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return API.error("Missing or invalid file", request, 400);
    }

    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "";
    const filename = `${timestamp}-${file.name}.${extension}`;

    const object = await bucket.put(filename, file, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    if (!object) {
      return API.error("Failed to upload file", request, 500);
    }

    return API.success(
      {
        success: true,
        filename,
        key: object.key,
        size: file.size,
        type: file.type,
      },
      request
    );
  } catch (error) {
    console.error("Upload error:", error);
    return API.error("Upload failed", request, 500);
  }
};
