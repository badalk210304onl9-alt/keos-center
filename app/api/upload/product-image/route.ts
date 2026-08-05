import {
  createHash,
} from "node:crypto";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ]);

type CloudinaryResponse = {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
  resource_type?: string;
  error?: {
    message?: string;
  };
};

function getEnvironmentVariable(
  name: string,
) {
  const value =
    process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`,
    );
  }

  return value;
}

function createSignature(
  parameters: Record<
    string,
    string | number
  >,
  apiSecret: string,
) {
  const signatureText =
    Object.entries(parameters)
      .filter(
        ([, value]) =>
          value !== "" &&
          value !== undefined,
      )
      .sort(
        ([firstKey], [secondKey]) =>
          firstKey.localeCompare(
            secondKey,
          ),
      )
      .map(
        ([key, value]) =>
          `${key}=${value}`,
      )
      .join("&");

  return createHash("sha1")
    .update(
      `${signatureText}${apiSecret}`,
    )
    .digest("hex");
}

function createSafeFileName(
  originalName: string,
) {
  const nameWithoutExtension =
    originalName.replace(
      /\.[^/.]+$/,
      "",
    );

  const safeName =
    nameWithoutExtension
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      )
      .slice(
        0,
        70,
      ) || "product";

  return `${safeName}-${crypto.randomUUID()}`;
}

export async function POST(
  request: NextRequest,
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    const uploadType =
      String(
        formData.get(
          "uploadType",
        ) || "primary",
      );

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select an image.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !ALLOWED_TYPES.has(
        file.type,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only JPG, PNG, WEBP and AVIF images are allowed.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      file.size <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected image is empty.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image size must not exceed 8 MB.",
        },
        {
          status: 400,
        },
      );
    }

    const cloudName =
      getEnvironmentVariable(
        "CLOUDINARY_CLOUD_NAME",
      );

    const apiKey =
      getEnvironmentVariable(
        "CLOUDINARY_API_KEY",
      );

    const apiSecret =
      getEnvironmentVariable(
        "CLOUDINARY_API_SECRET",
      );

    const timestamp =
      Math.floor(
        Date.now() / 1000,
      );

    const folder =
      uploadType ===
      "gallery"
        ? "krve/products/gallery"
        : "krve/products/primary";

    const publicId =
      createSafeFileName(
        file.name,
      );

    const signedParameters = {
      folder,
      public_id: publicId,
      timestamp,
    };

    const signature =
      createSignature(
        signedParameters,
        apiSecret,
      );

    const cloudinaryForm =
      new FormData();

    cloudinaryForm.append(
      "file",
      file,
    );

    cloudinaryForm.append(
      "api_key",
      apiKey,
    );

    cloudinaryForm.append(
      "timestamp",
      String(timestamp),
    );

    cloudinaryForm.append(
      "folder",
      folder,
    );

    cloudinaryForm.append(
      "public_id",
      publicId,
    );

    cloudinaryForm.append(
      "signature",
      signature,
    );

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(
          cloudName,
        )}/image/upload`,
        {
          method: "POST",
          body: cloudinaryForm,
          cache: "no-store",
        },
      );

    const result =
      (await response.json()) as
        CloudinaryResponse;

    if (
      !response.ok ||
      !result.secure_url
    ) {
      console.error(
        "CLOUDINARY_UPLOAD_ERROR",
        result,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            result.error
              ?.message ||
            "Cloudinary could not upload the image.",
        },
        {
          status:
            response.status >=
            400
              ? response.status
              : 500,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        data: {
          url:
            result.secure_url,

          publicId:
            result.public_id,

          width:
            result.width ?? null,

          height:
            result.height ?? null,

          bytes:
            result.bytes ??
            file.size,

          format:
            result.format ??
            null,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "PRODUCT_IMAGE_UPLOAD_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to upload the product image.",
      },
      {
        status: 500,
      },
    );
  }
}
