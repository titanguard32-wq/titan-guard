# TITAN GUARD — Website Starter

Website bilingual (Indonesia/English) dengan tema Black Gold untuk profil perusahaan, lowongan, lamaran, portal kandidat, status seleksi, dan dashboard HRD.

## Isi proyek
- `index.html` — seluruh halaman website.
- `styles.css` — desain responsif Black Gold.
- `app.js` — bahasa, autentikasi, lamaran, status kandidat, daftar lowongan/berita, dan dashboard HRD.
- `supabase/schema.sql` — tabel, trigger, Row Level Security (RLS), bucket dokumen privat, dan contoh lowongan.

## A. Pratinjau tampilan
Buka `index.html` di browser. Tanpa Supabase, halaman tampil sebagai pratinjau; login, database, lowongan dinamis, dan lamaran belum aktif.

## B. Aktifkan backend gratis dengan Supabase
1. Buat akun di https://supabase.com dan buat project baru.
2. Buka **SQL Editor** pada project.
3. Salin seluruh isi `supabase/schema.sql`, lalu jalankan.
4. Buka **Project Settings → API**. Salin Project URL dan anon/publishable key.
5. Buka `app.js` dan ganti:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY`
6. Jangan pernah menaruh `service_role` key di JavaScript browser.
7. Di Supabase Authentication, atur email confirmation dan URL redirect sesuai domain website.
8. Jalankan website melalui hosting HTTPS (lihat bagian C).

## C. Pasang website secara online
Pilihan sederhana:
1. Buat akun GitHub.
2. Buat repository baru, misalnya `titan-guard-site`.
3. Upload `index.html`, `styles.css`, `app.js`, dan folder `supabase`.
4. Buka repository → **Settings → Pages**.
5. Pilih branch `main`, folder `/ (root)`, lalu Save.
6. Tunggu proses deploy. GitHub Pages akan memberikan alamat website.
7. Untuk domain sendiri, beli domain yang tersedia (mis. `.com`) dan ikuti panduan DNS dari penyedia domain/hosting.
8. Pastikan HTTPS aktif dan samakan URL redirect Supabase dengan alamat website.

Alternatif hosting: Netlify atau Vercel (fitur website statis ini dapat dipasang tanpa server khusus).

## D. Buat akun HRD/admin
1. Buka website dan buat akun melalui Candidate Portal menggunakan email perusahaan yang dikuasai.
2. Konfirmasi email bila diminta.
3. Buka Supabase → Authentication → Users dan salin UUID akun tersebut.
4. Di SQL Editor jalankan perintah berikut dengan UUID asli:

```sql
update public.profiles
set role = 'admin'
where id = 'PASTE-AUTH-USER-UUID-HERE';
```

5. Keluar lalu login kembali. Akun dengan role `admin` dapat melihat dashboard HRD dan memperbarui status lamaran.
6. Jangan pernah memberi role admin melalui formulir publik.

## E. Alur kandidat
1. Kandidat membuat akun dan login.
2. Kandidat mengisi formulir lamaran.
3. Kandidat dapat mengunggah CV PDF maksimal 5 MB.
4. Lamaran masuk ke tabel `applications`.
5. CV disimpan dalam bucket privat `candidate-documents`.
6. Kandidat dapat melihat status lamaran miliknya sendiri.
7. HRD dapat memperbarui status: `submitted`, `under_review`, `interview`, `assessment`, `approved`, `rejected`.

## F. Menambah lowongan dan berita
Gunakan Supabase Table Editor:
- Tabel `jobs`: isi `title_id`, `title_en`, `location_id`, `location_en`, `employment_type`, lalu set `is_active=true`.
- Tabel `news`: isi judul dan isi dalam dua bahasa, lalu set `is_published=true` dan `published_at`.

## G. Catatan keamanan penting
- Website ini adalah starter yang perlu diuji sebelum produksi.
- RLS di SQL membatasi data kandidat berdasarkan akun; dokumen memakai bucket privat.
- Jangan mengumpulkan nomor identitas, data biometrik, catatan kesehatan, atau data sensitif yang tidak diperlukan melalui formulir publik.
- Untuk verifikasi dokumen, HRD harus memeriksa keaslian dan kecocokan dokumen secara manual melalui akses yang sah. Jangan menganggap upload sebagai bukti identitas yang telah terverifikasi.
- Sebelum peluncuran, tambahkan kebijakan privasi, masa retensi/penghapusan data, persetujuan kandidat, perlindungan spam/rate-limit, audit log, backup, dan pengujian keamanan independen.
- Pastikan perusahaan memiliki izin yang diwajibkan untuk layanan keamanan di setiap yurisdiksi. Jangan mengiklankan kewenangan militer/kepolisian yang tidak dimiliki.
- Kontak `*.example` adalah placeholder dan harus diganti dengan kontak resmi.
- Foto hero mengambil gambar dari Unsplash melalui URL eksternal; ganti dengan aset milik sendiri bila diperlukan.

## H. Batasan versi starter ini
- Login dan pendaftaran memakai Supabase Auth.
- Status seleksi kandidat dan dashboard HRD dasar tersedia.
- Pengunggahan CV PDF privat tersedia setelah backend dikonfigurasi.
- Fitur verifikasi dokumen pada versi ini berarti pencatatan dan pemeriksaan manual oleh HRD, bukan verifikasi otomatis terhadap instansi penerbit.
- Dashboard belum memiliki editor berita/lowongan, ekspor laporan, MFA wajib, notifikasi email otomatis, atau audit log. Tambahkan sebelum penggunaan skala besar.
