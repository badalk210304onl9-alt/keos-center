import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  v2 as cloudinary,
  type UploadApiErrorResponse,
  type UploadApiResponse,
} from "cloudinary";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const MAX_FILE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ]);

type UploadType =
  | "primary"
  | "gallery";

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

function configureCloudinary() {
  const cloudName =
    getRequiredEnvironmentVariable(
      "CLOUDINARY_CLOUD_NAME",
    );

  const apiKey =
    getRequiredEnvironmentVariable(
      "CLOUDINARY_API_KEY",
    );

  const apiSecret =
    getRequiredEnvironmentVariable(
      "CLOUDINARY_API_SECRET",
    );

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
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
      .slice(
        0,
        70,
      ) || "product";

  return `${safeName}-${crypto.randomUUID()}`;
}

function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder: string;
    publicId: string;
  },
) {
  return new Promise<UploadApiResponse>(
    (
      resolve,
      reject,
    ) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            resource_type:
              "image",

            folder:
              options.folder,

            public_id:
              options.publicId,

            overwrite:
              false,

            unique_filename:
              false,

            use_filename:
              false,

            invalidate:
              false,
          },
          (
            error:
              | UploadApiErrorResponse
              | undefined,
            result:
              | UploadApiResponse
              | undefined,
          ) => {
            if (error) {
              reject(
                new Error(
                  error.message ||
                    "Cloudinary upload failed.",
                ),
              );

              return;
            }

            if (
              !result ||
              !result.secure_url
            ) {
              reject(
                new Error(
                  "Cloudinary did not return an image URL.",
                ),
              );

              return;
            }

            resolve(result);
          },
        );

      uploadStream.end(
        buffer,
      );
    },
  );
}

function getUploadType(
  value: FormDataEntryValue | null,
): UploadType {
  return value === "gallery"
    ? "gallery"
    : "primary";
}

export async function POST(
  request: NextRequest,
) {
  try {
    configureCloudinary();

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    const uploadType =
      getUploadType(
        formData.get(
          "uploadType",
        ),
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
      uploadType ===
      "gallery"
        ? "krve/products/gallery"
        : "krve/products/primary";

    const publicId =
      createSafePublicId(
        file.name,
      );

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(
        arrayBuffer,
      );

    const uploadedImage =
      await uploadBufferToCloudinary(
        buffer,
        {
          folder,
          publicId,
        },
      );

    return NextResponse.json(
      {
        success: true,

        data: {
          url:
            uploadedImage.secure_url,

          secureUrl:
            uploadedImage.secure_url,

          publicId:
            uploadedImage.public_id,

          width:
            uploadedImage.width ??
            null,

          height:
            uploadedImage.height ??
            null,

          bytes:
            uploadedImage.bytes ??
            file.size,

          format:
            uploadedImage.format ??
            null,

          resourceType:
            uploadedImage.resource_type ??
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
      "CLOUDINARY_PRODUCT_UPLOAD_ERROR",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to upload the product image.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}
