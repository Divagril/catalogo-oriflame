// src/CatalogoDinamico.jsx
import React, { useState } from 'react';
import Catalogo from './Catalogo';

function CatalogoDinamico() {
  const [catalogoActual, setCatalogoActual] = useState('catalogo.pdf');
  
  // Puedes agregar un selector de campañas
  const campañas = {
    'campaña1': '/catalogo-campana1.pdf',
    'campaña2': '/catalogo-campana2.pdf',
    'campaña3': '/catalogo-campana3.pdf'
  };

  return (
    <div>
      {/* Selector de campañas (opcional) */}
      <select 
        onChange={(e) => setCatalogoActual(e.target.value)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none'
        }}
      >
        {Object.entries(campañas).map(([nombre, ruta]) => (
          <option key={nombre} value={ruta}>{nombre}</option>
        ))}
      </select>
      
      <Catalogo pdfPath={catalogoActual} />
    </div>
  );
}

export default CatalogoDinamico;