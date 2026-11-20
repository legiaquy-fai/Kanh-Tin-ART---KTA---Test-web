import React from 'react';
import type {IllustrationKey} from '../data/fruits';

interface FruitArtworkProps {
  variant: IllustrationKey | 'hero' | 'orchard';
  className?: string;
}

export const FruitArtwork: React.FC<FruitArtworkProps> = ({variant, className = ''}) => {
  switch (variant) {
    case 'hero':
      return (
        <svg
          viewBox="0 0 800 600"
          className={`w-full h-full object-cover ${className}`}
          role="img"
          aria-label="Mâm trái cây tươi theo mùa gồm xoài cát Hòa Lộc, măng cụt, bưởi da xanh và nho mẫu đơn"
        >
          <defs>
            <linearGradient id="heroStone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ECEEE9" />
              <stop offset="100%" stopColor="#DFE3DC" />
            </linearGradient>
            <radialGradient id="mangoGlow" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F8CF62" />
              <stop offset="65%" stopColor="#E6A628" />
              <stop offset="100%" stopColor="#C98314" />
            </radialGradient>
            <radialGradient id="pomeloGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#94BA6B" />
              <stop offset="65%" stopColor="#5D8743" />
              <stop offset="100%" stopColor="#3E612B" />
            </radialGradient>
            <radialGradient id="mangosteenSkin" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6D324D" />
              <stop offset="70%" stopColor="#44182D" />
              <stop offset="100%" stopColor="#280D1B" />
            </radialGradient>
            <radialGradient id="grapeShine" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#C5DF8D" />
              <stop offset="65%" stopColor="#85B352" />
              <stop offset="100%" stopColor="#5D8634" />
            </radialGradient>
          </defs>

          <rect width="800" height="600" fill="url(#heroStone)" />
          {/* Subtle limestone architectural shadow */}
          <polygon points="0,430 800,375 800,600 0,600" fill="#D5DAD2" opacity="0.55" />
          <ellipse cx="410" cy="435" rx="260" ry="44" fill="#B8BEB4" opacity="0.45" />

          {/* Ceramic serving plinth */}
          <ellipse cx="400" cy="410" rx="235" ry="42" fill="#F7F8F5" stroke="#CED3CB" strokeWidth="2" />
          <path d="M165 410 L165 432 C165 456 635 456 635 432 L635 410" fill="#E3E6E0" />

          {/* Botanical branch behind */}
          <path d="M225 225 C285 180 340 160 400 175" stroke="#315737" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M270 198 C240 155 215 142 195 152 C205 178 232 195 270 198 Z" fill="#4A744B" />
          <path d="M335 170 C350 125 380 112 405 120 C392 148 365 166 335 170 Z" fill="#3B623D" />

          {/* Green Pomelo (back left) */}
          <g transform="translate(275, 290)">
            <ellipse cx="0" cy="95" rx="75" ry="18" fill="#18221B" opacity="0.14" />
            <path d="M-82 15 C-85 -55 -40 -95 0 -95 C45 -95 85 -55 82 15 C80 65 48 92 0 92 C-48 92 -80 65 -82 15 Z" fill="url(#pomeloGrad)" />
            <ellipse cx="-26" cy="-42" rx="18" ry="11" fill="#BDD799" opacity="0.32" transform="rotate(-24 -26 -42)" />
            <path d="M-4 -95 C-4 -112 10 -120 22 -118" stroke="#3E5629" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          {/* Golden Mango (center foreground) */}
          <g transform="translate(415, 335) rotate(-14)">
            <ellipse cx="5" cy="58" rx="88" ry="22" fill="#18221B" opacity="0.18" />
            <path
              d="M-92 -10 C-95 -52 -42 -76 24 -68 C78 -60 105 -25 94 12 C82 48 25 66 -32 58 C-74 52 -90 25 -92 -10 Z"
              fill="url(#mangoGlow)"
            />
            <ellipse cx="-28" cy="-34" rx="28" ry="10" fill="#FDE59C" opacity="0.45" />
          </g>

          {/* Second Mango tucked behind */}
          <g transform="translate(505, 295) rotate(16)">
            <path
              d="M-76 -8 C-78 -44 -34 -64 20 -56 C65 -49 88 -20 78 10 C68 40 20 54 -26 48 C-62 43 -74 20 -76 -8 Z"
              fill="url(#mangoGlow)"
            />
          </g>

          {/* Shine Muscat Grapes cluster (right) */}
          <g transform="translate(535, 320)">
            <path d="M-15 -65 C-8 -88 8 -96 22 -94" stroke="#4D6636" strokeWidth="4" fill="none" strokeLinecap="round" />
            {[
              [0, -45, 22], [-22, -32, 21], [22, -30, 21],
              [-32, -8, 22], [-6, -10, 23], [24, -6, 22],
              [-20, 18, 22], [8, 20, 22], [32, 16, 19],
              [-6, 44, 21], [18, 42, 19], [5, 65, 18],
            ].map(([cx, cy, r], idx) => (
              <g key={idx}>
                <circle cx={cx} cy={cy} r={r} fill="url(#grapeShine)" />
                <ellipse cx={cx - r * 0.3} cy={cy - r * 0.3} rx={r * 0.25} ry={r * 0.16} fill="#E6F4C2" opacity="0.55" />
              </g>
            ))}
          </g>

          {/* Mangosteens (front left, one halved) */}
          <g transform="translate(265, 392)">
            <circle cx="-40" cy="4" r="36" fill="url(#mangosteenSkin)" />
            <path d="M-54 -28 C-46 -38 -32 -38 -25 -28 C-34 -24 -45 -24 -54 -28 Z" fill="#4C743D" />
            {/* Halved mangosteen */}
            <circle cx="34" cy="12" r="36" fill="#5A233D" />
            <circle cx="34" cy="12" r="28" fill="#B6496C" />
            <circle cx="34" cy="12" r="21" fill="#F9F7F2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="34"
                y1="12"
                x2={34 + Math.cos((deg * Math.PI) / 180) * 20}
                y2={12 + Math.sin((deg * Math.PI) / 180) * 20}
                stroke="#DFDBD2"
                strokeWidth="1.5"
              />
            ))}
          </g>
        </svg>
      );

    case 'orchard':
      return (
        <svg
          viewBox="0 0 800 600"
          className={`w-full h-full object-cover ${className}`}
          role="img"
          aria-label="Giỏ tre thu hoạch xoài chín vàng tại nhà vườn miền Tây"
        >
          <defs>
            <linearGradient id="orchardBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DDE5D8" />
              <stop offset="100%" stopColor="#C4D0BE" />
            </linearGradient>
            <linearGradient id="bambooBasket" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9A26B" />
              <stop offset="100%" stopColor="#9A723F" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#orchardBg)" />
          {/* Soft orchard canopy */}
          <circle cx="150" cy="90" r="140" fill="#466948" opacity="0.22" />
          <circle cx="650" cy="110" r="170" fill="#325337" opacity="0.18" />
          <ellipse cx="400" cy="490" rx="235" ry="38" fill="#8A9984" opacity="0.45" />

          {/* Woven bamboo harvest basket */}
          <path d="M185 290 L615 290 L565 475 C555 492 245 492 235 475 Z" fill="url(#bambooBasket)" />
          <ellipse cx="400" cy="290" rx="215" ry="38" fill="#815C30" stroke="#D5B27E" strokeWidth="8" />

          {/* Basket weave lines */}
          {[330, 375, 420, 460].map((y) => (
            <path key={y} d={`M${195 + (y - 290) * 0.25} ${y} Q400 ${y + 26} ${605 - (y - 290) * 0.25} ${y}`} stroke="#78542B" strokeWidth="2.5" fill="none" opacity="0.55" />
          ))}

          {/* Harvested mangoes & leaves inside basket */}
          <g transform="translate(310, 265) rotate(-18)">
            <ellipse cx="0" cy="0" rx="68" ry="44" fill="#EBB031" />
            <ellipse cx="-18" cy="-16" rx="24" ry="10" fill="#FCE08B" opacity="0.55" />
          </g>
          <g transform="translate(455, 258) rotate(15)">
            <ellipse cx="0" cy="0" rx="70" ry="45" fill="#E4A222" />
            <ellipse cx="-15" cy="-15" rx="24" ry="10" fill="#FCE08B" opacity="0.45" />
          </g>
          <g transform="translate(385, 285) rotate(-4)">
            <ellipse cx="0" cy="0" rx="74" ry="46" fill="#F2BF44" />
            <ellipse cx="-20" cy="-18" rx="28" ry="11" fill="#FDE8A6" opacity="0.6" />
          </g>

          {/* Fresh green orchard leaves tucked around rim */}
          <path d="M210 282 C175 235 190 198 228 212 C232 245 224 270 210 282 Z" fill="#38623B" />
          <path d="M565 275 C605 225 630 215 645 235 C625 268 592 278 565 275 Z" fill="#467347" />
          <path d="M350 232 C345 182 378 158 408 175 C395 205 375 225 350 232 Z" fill="#305633" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Xoài Cát Hòa Lộc">
          <defs>
            <radialGradient id="prodMango" cx="35%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#FBE07B" />
              <stop offset="60%" stopColor="#EAAC2C" />
              <stop offset="100%" stopColor="#C97E12" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="205" cy="226" rx="115" ry="20" fill="#D2D5CE" />
          {/* Leaf */}
          <path d="M225 112 C255 62 308 55 326 76 C298 104 260 116 225 112 Z" fill="#3A663D" />
          <path d="M225 112 C258 92 288 84 316 78" stroke="#6B986D" strokeWidth="1.5" fill="none" />
          {/* Back Mango */}
          <g transform="translate(232, 152) rotate(18)">
            <path d="M-74 -8 C-76 -42 -32 -60 18 -52 C60 -46 82 -18 72 10 C62 38 18 52 -24 46 C-58 41 -72 18 -74 -8 Z" fill="url(#prodMango)" />
          </g>
          {/* Front Mango */}
          <g transform="translate(172, 170) rotate(-14)">
            <path d="M-82 -10 C-85 -48 -36 -68 22 -60 C68 -52 92 -22 82 10 C70 42 22 58 -28 52 C-66 46 -80 22 -82 -10 Z" fill="url(#prodMango)" />
            <ellipse cx="-24" cy="-28" rx="26" ry="9" fill="#FFF1B8" opacity="0.55" />
          </g>
        </svg>
      );

    case 'mangosteen':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Măng Cụt Lái Thiêu">
          <defs>
            <radialGradient id="prodMst" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#72314F" />
              <stop offset="70%" stopColor="#46162D" />
              <stop offset="100%" stopColor="#260A18" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="228" rx="115" ry="18" fill="#D2D5CE" />
          {/* Whole fruit left */}
          <g transform="translate(148, 168)">
            <circle cx="0" cy="0" r="56" fill="url(#prodMst)" />
            <ellipse cx="-18" cy="-20" rx="14" ry="9" fill="#A15D7C" opacity="0.35" transform="rotate(-25 -18 -20)" />
            <path d="M-22 -52 C-10 -66 10 -66 22 -52 C10 -44 -10 -44 -22 -52 Z" fill="#4B753D" />
            <path d="M0 -56 L5 -74" stroke="#3B5B2F" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* Halved fruit right */}
          <g transform="translate(252, 178)">
            <circle cx="0" cy="0" r="52" fill="#591E3A" />
            <circle cx="0" cy="0" r="40" fill="#B4466B" />
            <circle cx="0" cy="0" r="30" fill="#FAF8F3" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 29}
                y2={Math.sin((deg * Math.PI) / 180) * 29}
                stroke="#DCD7CD"
                strokeWidth="2"
              />
            ))}
          </g>
        </svg>
      );

    case 'strawberry':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Dâu Tây Giống Nhật Đà Lạt">
          <defs>
            <radialGradient id="prodStraw" cx="35%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#E94E48" />
              <stop offset="65%" stopColor="#C12724" />
              <stop offset="100%" stopColor="#8B1516" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="232" rx="122" ry="18" fill="#D2D5CE" />
          {/* Shallow matte ceramic bowl */}
          <path d="M100 185 L300 185 C292 224 250 232 200 232 C150 232 108 224 100 185 Z" fill="#EAEBE6" stroke="#D5D7D0" strokeWidth="1.5" />
          <ellipse cx="200" cy="185" rx="100" ry="16" fill="#F7F8F5" stroke="#D5D7D0" strokeWidth="1.5" />
          {/* Strawberries */}
          {[
            {x: 155, y: 156, r: -16, s: 0.9},
            {x: 245, y: 158, r: 18, s: 0.92},
            {x: 200, y: 148, r: 2, s: 1.05},
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x}, ${b.y}) rotate(${b.r}) scale(${b.s})`}>
              <path d="M-32 -16 C-34 -38 34 -38 32 -16 C30 14 10 42 0 44 C-10 42 -30 14 -32 -16 Z" fill="url(#prodStraw)" />
              {/* Seeds */}
              {[[-12, -10], [0, -14], [14, -8], [-10, 6], [6, 8], [0, 22]].map(([sx, sy], j) => (
                <circle key={j} cx={sx} cy={sy} r="1.5" fill="#F7CE76" />
              ))}
              {/* Calyx */}
              <path d="M-22 -28 Q-8 -40 0 -30 Q8 -40 22 -28 Q8 -24 0 -20 Q-8 -24 -22 -28 Z" fill="#3E6E3B" />
              <path d="M0 -30 L0 -44" stroke="#3E6E3B" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      );

    case 'shinemuscat':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Nho Mẫu Đơn Shine Muscat">
          <defs>
            <radialGradient id="prodGrape" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#D3EB9B" />
              <stop offset="65%" stopColor="#8EBE58" />
              <stop offset="100%" stopColor="#5D8B33" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="205" cy="242" rx="95" ry="15" fill="#D2D5CE" />
          {/* Stem */}
          <path d="M198 68 C202 50 218 44 230 48" stroke="#536C38" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M198 68 C178 58 158 64 148 76 C168 82 186 78 198 68 Z" fill="#467242" />
          {[
            [180, 96, 20], [218, 96, 20],
            [160, 120, 21], [198, 122, 22], [236, 120, 21],
            [154, 150, 20], [186, 152, 22], [220, 152, 21], [248, 146, 19],
            [172, 180, 21], [204, 182, 21], [232, 176, 19],
            [188, 208, 20], [216, 206, 18],
            [202, 228, 18],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="url(#prodGrape)" />
              <ellipse cx={cx - r * 0.3} cy={cy - r * 0.3} rx={r * 0.25} ry={r * 0.15} fill="#F2FBE0" opacity="0.6" />
            </g>
          ))}
        </svg>
      );

    case 'pomelo':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Bưởi Da Xanh Ruột Hồng">
          <defs>
            <radialGradient id="prodPomelo" cx="35%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#9EC473" />
              <stop offset="65%" stopColor="#608B45" />
              <stop offset="100%" stopColor="#3B5C28" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="195" cy="232" rx="125" ry="18" fill="#D2D5CE" />
          {/* Whole green pomelo */}
          <g transform="translate(158, 156)">
            <path d="M-70 12 C-72 -48 -34 -78 0 -78 C38 -78 72 -48 70 12 C68 54 40 76 0 76 C-40 76 -68 54 -70 12 Z" fill="url(#prodPomelo)" />
            <ellipse cx="-22" cy="-34" rx="16" ry="9" fill="#CEE5AA" opacity="0.38" transform="rotate(-22 -22 -34)" />
            <path d="M0 -78 L6 -92" stroke="#425C2C" strokeWidth="4" strokeLinecap="round" />
          </g>
          {/* Peeled rose-pink segments on stone dish */}
          <g transform="translate(268, 198)">
            <ellipse cx="0" cy="20" rx="64" ry="16" fill="#E5E7E1" stroke="#CFD2CA" strokeWidth="1.5" />
            <path d="M-38 14 C-32 -14 -8 -22 10 -14 C2 4 -12 18 -38 14 Z" fill="#E77B84" />
            <path d="M-12 18 C-2 -10 24 -16 40 -6 C30 12 14 22 -12 18 Z" fill="#DE6672" />
          </g>
        </svg>
      );

    case 'giftbox':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Hộp Quà Biếu Ngũ Quả Thanh Lịch">
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="238" rx="142" ry="18" fill="#D2D5CE" />
          {/* Wooden box base */}
          <rect x="78" y="102" width="244" height="130" rx="4" fill="#C9A87C" stroke="#B08D5E" strokeWidth="2" />
          {/* Linen interior */}
          <rect x="90" y="114" width="220" height="106" rx="2" fill="#EDEBE4" />
          {/* Arranged fruits inside */}
          <ellipse cx="145" cy="166" rx="38" ry="28" fill="#EBAC2A" transform="rotate(-18 145 166)" />
          <circle cx="215" cy="148" r="14" fill="#92BE5C" />
          <circle cx="238" cy="152" r="14" fill="#82AF4D" />
          <circle cx="226" cy="172" r="14" fill="#92BE5C" />
          <circle cx="204" cy="174" r="14" fill="#7DA848" />
          <circle cx="272" cy="172" r="24" fill="#B92832" />
          <circle cx="152" cy="198" r="16" fill="#632644" />
          <circle cx="268" cy="136" r="16" fill="#D5403B" />
          {/* Forest green ribbon band */}
          <rect x="78" y="196" width="244" height="18" fill="#1E4D2B" />
        </svg>
      );

    case 'durian':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Sầu Riêng Ri6 Tách Múi">
          <defs>
            <radialGradient id="prodDurian" cx="38%" cy="35%" r="68%">
              <stop offset="0%" stopColor="#FBE06B" />
              <stop offset="65%" stopColor="#E6B628" />
              <stop offset="100%" stopColor="#C48F14" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="226" rx="115" ry="18" fill="#D2D5CE" />
          {/* Ceramic tray */}
          <rect x="96" y="176" width="208" height="44" rx="20" fill="#FAFAFA" stroke="#D5D7D0" strokeWidth="1.5" />
          {/* Golden durian lobes */}
          <path d="M118 176 C118 134 166 122 195 148 C206 158 192 188 158 190 C130 192 118 186 118 176 Z" fill="url(#prodDurian)" />
          <path d="M188 168 C192 122 252 118 278 148 C288 164 274 192 232 192 C202 192 186 182 188 168 Z" fill="url(#prodDurian)" />
          <ellipse cx="152" cy="148" rx="18" ry="8" fill="#FFF3B0" opacity="0.55" transform="rotate(-12 152 148)" />
          <ellipse cx="234" cy="146" rx="20" ry="8" fill="#FFF3B0" opacity="0.55" transform="rotate(10 234 146)" />
        </svg>
      );

    case 'cherry':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Cherry Đỏ Washington">
          <defs>
            <radialGradient id="prodCherry" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#C42530" />
              <stop offset="65%" stopColor="#7E111A" />
              <stop offset="100%" stopColor="#4A070D" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="232" rx="108" ry="16" fill="#D2D5CE" />
          {/* Stems */}
          <path d="M158 172 C172 118 192 86 218 68" stroke="#4F7038" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M236 184 C232 132 225 94 218 68" stroke="#4F7038" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M218 68 C242 54 272 58 286 72 C266 84 238 82 218 68 Z" fill="#3D693D" />
          {/* Cherries */}
          <circle cx="155" cy="190" r="38" fill="url(#prodCherry)" />
          <ellipse cx="141" cy="174" rx="10" ry="6" fill="#F48B92" opacity="0.45" transform="rotate(-24 141 174)" />
          <circle cx="236" cy="200" r="40" fill="url(#prodCherry)" />
          <ellipse cx="222" cy="182" rx="10" ry="6" fill="#F48B92" opacity="0.45" transform="rotate(-24 222 182)" />
        </svg>
      );

    case 'lychee':
      return (
        <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} role="img" aria-label="Vải Thiều Tổ Thanh Hà">
          <defs>
            <radialGradient id="prodLychee" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#DF575C" />
              <stop offset="65%" stopColor="#B82B36" />
              <stop offset="100%" stopColor="#851923" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#F3F4F1" />
          <ellipse cx="200" cy="232" rx="112" ry="16" fill="#D2D5CE" />
          {/* Branch & leaves */}
          <path d="M180 94 L218 68 L244 102" stroke="#5C6C44" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M218 68 C252 52 284 60 295 78 C268 88 238 82 218 68 Z" fill="#3D693F" />
          {/* Lychee fruits */}
          <circle cx="164" cy="166" r="36" fill="url(#prodLychee)" />
          <circle cx="234" cy="158" r="34" fill="url(#prodLychee)" />
          {/* Peeled lychee in front */}
          <circle cx="202" cy="198" r="32" fill="#F7F5EE" stroke="#E0DDD3" strokeWidth="2" />
          <ellipse cx="202" cy="198" rx="11" ry="15" fill="#4B281B" opacity="0.18" />
        </svg>
      );
  }
};
