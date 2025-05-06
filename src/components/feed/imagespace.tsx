import { CldImage } from "next-cloudinary";

interface Image {
  secureUrl: string;
  publicId: string;
}

interface ImageGridProps {
  images: Image[];
}
export default function Imagespace({ images }: ImageGridProps) {
  const imageCount = images.length;

  const getGridCols = () => {
    if (imageCount === 1) return "grid-cols-1";
    if (imageCount === 2) return "grid-cols-2";
    return "grid-cols-2"; // Twitter uses 2 cols max
  };

  return (
    <div
      className={`grid ${getGridCols()} gap-1 rounded-xl overflow-hidden max-w-[512px] mx-auto`}
    >
      {images.slice(0, 4).map((image) => (
        <div key={image.publicId} className="relative aspect-[4/3]">
          <CldImage
            src={image.secureUrl}
            alt={image.publicId}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
