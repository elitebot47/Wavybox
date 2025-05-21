import { CldImage } from "next-cloudinary";
import { useState } from "react";
interface Image {
  secureUrl: string;
  publicId: string;
}
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface ImageGridProps {
  images: Image[];
}
export default function Imagespace({ images }: ImageGridProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getGridCols = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    return "grid-cols-2";
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`grid ${getGridCols()} gap-1 rounded-xl overflow-hidden max-w-[512px] mx-auto`}
    >
      {images.slice(0, 4).map((image) => (
        <div key={image.publicId} className="relative aspect-[4/3]  ">
          <Dialog>
            <DialogTrigger>
              <CldImage
                src={image.secureUrl}
                alt={image.publicId}
                fill
                className="object-cover"
                loading="lazy"
                onClick={() => setIsOpen(true)}
              />
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="overflow-hidden p-0">
              <CldImage
                width={3000}
                height={3000}
                src={image.secureUrl}
                alt={image.publicId}
                crop="fit"
                loading="lazy"
              />
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
