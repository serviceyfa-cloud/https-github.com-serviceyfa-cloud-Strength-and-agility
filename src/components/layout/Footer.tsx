import React from 'react';
import { STORE_CONFIG } from '../../constants/config';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#E8E2D5] mt-auto py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-xs text-[#666861]">
          <p className="font-normal">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر «{STORE_CONFIG.name}»
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1 text-[11px] text-[#7A7C75]">
            <span className="whitespace-nowrap">متوافق مع الهواتف الذكية (من 360px)</span>
            <span className="text-[#C5BEB1] hidden sm:inline" aria-hidden="true">•</span>
            <span className="whitespace-nowrap">واجهة عربية بالكامل RTL</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
