import React from 'react';

const services = [
  { name: 'Corte clásico', price: 15, description: 'Corte tradicional con precisión.' },
  { name: 'Barba', price: 12, description: 'Afeitado y diseño de barba.' },
  { name: 'Corte + Barba', price: 25, description: 'Todo en uno para un look completo.' },
];

const Services: React.FC = () => (
  <section>
    <h2 className="text-3xl font-bold mb-6 text-center">Servicios</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {services.map((s) => (
        <div key={s.name} className="border rounded p-4 shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2">{s.name}</h3>
          <p className="text-gray-600 mb-2">{s.description}</p>
          <p className="text-primary font-bold">${s.price}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;