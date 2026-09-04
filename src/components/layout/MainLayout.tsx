import React from 'react';
import { BaseComponentProps } from '../../types';
import { STORE_CONFIG } from '../../constants/config';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout: React.FC<BaseComponentProps> = ({ children }) => {
  return (
    <div
      dir={STORE_CONFIG.direction}
      lang={STORE_CONFIG.locale}
      className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#171816] min-w-[360px]"
    >
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};
