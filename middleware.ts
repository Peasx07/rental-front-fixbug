import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. ดึง Path ที่ User กำลังจะเข้า (เช่น '/', '/reservation', '/login')
  const path = request.nextUrl.pathname;

  // 2. กำหนดหน้าเว็บที่ "Guest" (คนยังไม่ล็อคอิน) สามารถเข้าได้
  const isPublicPath = path === '/login' || path === '/register';

  // 3. ดึง Token จาก Cookie (ที่ Backend ของคุณส่งมาตอนล็อคอินสำเร็จ)
  const token = request.cookies.get('token')?.value;

  // 4. กรณีที่ 1: ไม่มี Token (ยังไม่ล็อคอิน) และพยายามเข้าหน้าอื่นๆ ที่ไม่ใช่หน้า Login/Register
  if (!token && !isPublicPath) {
    // เตะกลับไปหน้า /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. กรณีที่ 2: มี Token แล้ว (ล็อคอินแล้ว) แต่พยายามกลับไปหน้า Login หรือ Register อีก
  if (token && isPublicPath) {
    // ให้เด้งไปหน้าหลัก (หรือหน้า reservation) เลย ไม่ต้องล็อคอินซ้ำ
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ปล่อยให้ผ่านไปได้ตามปกติ
  return NextResponse.next();
}

// 6. ตั้งค่า Matcher: บอก Next.js ว่าให้ Middleware นี้ทำงานกับหน้าไหนบ้าง
export const config = {
  matcher: [
    /*
     * ให้ดักทุกๆ Request (ทุกหน้า) ยกเว้น:
     * - api (เผื่อมี API routes ฝั่ง Next.js)
     * - _next/static (พวกไฟล์ CSS, JS ของระบบ)
     * - _next/image (ระบบจัดการรูปภาพของ Next.js)
     * - favicon.ico, img/ (ไฟล์รูปภาพต่างๆ เช่น รูปรถ)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
  ],
};