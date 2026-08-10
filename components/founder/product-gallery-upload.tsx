"use client";

import ProductImageUpload from "@/components/founder/product-image-upload";

type ProductGalleryUploadProps = {
  primaryImage: string;
  galleryText: string;
  onPrimaryChange: (url: string) => void;
  onGalleryChange: (value: string) => void;
};

function parseGallery(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProductGalleryUpload({
  primaryImage,
  galleryText,
  onPrimaryChange,
  onGalleryChange,
}: ProductGalleryUploadProps) {
  const existing = parseGallery(galleryText);

  // Primary image is always View 1.
  // Gallery stores only the additional views so we do not duplicate it.
  const additional = existing
    .filter((url) => url !== primaryImage)
    .slice(0, 2);

  const views = [
    primaryImage,
    additional[0] || "",
    additional[1] || "",
  ];

  function updateAdditional(index: 1 | 2, url: string) {
    const next = [views[1], views[2]];
    next[index - 1] = url;

    onGalleryChange(
      next.filter(Boolean).join(", "),
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
        <p className="text-sm font-black text-slate-900">
          Customer Product Gallery
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Add up to 3 clear product views. On the KRVE website,
          customers can tap these photos to inspect the product before buying.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ProductImageUpload
          label="Photo 1 — Main / Front"
          description="This is the main product image shown first to customers."
          value={views[0]}
          uploadType="primary"
          onChange={onPrimaryChange}
        />

        <ProductImageUpload
          label="Photo 2 — Side / Detail"
          description="Add a second angle, side view or close-up detail."
          value={views[1]}
          uploadType="gallery"
          onChange={(url) => updateAdditional(1, url)}
        />

        <ProductImageUpload
          label="Photo 3 — Back / Alternate"
          description="Add a back view or another useful product angle."
          value={views[2]}
          uploadType="gallery"
          onChange={(url) => updateAdditional(2, url)}
        />
      </div>

      <p className="text-xs leading-5 text-slate-500">
        Tip: use photos of the same product and same selected colour for the
        clearest customer experience.
      </p>
    </div>
  );
}
