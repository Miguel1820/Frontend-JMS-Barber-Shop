import React from 'react';

const Home: React.FC = () => (
  <section className="text-center">
    <h2 className="text-4xl font-bold mb-4">¡Bienvenido a Barbería Elegante!</h2>
    <p className="text-lg mb-6">Donde el estilo y el cuidado se encuentran.</p>
    <img src="/assets/hero.jpg" alt="Barbería" className="w-full max-w-4xl mx-auto rounded" />
  </section>
);

export default Home;