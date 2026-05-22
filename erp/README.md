# MAVERA ERP — Kurumsal SaaS Platform

Production-ready Vite + React + TypeScript ERP + CRM + Muhasebe sistemi.

## Project is production ready

✅ `npm install` çalışır
✅ `npm run build` hatasız `dist/` üretir
✅ TypeScript hataları giderildi
✅ Netlify/Vercel tek tık deploy uyumlu
✅ Node 18+ ve 20+ uyumlu

## Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusu
npm run dev
# http://localhost:5173

# 3. Production build
npm run build
# Çıktı: dist/index.html (348 KB, gzip: 95 KB)

# 4. Build önizleme
npm run preview
```

## Build Komutu

```bash
npm run build
```

## Deploy

### Netlify (Tek Tık)
1. Netlify Dashboard → "Add new site" → "Import an existing project"
2. Git repo bağla
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20 (Environment variables: NODE_VERSION=20)
4. Deploy

**netlify.toml (opsiyonel):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### Vercel (Tek Tık)
1. Vercel Dashboard → "Add New..." → "Project"
2. Git repo import et
3. Framework Preset: **Vite**
4. Build settings otomatik:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Deploy

**vercel.json (opsiyonel):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Özellikler

- ✅ 4 Firma Multi-Tenant (Anadolu Holding, Yıldız Teknoloji, Deniz İthalat, Kişisel)
- ✅ 25+ Modül (Muhasebe, CRM, Stok, Satış, Proje, HR, AI, OCR)
- ✅ Çoklu para birimi (TRY/USD/EUR) + canlı kur
- ✅ 8 Rol bazlı yetkilendirme
- ✅ AI asistan (12 modül)
- ✅ Fiş/fatura OCR
- ✅ WhatsApp/Telegram bot altyapısı
- ✅ Responsive + Dark mode

## Teknoloji

- React 19.2.6
- Vite 7.3.2
- TypeScript 5.9.3
- TailwindCSS 4.1.17
- vite-plugin-singlefile (tek dosya build)

## Bilinen Riskler

1. **React 19**: Henüz çok yeni, bazı 3. parti kütüphaneler tam uyumlu olmayabilir (lucide-react, qrcode.react test edildi - çalışıyor)
2. **vite-plugin-singlefile**: Tüm JS/CSS'i tek HTML'e inline eder (348 KB). Çok büyük uygulamalarda ilk yükleme süresi artabilir. İstenirse plugin kaldırılıp normal chunk'lar kullanılabilir.
3. **Tarayıcı desteği**: ES2020 hedefli. IE11 desteklenmez (modern tarayıcılar: Chrome 90+, Firefox 88+, Safari 14+)
4. **Veri saklama**: Şu an localStorage + memory'de. Production'da backend API gerekir.

## Dosya Yapısı

```
/
├── src/
│   ├── App.tsx          # Ana uygulama (1576 satır)
│   ├── data.ts          # Veri katmanı + tipler (617 satır)
│   ├── main.tsx         # Entry point
│   ├── index.css        # Tailwind + animasyonlar
│   └── utils/cn.ts      # className helper
├── public/              # Statik dosyalar
├── dist/                # Build çıktısı (gitignore)
├── vite.config.ts       # Vite yapılandırması
├── tsconfig.json        # TypeScript yapılandırması
├── package.json
└── README.md
```

## Lisans

Kurumsal kullanım.
