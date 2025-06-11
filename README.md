# COMPANY PROFILE PT AMARA

Website company profile PT Amara Cisadane adalah sebuah platform berbasis web yang dirancang untuk memberikan informasi terkait profil perusahaan. Website ini menggunakan teknologi modern untuk memastikan performa tinggi, fleksibilitas, dan pengalaman pengguna yang optimal.

## Tentang PT Amara Cisadane

PT Amara Cisadane adalah Perseroan Terbatas yang berorientasi pada jasa konsultan manajemen, teknik, serta pelayanan jasa lainnya di bidang sanitasi dan lingkungan. Perusahaan ini juga terdaftar sebagai Lembaga Penyedia Jasa Penyusunan Dokumen AMDAL, mendukung berbagai kegiatan usaha yang berkaitan dengan pengelolaan lingkungan.

## Technologies

Website ini dikembangkan menggunakan teknologi-teknologi berikut:

- **React 19**: Library JavaScript untuk membangun antarmuka pengguna.
- **Next.js 15**: Framework React yang mendukung rendering sisi server dan client dengan App Router terbaru.
- **TailwindCSS**: Framework CSS untuk mendesain antarmuka dengan cepat dan responsif.
- **ShadCN UI**: Komponen antarmuka yang terintegrasi dengan TailwindCSS.
- **Apollo GraphQL/Client**: Library untuk mengelola data dan state menggunakan GraphQL.
- **Zod**: Library untuk validasi data dan skema.
- **Next-Intl**: Library untuk mendukung aplikasi multibahasa.

## Folder Structure

Aplikasi ini menggunakan struktur folder berbasis **App Router** dari Next.js 15. Berikut adalah penjelasan berdasarkan struktur folder yang ada:

- **`app`**:

  - Berisi routing utama aplikasi, termasuk file `page.tsx` dan `layout.tsx`.
  - Setiap sub-folder dalam `app` merepresentasikan rute dinamis atau statis. Contohnya:
    - **`[locale]`**: Mendukung i18n (internationalization) untuk bahasa.
    - **`about`**: Rute untuk halaman "Tentang Kami".
    - **`services`**: Rute untuk halaman daftar layanan.
    - **`services/[slug]`**: Rute dinamis untuk detail layanan tertentu.
    - **`regulations`**: Rute untuk halaman daftar regulasi.
  - **`sitemap.ts`**:
    - File untuk menghasilkan file `sitemap.xml` secara dinamis.
    - Membantu mesin pencari memahami struktur situs.
  - **`robots.ts`**:
    - File untuk mengatur aturan akses mesin pencari dengan `robots.txt`.
    - Mengatur crawler agar hanya mengindeks halaman tertentu.

- **`components`**:

  - Berisi komponen UI yang dapat digunakan ulang di berbagai halaman.

- **`constants`**:

  - Menyimpan nilai tetap atau konfigurasi global.

- **`i18n`**:

  - Menyediakan konfigurasi dan file terjemahan untuk mendukung fitur multibahasa.

- **`lib`**:

  - Berisi fungsi utilitas, konfigurasi, dan helper, termasuk koneksi GraphQL melalui Apollo Client.

- **`messages`**:

  - Menyimpan file terkait pesan atau notifikasi.

- **`assets`**:

  - Berisi file statis seperti gambar, font, dan CSS global.

- **`middleware.ts`**:
  - Berisi middleware untuk mengelola request dan response di server.

## Installation

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan aplikasi:

1. Clone repository ini:

```bash
git clone https://github.com/pushy-code/compro_amara.git
```

2. Masuk ke direktori proyek:

```bash
cd ./compro-amara
```

3. Instal dependensi menggunakan npm atau yarn:

```bash
npm install
# atau
yarn install
```

4. Buat file .env berdasarkan file `.env.example` dan isi dengan konfigurasi yang sesuai.

```.env
NEXT_PUBLIC_IG_CREDENTIAL=
NEXT_PUBLIC_IG_USER_ID=
NEXT_PUBLIC_IG_URL=

NEXT_PUBLIC_ORIGIN_URL=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_TOKEN=
NEXT_PUBLIC_IMAGE_URL=

NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE=

NEXT_PUBLIC_BASE_URL_BLOG=
NEXT_PUBLIC_TOKEN_BLOG=
```

5. Jalankan aplikasi dalam mode pengembangan:

```bash
npm run dev
# atau
yarn dev
```

6. Buka browser dan akses aplikasi di `http://localhost:3000`

## Version Update

## 2.0.4

- FAQ Page

## 2.0.3

- Fixing responsive

## 2.0.2

- Remove activities detail
- Adjust activities page list
- Sitemap

## 2.0.1

- Enhance middleware for unknown routes
- Fixing bugs at gallery page
- Reduce revalidate from 24h to 5m

## 2.0.0

- News and Updates Feature
- Activities Feature
- Gallery and Non Gallery Feature
- Marquee
- Journals Feature

### 1.0.2

- Home: Fixing card porto
- Service Detail: Fixing banner and fixing card advantages

### 1.0.1

- Fixing SEO
- Add documentations

### 1.0.0

- Production
- Fixing card porto hone
- Fixing mobile menu
- Fixing pagination responsive

### 0.4.4

- Fixing home page
- Fixing about experience dialog
- Fixing card advantage service detail

### 0.4.3

- Add function deployment

### 0.4.2

- Fixing footer socmed and address google icon and version
- Fixing help button

### 0.4.1

- Remove next-sitemap

### 0.4.0

- Sitemap update
- Not Found Page

### 0.3.0

- Home Page
- About Page
- Edit function footer
- Fix active menu on mobile menu

### 0.2.0

- Service List
- Service Detail List
- Regulations List

### 0.1.0

- Initial Projects
- Setup Graphql with Apollo
- Setup i18n for translation `English` and `Indonesia`
- Slicing Layouts
