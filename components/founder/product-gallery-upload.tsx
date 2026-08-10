"use client";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import ProductImageUpload from "@/components/founder/product-image-upload";

type ProductGalleryUploadProps = {
  primaryImage: string;
  galleryText: string;
  coloursText?: string;
  onPrimaryChange: (url: string) => void;
  onGalleryChange: (value: string) => void;
};

type GalleryView = 1 | 2 | 3;

type TaggedGalleryItem = {
  raw: string;
  url: string;
  colour: string | null;
  view: GalleryView | null;
};

const META_PREFIX = "krve-gallery";

function splitCommaValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function stripMetadata(value: string) {
  const marker = `#${META_PREFIX}=`;
  const index = value.indexOf(marker);

  return index < 0 ? value : value.slice(0, index);
}

function parseTaggedItem(raw: string): TaggedGalleryItem {
  const marker = `#${META_PREFIX}=`;
  const index = raw.indexOf(marker);

  if (index < 0) {
    return {
      raw,
      url: raw,
      colour: null,
      view: null,
    };
  }

  const url = raw.slice(0, index);
  const metadata = raw.slice(index + marker.length);
  const params = new URLSearchParams(metadata);

  const colour = params.get("colour");
  const viewNumber = Number(params.get("view"));

  const view: GalleryView | null =
    viewNumber === 1 || viewNumber === 2 || viewNumber === 3
      ? (viewNumber as GalleryView)
      : null;

  return {
    raw,
    url,
    colour,
    view,
  };
}

function tagImage(
  url: string,
  colour: string,
  view: GalleryView,
) {
  const cleanUrl = stripMetadata(url.trim());

  if (!cleanUrl) {
    return "";
  }

  const params = new URLSearchParams();
  params.set("colour", colour);
  params.set("view", String(view));

  return `${cleanUrl}#${META_PREFIX}=${params.toString()}`;
}

function normalizeColour(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export default function ProductGalleryUpload({
  primaryImage,
  galleryText,
  coloursText = "",
  onPrimaryChange,
  onGalleryChange,
}: ProductGalleryUploadProps) {
  const colours = useMemo(() => {
    const parsed = splitCommaValues(coloursText)
      .map(normalizeColour)
      .filter(Boolean);

    return parsed.length > 0
      ? Array.from(new Set(parsed))
      : ["Default"];
  }, [coloursText]);

  const [selectedColour, setSelectedColour] = useState(
    colours[0] || "Default",
  );

  const effectiveColour = colours.includes(selectedColour)
    ? selectedColour
    : colours[0] || "Default";

  const firstColour = colours[0] || "Default";

  const parsedGallery = useMemo(
    () => splitCommaValues(galleryText).map(parseTaggedItem),
    [galleryText],
  );

  function findTaggedView(
    colour: string,
    view: GalleryView,
  ) {
    return (
      parsedGallery.find(
        (item) =>
          item.colour === colour &&
          item.view === view,
      )?.url || ""
    );
  }

  const legacyImages = parsedGallery
    .filter((item) => !item.colour || !item.view)
    .map((item) => item.url)
    .filter((url) => url && url !== primaryImage)
    .slice(0, 2);

  const isFirstColour = effectiveColour === firstColour;

  const photo1 = isFirstColour
    ? primaryImage
    : findTaggedView(effectiveColour, 1);

  const photo2 =
    findTaggedView(effectiveColour, 2) ||
    (isFirstColour ? legacyImages[0] || "" : "");

  const photo3 =
    findTaggedView(effectiveColour, 3) ||
    (isFirstColour ? legacyImages[1] || "" : "");

  function saveTaggedView(
    colour: string,
    view: GalleryView,
    url: string,
  ) {
    const current = splitCommaValues(galleryText).map(
      parseTaggedItem,
    );

    const next = current
      .filter((item) => {
        if (
          item.colour === colour &&
          item.view === view
        ) {
          return false;
        }

        if (
          colour === firstColour &&
          !item.colour &&
          !item.view &&
          stripMetadata(item.url) === stripMetadata(url)
        ) {
          return false;
        }

        return true;
      })
      .map((item) => item.raw);

    if (url.trim()) {
      next.push(tagImage(url, colour, view));
    }

    onGalleryChange(next.join(", "));
  }

  function handlePhoto1Change(url: string) {
    if (isFirstColour) {
      onPrimaryChange(stripMetadata(url));
      return;
    }

    saveTaggedView(effectiveColour, 1, url);
  }

  function handlePhoto2Change(url: string) {
    saveTaggedView(effectiveColour, 2, url);
  }

  function handlePhoto3Change(url: string) {
    saveTaggedView(effectiveColour, 3, url);
  }

  function uploadedCountFor(colour: string) {
    const count = [
      colour === firstColour
        ? primaryImage
        : findTaggedView(colour, 1),
      findTaggedView(colour, 2),
      findTaggedView(colour, 3),
    ].filter(Boolean).length;

    return count;
  }

  const uploadedCount = [photo1, photo2, photo3].filter(
    Boolean,
  ).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-black text-slate-950">
          Colour-wise Product Gallery
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          Select a colour and upload Front, Side and Back
          photos for that exact colour. Customers will see
          those images when they select the same colour on
          the KRVE website.
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          Select Colour
        </p>

        <div className="flex flex-wrap gap-2">
          {colours.map((colour) => {
            const count = uploadedCountFor(colour);

            return (
              <button
                key={colour}
                type="button"
                onClick={() => setSelectedColour(colour)}
                className={`rounded-xl border px-4 py-2.5 text-xs font-black transition ${
                  effectiveColour === colour
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {colour}

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[9px] ${
                    effectiveColour === colour
                      ? "bg-white/20 text-white"
                      : count === 3
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}/3
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">
              Selected Colour
            </p>

            <h3 className="mt-1 text-lg font-black text-slate-950">
              {effectiveColour}
            </h3>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${
              uploadedCount === 3
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {uploadedCount}/3 photos uploaded
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GalleryUploader
          number="1"
          title="Front / Main"
          description={
            isFirstColour
              ? "Main website image for this product."
              : `Front image for ${effectiveColour}.`
          }
        >
          <ProductImageUpload
            label="Photo 1 — Front / Main"
            description="Clear front product view."
            value={photo1}
            uploadType={isFirstColour ? "primary" : "gallery"}
            onChange={handlePhoto1Change}
          />
        </GalleryUploader>

        <GalleryUploader
          number="2"
          title="Side / Detail"
          description={`Side or detail view for ${effectiveColour}.`}
        >
          <ProductImageUpload
            label="Photo 2 — Side / Detail"
            description="Show the side, fabric or print detail."
            value={photo2}
            uploadType="gallery"
            onChange={handlePhoto2Change}
          />
        </GalleryUploader>

        <GalleryUploader
          number="3"
          title="Back / Alternate"
          description={`Back or alternate view for ${effectiveColour}.`}
        >
          <ProductImageUpload
            label="Photo 3 — Back / Alternate"
            description="Show the back or another useful angle."
            value={photo3}
            uploadType="gallery"
            onChange={handlePhoto3Change}
          />
        </GalleryUploader>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <GalleryStatus
          number="01"
          label="Front / Main"
          uploaded={Boolean(photo1)}
        />

        <GalleryStatus
          number="02"
          label="Side / Detail"
          uploaded={Boolean(photo2)}
        />

        <GalleryStatus
          number="03"
          label="Back / Alternate"
          uploaded={Boolean(photo3)}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs leading-5 text-slate-600">
          Add colours in the product&apos;s{" "}
          <strong>Colours</strong> field first. Each colour will
          automatically get its own 3-photo gallery here.
        </p>
      </div>
    </div>
  );
}

function GalleryUploader({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
          {number}
        </span>

        <div>
          <p className="text-sm font-black text-slate-950">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

function GalleryStatus({
  number,
  label,
  uploaded,
}: {
  number: string;
  label: string;
  uploaded: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        uploaded
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
            Photo {number}
          </p>

          <p className="mt-1 text-xs font-bold text-slate-800">
            {label}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
            uploaded
              ? "bg-emerald-600 text-white"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {uploaded ? "UPLOADED" : "EMPTY"}
        </span>
      </div>
    </div>
  );
}
