import SectionEyebrow from "@/components/SectionEyebrow";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <>
      <section className="bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Gallery
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Moments from our events, programs, and community across Zimbabwe.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionEyebrow>Snapshots</SectionEyebrow>
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-10">
            Photo Gallery
          </h2>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
