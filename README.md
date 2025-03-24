# Görev Yönetim Sistemi

Bu proje, departmanlar arası görev yönetimini sağlayan bir web uygulamasıdır.

## LIVE LINK -> http://167.86.125.48:8058/

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
