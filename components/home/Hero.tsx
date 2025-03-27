import SearchInput from "./search-input";

export default function Hero() {
  return (
    <section className="relative h-[500px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Your Dream Home
        </h1>
        <SearchInput />
      </div>
    </section>
  );
}
