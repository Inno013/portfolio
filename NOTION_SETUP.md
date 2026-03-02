# 📋 Panduan Setup Notion CMS untuk Portfolio

Ikuti langkah-langkah ini untuk menghubungkan Notion sebagai CMS portfoliomu.

---

## 1. Buat Notion Integration

1. Buka [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Klik **"+ New integration"**
3. Isi nama (misal: `Portfolio CMS`), pilih workspace kamu
4. Klik **Submit** → copy **Internal Integration Token** (format: `secret_xxx...`)
5. Simpan sebagai `NOTION_API_KEY` di file `.env`

---

## 2. Buat Database-Database di Notion

Buat 5 database baru di Notion (bisa di satu halaman yang sama). Untuk setiap database, kamu perlu **share** ke integration:

> Buka database → klik `•••` → **Add connections** → pilih integrasi kamu.

---

### Database 1: Profile 👤

**Nama database:** `Portfolio Profile`

| Property Name | Type         | Keterangan                          |
| ------------- | ------------ | ----------------------------------- |
| Name          | Title        | Nama lengkap kamu                   |
| Greeting      | Rich Text    | Contoh: "Hello 👋"                  |
| Role          | Rich Text    | Contoh: "Full Stack Developer"      |
| Description   | Rich Text    | Bio singkat (500 karakter)          |
| CV URL        | URL          | Link ke file CV (Google Drive, dll) |
| Email         | Email        | Email publik kamu                   |
| Phone         | Phone Number | Nomor telepon (opsional)            |
| Profile Image | URL          | Link gambar profil                  |
| GitHub        | URL          | https://github.com/username         |
| LinkedIn      | URL          | https://linkedin.com/in/username    |
| Instagram     | URL          | https://instagram.com/username      |
| Facebook      | URL          | https://facebook.com/username       |
| WhatsApp      | URL          | https://wa.me/628123456789          |

> ⚠️ Buat **satu baris saja** di database ini.

---

### Database 2: Skills ⚡

**Nama database:** `Portfolio Skills`

| Property Name | Type      | Keterangan                                                              |
| ------------- | --------- | ----------------------------------------------------------------------- |
| Name          | Title     | Nama skill (contoh: "TypeScript")                                       |
| Category      | Select    | Pilihan: `Frontend`, `Backend`, `Database`, `Design`, `Tools`, `Mobile` |
| Level         | Number    | Persentase kemampuan: 0–100                                             |
| Icon          | Rich Text | Emoji (contoh: "🟦", "⚛️", "🚀")                                        |
|            | Number    | Urutan tampil (1 = paling atas)                                         |

---

### Database 3: Projects 🗂️

**Nama database:** `Portfolio Projects`

| Property Name | Type          | Keterangan                                       |
| ------------- | ------------- | ------------------------------------------------ |
| Title         | Title         | Nama project                                     |
| Description   | Rich Text     | Deskripsi singkat project                        |
| Tags          | Multi-select  | Teknologi yang dipakai (contoh: React, Node.js)  |
| Live URL      | URL           | Link demo/live (opsional)                        |
| GitHub URL    | URL           | Link repository GitHub (opsional)                |
| Image         | Files & Media | Screenshot/thumbnail project                     |
| Image URL     | URL           | Alternatif: link gambar langsung                 |
| Featured      | Checkbox      | ✅ untuk proyek unggulan (tampil lebih besar)    |
| Status        | Select        | `Active` atau `Archived` (Archived tidak tampil) |
| Order         | Number        | Urutan tampil                                    |

---

### Database 4: Experience 💼

**Nama database:** `Portfolio Experience`

| Property Name | Type      | Keterangan                                         |
| ------------- | --------- | -------------------------------------------------- |
| Company       | Title     | Nama perusahaan/klien                              |
| Role          | Rich Text | Posisi/jabatan kamu                                |
| Start Date    | Date      | Tanggal mulai bekerja                              |
| End Date      | Date      | Tanggal selesai (kosongkan jika masih berlangsung) |
| Is Current    | Checkbox  | ✅ jika masih bekerja di sini                      |
| Description   | Rich Text | Deskripsi pekerjaan/tanggung jawab                 |
| Type          | Select    | `Work`, `Freelance`, `Internship`, `Contract`      |
| Logo URL      | URL       | Link logo perusahaan (opsional)                    |

---

### Database 5: Education 🎓

**Nama database:** `Portfolio Education`

| Property Name | Type      | Keterangan                        |
| ------------- | --------- | --------------------------------- |
| Institution   | Title     | Nama universitas/sekolah          |
| Degree        | Rich Text | Contoh: "Bachelor's Degree", "S1" |
| Field         | Rich Text | Jurusan/bidang studi              |
| Start Date    | Date      | Tanggal masuk                     |
| End Date      | Date      | Tanggal lulus                     |
| Description   | Rich Text | Deskripsi singkat atau aktivitas  |
| GPA           | Rich Text | IPK/nilai (opsional)              |

---

## 3. Ambil Database ID

Setiap database Notion punya ID unik. Cara mendapatkannya:

1. Buka database di Notion
2. Klik `Share` → `Copy link`
3. URL akan terlihat seperti:
   ```
   https://notion.so/workspace/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?v=...
   ```
4. Bagian `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (32 karakter) adalah **Database ID**

---

## 4. Setup File .env

Copy file contoh dan isi dengan nilai kamu:

```bash
cp .env.example .env
```

Edit file `.env`:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxx

NOTION_PROFILE_DB_ID=32_karakter_database_id_profile
NOTION_SKILLS_DB_ID=32_karakter_database_id_skills
NOTION_PROJECTS_DB_ID=32_karakter_database_id_projects
NOTION_EXPERIENCE_DB_ID=32_karakter_database_id_experience
NOTION_EDUCATION_DB_ID=32_karakter_database_id_education

FORMSPREE_ID=xabcdefg   # (opsional) dari https://formspree.io
```

---

## 5. Setup Formspree (Contact Form)

1. Daftar gratis di [https://formspree.io](https://formspree.io)
2. Klik **"+ New Form"** → beri nama → pilih email tujuan
3. Copy **Form ID** dari URL (contoh: jika URL `https://formspree.io/f/xabcdefg`, maka ID-nya `xabcdefg`)
4. Simpan sebagai `FORMSPREE_ID` di `.env`

---

## 6. Test Lokal

```bash
npm run dev
```

Buka [http://localhost:4321](http://localhost:4321) — data dari Notion akan langsung tampil.

---

## 7. Deploy ke Vercel

### a. Push ke GitHub

```bash
git add .
git commit -m "feat: Notion-powered portfolio"
git push origin main
```

### b. Import Project di Vercel

1. Buka [https://vercel.com/new](https://vercel.com/new)
2. Import repository GitHub kamu
3. Di bagian **Environment Variables**, tambahkan semua variabel dari `.env`:
   - `NOTION_API_KEY`
   - `NOTION_PROFILE_DB_ID`
   - `NOTION_SKILLS_DB_ID`
   - `NOTION_PROJECTS_DB_ID`
   - `NOTION_EXPERIENCE_DB_ID`
   - `NOTION_EDUCATION_DB_ID`
   - `FORMSPREE_ID` (opsional)
4. Klik **Deploy** 🚀

---

## 8. Auto-Deploy Saat Notion Diupdate (Opsional)

Agar website otomatis rebuild saat kamu update Notion:

### Setup Vercel Deploy Hook

1. Di Vercel → Project Settings → **Git** → scroll ke **Deploy Hooks**
2. Klik **Create Hook** → beri nama (contoh: "Notion Update") → pilih branch `main`
3. Copy URL hook yang dihasilkan

### Setup Notion Automation

1. Di Notion, buka salah satu database (misal Projects)
2. Klik **`•••`** → **Automations** → **+ New automation**
3. Trigger: **"When a page is edited"**
4. Action: **"Send webhook"** → paste URL Vercel Deploy Hook
5. Simpan → sekarang setiap edit di Notion akan trigger rebuild otomatis!

> 💡 **Gratis plan Vercel** sudah cukup untuk kebutuhan ini (100 deploys/hari).

---

## Struktur File Final

```
src/
├── components/
│   ├── Header.astro
│   ├── HeroSection.astro          ← data profile dari Notion
│   └── sections/
│       ├── SkillsSection.astro    ← data skills dari Notion
│       ├── ProjectsSection.astro  ← data projects dari Notion
│       ├── CareerEducationSection.astro  ← career + education dari Notion
│       └── ContactSection.astro   ← form via Formspree
├── lib/
│   └── notion.ts                  ← semua fungsi fetch Notion API
├── types/
│   └── index.ts                   ← TypeScript types
├── pages/
│   └── index.astro               ← halaman utama, fetch semua data
└── layouts/
    └── Layout.astro              ← layout + SEO meta tags
```
