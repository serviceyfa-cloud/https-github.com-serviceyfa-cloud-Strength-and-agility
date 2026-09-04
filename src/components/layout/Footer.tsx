import React from 'react';
import { STORE_CONFIG } from '../../constants/config';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E2E8F0] mt-auto py-8 select-none">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-xs text-[#64748B]">
          <p className="font-medium text-[#0F172A]">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر «{STORE_CONFIG.name}»
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] text-[#64748B]">
            <span className="whitespace-nowrap">متوافق مع الهواتف الذكية (من 360px)</span>
            <span className="whitespace-nowrap">واجهة عربية بالكامل RTL</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
