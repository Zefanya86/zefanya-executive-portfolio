'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function MarqueeTicker() {
  const { locale } = usePortfolio();

  const itemsByLocale = {
    id: [
      'OPERATIONS MANAGEMENT',
      'STRATEGIC PROCUREMENT',
      'LOGISTIK TRANSPORTASI MINERAL',
      'INFRASTRUKTUR JEMBATAN MARITIM',
      'REAL ESTATE OPERATIONS',
      '1.100 DOSIS VAKSINASI KAPOLRI & BEM',
      'PRESIDEN MAHASISWA BEM UBJ',
      'BRANCH LEADER GEMA-RI BEKASI',
      'KPI MONITORING & SOP COMPLIANCE',
      'SARJANA ILMU KOMUNIKASI (S.IKOM)',
    ],
    en: [
      'EXECUTIVE OPERATIONS MANAGEMENT',
      'STRATEGIC MATERIAL PROCUREMENT',
      'MINERAL FLOW TRANSPORT LOGISTICS',
      'MARITIME BRIDGE INFRASTRUCTURE',
      'COMMERCIAL REAL ESTATE OPERATIONS',
      '1,100 VACCINE DOSES MOBILIZATION',
      'STUDENT BODY PRESIDENT BEM UBJ',
      'GEMA-RI BEKASI BRANCH LEADER',
      'KPI MONITORING & SOP COMPLIANCE',
      'BACHELOR OF COMMUNICATION SCIENCE',
    ],
    zh: [
      '全面高管精益运营',
      '重大战略物资采购',
      '大宗矿产长途转运调度',
      '国家跨海特大桥工程供应链',
      '商业地产开发与管理',
      '1100剂新冠疫苗公共健康联合行动',
      '全校最高学生会总会主席',
      'GEMA-RI 青年组织分会负责人',
      '全流程KPI监控与SOP合规',
      '传播学荣誉学士学位',
    ],
  };

  const items = itemsByLocale[locale] || itemsByLocale.id;

  return (
    <div className="relative w-full overflow-hidden border-y border-hairline bg-charcoal/90 backdrop-blur-md py-3.5 select-none z-20">
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-6 sm:mx-10">
            <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] uppercase text-softGray hover:text-gold transition-colors">
              {item}
            </span>
            <span className="ml-6 sm:ml-10 text-gold font-bold text-xs select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
