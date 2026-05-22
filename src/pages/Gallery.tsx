import React from 'react';

// Por ahora usamos imágenes estáticas en la carpeta public/assets
const images = [
  '/assets/gallery1.jpg',
  '/assets/gallery2.jpg',
  '/assets/gallery3.jpg',
];

const Gallery: React.FC = () => (
  <section>
    <h2 className="text-3xl font-bold mb-6 text-center">Galería</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Imagen ${idx + 1}`}
          className="w-full h-48 object-cover rounded shadow"
        />
      ))}
    </div>
  </section>
);

export default Gallery;