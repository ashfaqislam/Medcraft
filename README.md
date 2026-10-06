# MedCraft Website V1 — Free Prototype

## কী আছে
- Home / landing page
- Student Register
- Student Login
- Pending → Admin Approve flow
- Student Dashboard
- Recorded Classes
- Live Classes
- Exams
- Study Materials
- Results/Profile placeholders
- Admin Panel
- Admin থেকে demo content add/delete
- Orange/Black/White theme
- Nova robot mascot
- বাংলা motivational copy + English functional buttons

## কীভাবে রান করবে (সবচেয়ে সহজ)
1. এই folder-এর সব file একই folder-এ রাখো।
2. `index.html` ফাইলে double-click করো।
3. Chrome/Edge-এ website খুলবে।
4. Internet না থাকলেও এই prototype চলবে।

## Admin login (শুধু prototype)
Student Login screen-এ:
Student ID: `admin`
Password: `medcraft123`

তারপর Admin Panel → Students → Approve.

## খুব গুরুত্বপূর্ণ সীমাবদ্ধতা
এটি V1-এর FRONTEND/LOCAL prototype। Data browser-এর localStorage-এ থাকে।
অর্থাৎ:
- তুমি নিজের browser-এ student approve করতে পারবে।
- কিন্তু অন্য student-এর ফোন থেকে আসা registration তোমার browser-এ automatically আসবে না।
- Real online student accounts, secure passwords, real PDF upload, shared database এবং real exam system-এর জন্য backend/database/storage লাগবে।

## Real version-এর পরের ধাপ
Free/low-cost architecture:
Frontend → GitHub Pages / Cloudflare Pages
Database/Auth → Supabase
File storage → Supabase Storage
Video → YouTube/Google Drive/private hosting strategy
Exam engine → Supabase database + custom JS

এই V1-এর UI/flow আগে final করে তারপর backend connect করা সবচেয়ে নিরাপদ।
