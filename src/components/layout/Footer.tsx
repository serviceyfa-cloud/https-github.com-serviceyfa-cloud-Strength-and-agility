import React from 'react';
import { STORE_CONFIG } from '../../constants/config';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E5E1DA] mt-auto py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-xs text-[#4B534E]">
          <p className="font-normal">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر «{STORE_CONFIG.name}»
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] text-[#4B534E]">
            <span className="whitespace-nowrap">متوافق مع الهواتف الذكية (من 360px)</span>
            <span className="whitespace-nowrap">واجهة عربية بالكامل RTL</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
