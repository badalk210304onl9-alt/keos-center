"use client";

import {
  useMemo,
  useState,
} from "react";

import ProductImageUpload from "@/components/founder/product-image-upload";

type ProductGalleryUploadProps = {
  primaryImage: string;
  galleryText: string;
  coloursText?: string;

  onPrimaryChange: (
    url: string,
  ) => void;

  onGalleryChange: (
    value: string,
  ) => void;
};

type ColourImageEntry = {
  raw: string;
  url: string;
  colour: string | null;
};

const META_PREFIX =
  "krve-colour";

function splitCommaValues(
  value: string,
) {
  return value
    .split(",")
    .map((item) =>
      item.trim(),
    )
    .filter(Boolean);
}

function normalizeColour(
  value: string,
) {
  return value
    .trim()
    .replace(
      /\s+/g,
      " ",
    );
}

function stripMetadata(
  value: string,
) {
  const marker =
    `#${META_PREFIX}=`;

  const index =
    value.indexOf(
      marker,
    );

  return index < 0
    ? value
    : value.slice(
        0,
        index,
      );
}

function parseColourImage(
  raw: string,
): ColourImageEntry {
  const marker =
    `#${META_PREFIX}=`;

  const index =
    raw.indexOf(
      marker,
    );

  if (index < 0) {
    return {
      raw,
      url: raw,
      colour: null,
    };
  }

  const url =
    raw.slice(
      0,
      index,
    );

  const metadata =
    raw.slice(
      index +
        marker.length,
    );

  const params =
    new URLSearchParams(
      metadata,
    );

  return {
    raw,
    url,
    colour:
      params.get(
        "colour",
      ),
  };
}

function tagColourImage(
  url: string,
  colour: string,
) {
  const cleanUrl =
    stripMetadata(
      url.trim(),
    );

  if (!cleanUrl) {
    return "";
  }

  const params =
    new URLSearchParams();

  params.set(
    "colour",
    colour,
  );

  return `${cleanUrl}#${META_PREFIX}=${params.toString()}`;
}

export default function ProductGalleryUpload({
  primaryImage,
  galleryText,
  coloursText = "",
  onPrimaryChange,
  onGalleryChange,
}: ProductGalleryUploadProps) {
  const colours =
    useMemo(() => {
      const parsed =
        splitCommaValues(
          coloursText,
        )
          .map(
            normalizeColour,
          )
          .filter(Boolean);

      return parsed.length >
        0
        ? Array.from(
            new Set(
              parsed,
            ),
          )
        : ["Default"];
    }, [coloursText]);

  const firstColour =
    colours[0] ||
    "Default";

  const [
    selectedColour,
    setSelectedColour,
  ] =
    useState(
      firstColour,
    );

  const effectiveColour =
    colours.includes(
      selectedColour,
    )
      ? selectedColour
      : firstColour;

  const parsedGallery =
    useMemo(
      () =>
        splitCommaValues(
          galleryText,
        ).map(
          parseColourImage,
        ),
      [galleryText],
    );

  function findColourImage(
    colour: string,
  ) {
    if (
      colour ===
      firstColour
    ) {
      return primaryImage;
    }

    return (
      parsedGallery.find(
        (item) =>
          item.colour ===
          colour,
      )?.url || ""
    );
  }

  function saveColourImage(
    colour: string,
    url: string,
  ) {
    /*
     * First colour remains the product's
     * primary image so existing website cards,
     * catalogue and APIs continue to work.
     */
    if (
      colour ===
      firstColour
    ) {
      onPrimaryChange(
        stripMetadata(
          url,
        ),
      );

      return;
    }

    const current =
      splitCommaValues(
        galleryText,
      ).map(
        parseColourImage,
      );

    const next =
      current
        .filter(
          (item) =>
            item.colour !==
            colour,
        )
        .map(
          (item) =>
            item.raw,
        );

    if (url.trim()) {
      next.push(
        tagColourImage(
          url,
          colour,
        ),
      );
    }

    onGalleryChange(
      next.join(
        ", ",
      ),
    );
  }

  const selectedImage =
    findColourImage(
      effectiveColour,
    );

  const uploadedColours =
    colours.filter(
      (colour) =>
        Boolean(
          findColourImage(
            colour,
          ),
        ),
    ).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-black text-slate-950">
          Colour Variant Images
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          Upload only one
          customer-facing image
          for each colour. The
          image can be a collage
          showing Front, Back and
          Side views together.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">
              Product Colours
            </p>

            <h3 className="mt-1 text-lg font-black text-slate-950">
              One image per colour
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {uploadedColours}
              {" / "}
              {colours.length}
              {" "}
              colours have images.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {colours.map(
              (colour) => {
                const image =
                  findColourImage(
                    colour,
                  );

                const active =
                  effectiveColour ===
                  colour;

                return (
                  <button
                    key={
                      colour
                    }
                    type="button"
                    onClick={() =>
                      setSelectedColour(
                        colour,
                      )
                    }
                    className={`rounded-xl border px-4 py-2.5 text-xs font-black transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {colour}

                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[9px] ${
                        active
                          ? "bg-white/20 text-white"
                          : image
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {image
                        ? "✓"
                        : "EMPTY"}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">
              Selected Colour
            </p>

            <h3 className="mt-1 text-xl font-black text-slate-950">
              {effectiveColour}
            </h3>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${
              selectedImage
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {selectedImage
              ? "IMAGE READY"
              : "IMAGE REQUIRED"}
          </span>
        </div>

        <ProductImageUpload
          label={`${effectiveColour} — Product Image`}
          description="Upload one collage image showing Front, Back and Side views for this colour."
          value={
            selectedImage
          }
          uploadType={
            effectiveColour ===
            firstColour
              ? "primary"
              : "gallery"
          }
          onChange={(
            url,
          ) =>
            saveColourImage(
              effectiveColour,
              url,
            )
          }
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {colours.map(
          (colour) => {
            const image =
              findColourImage(
                colour,
              );

            return (
              <div
                key={
                  colour
                }
                className={`rounded-xl border p-3 ${
                  image
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                      Colour Variant
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-800">
                      {colour}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                      image
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {image
                      ? "UPLOADED"
                      : "EMPTY"}
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-xs leading-5 text-amber-800">
          Recommended image:
          one collage per colour
          with a large Front view
          and smaller Back +
          Side views, like your
          sample image.
        </p>
      </div>
    </div>
  );
}
