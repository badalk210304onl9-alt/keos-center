"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import {
  CheckCircle2,
  ImageIcon,
  LoaderCircle,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";

type UploadResult = {
  success: boolean;

  data?: {
    url: string;
    publicId: string;
    width: number | null;
    height: number | null;
    bytes: number;
    format: string | null;
  };

  message?: string;
};

type ProductImageUploadProps = {
  label?: string;
  description?: string;

  value: string;

  onChange: (
    imageUrl: string,
  ) => void;

  uploadType?:
    | "primary"
    | "gallery";
};

const MAX_FILE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ]);

export default function ProductImageUpload({
  label = "Primary Product Image",
  description =
    "Upload a JPG, PNG, WEBP or AVIF image up to 8 MB.",

  value,
  onChange,

  uploadType = "primary",
}: ProductImageUploadProps) {
  const inputReference =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [
    uploading,
    setUploading,
  ] =
    useState(false);

  const [
    dragActive,
    setDragActive,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  async function uploadFile(
    file: File,
  ) {
    setError("");

    if (
      !ALLOWED_TYPES.has(
        file.type,
      )
    ) {
      setError(
        "Only JPG, PNG, WEBP and AVIF images are allowed.",
      );

      return;
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      setError(
        "Image size must not exceed 8 MB.",
      );

      return;
    }

    setUploading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file,
      );

      formData.append(
        "uploadType",
        uploadType,
      );

      const response =
        await fetch(
          "/api/upload/product-image",
          {
            method: "POST",
            body: formData,
          },
        );

      const result =
        (await response.json()) as
          UploadResult;

      if (
        !response.ok ||
        !result.success ||
        !result.data?.url
      ) {
        throw new Error(
          result.message ||
            "Image upload failed.",
        );
      }

      onChange(
        result.data.url,
      );
    } catch (uploadError) {
      console.error(
        "PRODUCT_UPLOAD_ERROR",
        uploadError,
      );

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image.",
      );
    } finally {
      setUploading(false);

      if (
        inputReference.current
      ) {
        inputReference.current.value =
          "";
      }
    }
  }

  function handleFileChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      void uploadFile(file);
    }
  }

  function handleDrop(
    event:
      DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    setDragActive(false);

    if (uploading) {
      return;
    }

    const file =
      event.dataTransfer
        .files?.[0];

    if (file) {
      void uploadFile(file);
    }
  }

  return (
    <section>
      <div>
        <p className="text-sm font-black text-slate-700">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <input
        ref={inputReference}
        type="file"
        accept="
          image/jpeg,
          image/png,
          image/webp,
          image/avif
        "
        className="hidden"
        onChange={
          handleFileChange
        }
      />

      {value ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative h-80 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded product"
              className="h-full w-full object-contain"
            />

            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
              <CheckCircle2
                size={13}
              />

              Uploaded
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row">
            <button
              type="button"
              disabled={
                uploading
              }
              onClick={() =>
                inputReference.current?.click()
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
            >
              {uploading ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw
                  size={17}
                />
              )}

              Replace Image
            </button>

            <button
              type="button"
              disabled={
                uploading
              }
              onClick={() =>
                onChange("")
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2
                size={17}
              />

              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragEnter={(
            event,
          ) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragOver={(
            event,
          ) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(
            event,
          ) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDrop={
            handleDrop
          }
          onClick={() => {
            if (!uploading) {
              inputReference.current?.click();
            }
          }}
          onKeyDown={(
            event,
          ) => {
            if (
              event.key ===
                "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              inputReference.current?.click();
            }
          }}
          className={`mt-4 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
          }`}
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-100 text-blue-600">
            {uploading ? (
              <LoaderCircle
                size={29}
                className="animate-spin"
              />
            ) : (
              <UploadCloud
                size={29}
              />
            )}
          </div>

          <h4 className="mt-5 text-base font-black text-slate-950">
            {uploading
              ? "Uploading image..."
              : "Choose or drop an image"}
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Click here to select
            an image from your
            computer, or drag and
            drop it into this box.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
            <ImageIcon
              size={17}
            />

            Choose Image
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
    </section>
  );
}
