"use client";

import ProductImageUpload from "@/components/founder/product-image-upload";

type ProductGalleryUploadProps = {
  primaryImage: string;
  galleryText: string;

  onPrimaryChange: (
    url: string,
  ) => void;

  onGalleryChange: (
    value: string,
  ) => void;
};

function parseGallery(
  value: string,
) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) =>
      item.trim(),
    )
    .filter(Boolean);
}

export default function ProductGalleryUpload({
  primaryImage,
  galleryText,
  onPrimaryChange,
  onGalleryChange,
}: ProductGalleryUploadProps) {
  /*
   * Gallery text contains
   * additional product images.
   *
   * Photo 1 = primaryImage
   * Photo 2 = gallery[0]
   * Photo 3 = gallery[1]
   */

  const gallery =
    parseGallery(
      galleryText,
    ).filter(
      (url) =>
        url !==
        primaryImage,
    );

  const photo2 =
    gallery[0] || "";

  const photo3 =
    gallery[1] || "";

  function saveGallery(
    secondImage: string,
    thirdImage: string,
  ) {
    const nextGallery =
      [
        secondImage.trim(),
        thirdImage.trim(),
      ].filter(Boolean);

    onGalleryChange(
      nextGallery.join(
        ", ",
      ),
    );
  }

  function handlePrimaryChange(
    url: string,
  ) {
    onPrimaryChange(url);

    /*
     * Avoid duplicate primary
     * image inside gallery.
     */
    const cleanGallery =
      [
        photo2,
        photo3,
      ].filter(
        (image) =>
          image &&
          image !== url,
      );

    onGalleryChange(
      cleanGallery.join(
        ", ",
      ),
    );
  }

  function handlePhoto2Change(
    url: string,
  ) {
    saveGallery(
      url,
      photo3,
    );
  }

  function handlePhoto3Change(
    url: string,
  ) {
    saveGallery(
      photo2,
      url,
    );
  }

  return (
    <div className="space-y-6">
      {/* INFO */}

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-black text-slate-950">
          Customer Product Gallery
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          Upload up to 3
          different photos of
          the same product.
          Customers will be able
          to switch between these
          photos on the KRVE
          website.
        </p>
      </div>

      {/* IMAGE UPLOADERS */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* PHOTO 1 */}

        <div className="min-w-0">
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                1
              </span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Main Photo
                </p>

                <p className="text-xs text-slate-500">
                  Front view
                </p>
              </div>
            </div>
          </div>

          <ProductImageUpload
            label="Photo 1 — Front / Main"
            description="Main image customers see first."
            value={
              primaryImage
            }
            uploadType="primary"
            onChange={
              handlePrimaryChange
            }
          />
        </div>

        {/* PHOTO 2 */}

        <div className="min-w-0">
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                2
              </span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Second Photo
                </p>

                <p className="text-xs text-slate-500">
                  Side / detail view
                </p>
              </div>
            </div>
          </div>

          <ProductImageUpload
            label="Photo 2 — Side / Detail"
            description="Show another angle or product detail."
            value={
              photo2
            }
            uploadType="gallery"
            onChange={
              handlePhoto2Change
            }
          />
        </div>

        {/* PHOTO 3 */}

        <div className="min-w-0">
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">
                3
              </span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Third Photo
                </p>

                <p className="text-xs text-slate-500">
                  Back / alternate view
                </p>
              </div>
            </div>
          </div>

          <ProductImageUpload
            label="Photo 3 — Back / Alternate"
            description="Show the back or another useful angle."
            value={
              photo3
            }
            uploadType="gallery"
            onChange={
              handlePhoto3Change
            }
          />
        </div>
      </div>

      {/* STATUS */}

      <div className="grid gap-3 sm:grid-cols-3">
        <GalleryStatus
          number="01"
          label="Main"
          uploaded={
            Boolean(
              primaryImage,
            )
          }
        />

        <GalleryStatus
          number="02"
          label="Second View"
          uploaded={
            Boolean(photo2)
          }
        />

        <GalleryStatus
          number="03"
          label="Third View"
          uploaded={
            Boolean(photo3)
          }
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
        <p className="text-xs leading-5 text-slate-500">
          Recommended:
          upload Front, Side
          and Back photos of
          the exact same product
          so customers can inspect
          it properly before
          purchasing.
        </p>
      </div>
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
          {uploaded
            ? "UPLOADED"
            : "EMPTY"}
        </span>
      </div>
    </div>
  );
}
