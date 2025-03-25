import { AspectRatio } from "@/components/ui/aspect-ratio"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="col-span-2">
        <AspectRatio ratio={16 / 9}>
          <img
            src={images[0]}
            alt="Main property image"
            className="w-full h-full object-cover rounded-lg"
          />
        </AspectRatio>
      </div>
      {images.slice(1).map((image, index) => (
        <AspectRatio key={index} ratio={4 / 3}>
          <img
            src={image}
            alt={`Property image ${index + 2}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </AspectRatio>
      ))}
    </div>
  )
}