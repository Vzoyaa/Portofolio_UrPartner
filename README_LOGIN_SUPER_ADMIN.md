# Panduan Login Super Admin

## Cara Mengakses Super Admin Dashboard

### 1. Login Melalui Navbar
1. Klik tombol **LOGIN** di navbar (desktop) atau menu mobile
2. Masukkan kredensial berikut:
   - **Email**: `superadmin@urpartnerid.com`
   - **Password**: `superadmin123`
3. Klik tombol **Sign In**
4. Anda akan otomatis diarahkan ke halaman `/super-admin`

### 2. Fitur Super Admin Dashboard
Setelah login berhasil, Anda dapat mengakses:
- **User Management**: Kelola pengguna (tambah, edit, hapus)
- **Client Management**: Kelola data klien
- **Partner Management**: Kelola data partner
- **Portfolio Management**: Kelola portfolio proyek
- **Service Management**: Kelola layanan yang ditawarkan

### 3. Logout
Untuk logout, klik tombol **Logout** di pojok kanan atas dashboard.

## Kredensial Testing
| Role | Email | Password |
|------|--------|----------|
| Super Admin | superadmin@urpartnerid.com | superadmin123 |
| Admin | admin@urpartnerid.com | admin123 |
| User | user@urpartnerid.com | user123 |

## Struktur File
- `src/store/auth.js` - Sistem autentikasi
- `src/router/index.js` - Routing dengan proteksi
- `src/components/Navbarv.vue` - Modal login
- `src/components/Dasboard/SuperAdmin.vue` - Dashboard super admin

## Teknologi yang Digunakan
- Vue 3 dengan Composition API
- Vue Router untuk routing
- LocalStorage untuk session management
- Tailwind CSS untuk styling
