"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-2 relative group">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={images[0] || "/placeholder.svg"}
                alt={`${title} - Main Image`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg" />
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => openLightbox(0)}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </AspectRatio>
          </div>

          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative group hidden md:block">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg" />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => openLightbox(index + 1)}
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </AspectRatio>
            </div>
          ))}

          {images.length > 5 && (
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 md:right-20"
              onClick={() => openLightbox(5)}
            >
              +{images.length - 5} more
            </Button>
          )}
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-background/95 backdrop-blur-sm">
          <DialogTitle />
          <div className="relative h-[80vh]">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
