import CircularGallery from "../components/ui/CircularGallery";

const items = [
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    text: "Readers",
  },
  {
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    text: "Library",
  },
  {
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    text: "Bookshelf",
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    text: "Study",
  },
  {
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    text: "Stories",
  },
];

export default function GallerySection() {
  return (
    <section className="w-full h-[600px] relative bg-white/70 overflow-hidden">
      <CircularGallery
        items={items}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </section>
  );
}


