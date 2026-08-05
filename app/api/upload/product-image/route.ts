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

type CloudinaryUploadResponse = {
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

function getRequiredEnvironmentVariable(
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

function createSafePublicId(
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
      .slice(0, 65) ||
    "krve-product";

  return `${safeName}-${crypto.randomUUID()}`;
}

function getUploadFolder(
  uploadType: string,
) {
  return uploadType === "gallery"
    ? "krve/products/gallery"
    : "krve/products/primary";
}

export async function POST(
  request: NextRequest,
) {
  try {
    const cloudName =
      getRequiredEnvironmentVariable(
        "CLOUDINARY_CLOUD_NAME",
      );

    const uploadPreset =
      getRequiredEnvironmentVariable(
        "CLOUDINARY_UPLOAD_PRESET",
      );

    const incomingFormData =
      await request.formData();

    const file =
      incomingFormData.get(
        "file",
      );

    const uploadType =
      String(
        incomingFormData.get(
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
            "Please choose an image to upload.",
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
            "Only JPG, PNG, WEBP and AVIF images are supported.",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size <= 0) {
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

    const folder =
      getUploadFolder(
        uploadType,
      );

    const publicId =
      createSafePublicId(
        file.name,
      );

    const cloudinaryFormData =
      new FormData();

    cloudinaryFormData.append(
      "file",
      file,
    );

    cloudinaryFormData.append(
      "upload_preset",
      uploadPreset,
    );

    cloudinaryFormData.append(
      "folder",
      folder,
    );

    cloudinaryFormData.append(
      "public_id",
      publicId,
    );

    const cloudinaryResponse =
      await fetch(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(
          cloudName,
        )}/image/upload`,
        {
          method: "POST",
          body: cloudinaryFormData,
          cache: "no-store",
        },
      );

    const result =
      (await cloudinaryResponse.json()) as
        CloudinaryUploadResponse;

    if (
      !cloudinaryResponse.ok ||
      !result.secure_url
    ) {
      console.error(
        "CLOUDINARY_UNSIGNED_UPLOAD_ERROR",
        result,
      );

      return NextResponse.json(
        {
          success: false,

          message:
            result.error?.message ||
            "Cloudinary could not upload the image.",
        },
        {
          status:
            cloudinaryResponse.status >=
            400
              ? cloudinaryResponse.status
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

          secureUrl:
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
            result.format ?? null,

          resourceType:
            result.resource_type ??
            "image",

          folder,
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
