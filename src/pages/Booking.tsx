import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Booking: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [service, setService] = useState('Corte clásico');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llamada placeholder a la API del backend
    await fetch('http://localhost:8000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_name: name, service, date }),
    });
    alert('Cita solicitada');
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-center">Reserva tu cita</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Corte clásico</option>
          <option>Barba</option>
          <option>Corte + Barba</option>
        </select>
        <Calendar onChange={setDate} value={date} />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
        >
          Reservar
        </button>
      </form>
    </section>
  );
};

export default Booking;