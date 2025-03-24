# Görev Yönetim Sistemi

Bu proje, departmanlar arası görev yönetimini sağlayan bir web uygulamasıdır.

## Özellikler

- Görev oluşturma, düzenleme, silme
- Görev atama ve durum takibi
- Departman bazlı görev filtreleme
- Öncelik seviyelerine göre görev yönetimi
- Responsive tasarım

## Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Docker (opsiyonel)

## Geliştirme Ortamında Çalıştırma

1. Projeyi klonlayın:

```bash
git clone [repo-url]
cd [proje-dizini]
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

## Docker ile Çalıştırma

1. Docker imajını oluşturun:

```bash
docker build -t gorev-yonetim-sistemi .
```

2. Container'ı çalıştırın:

```bash
docker run -d -p 80:80 gorev-yonetim-sistemi
```

Uygulama http://localhost adresinde çalışacaktır.

## Ortam Değişkenleri

Uygulamanın çalışması için aşağıdaki ortam değişkenlerinin tanımlanması gerekir:

```env
VITE_API_URL=http://api-adresi
```

## Dağıtım

Production ortamına dağıtım için:

1. Production build alın:

```bash
npm run build
```

2. `dist` klasöründeki dosyaları web sunucunuza yükleyin veya Docker imajını kullanın.

## Notlar

- Tüm API istekleri için VITE_API_URL ortam değişkeni kullanılmaktadır
- nginx.conf dosyası SPA routing için gerekli yapılandırmayı içerir
- Docker imajı multi-stage build kullanarak optimize edilmiş boyutta oluşturulur

## Proje Yapısı

```
src/
  ├── components/     # Yeniden kullanılabilir bileşenler
  ├── pages/         # Sayfa bileşenleri
  ├── stores/        # MobX store'ları
  ├── services/      # API servisleri
  ├── utils/         # Yardımcı fonksiyonlar
  └── types/         # TypeScript tip tanımlamaları
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
