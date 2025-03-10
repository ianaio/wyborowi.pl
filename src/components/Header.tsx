// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Wyborowi.pl</h1>
      <nav>
        <a href="/">Home</a> | <a href="/kursy">Kursy</a> | <a href="/o-nas">O nas</a>
      </nav>
    </header>
  );
};

export default Header;
