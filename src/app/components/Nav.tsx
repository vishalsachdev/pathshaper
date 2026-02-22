"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const instructorLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/specs", label: "Specs" },
  { href: "/graph", label: "Graph" },
  { href: "/generate", label: "Generate" },
  { href: "/canvas", label: "Canvas" },
];

const studentLinks = [
  { href: "/student/pathway", label: "Pathway" },
  { href: "/student/progress", label: "Progress" },
  { href: "/student/practice", label: "Practice" },
];

export default function Nav() {
  const pathname = usePathname();
  const isStudentRoute = pathname.startsWith("/student");

  return (
    <nav className="bg-[var(--navy)] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
            Path<span className="text-[var(--gold)]">Shaper</span>
            <span className="text-[10px] font-normal text-white/40 tracking-wider uppercase">554</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {instructorLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
            <span className="w-px h-5 bg-white/20 mx-1" />
            {studentLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileMenu pathname={pathname} isStudentRoute={isStudentRoute} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-white/15 text-white"
          : "text-white/60 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileMenu({ pathname, isStudentRoute }: { pathname: string; isStudentRoute: boolean }) {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-56 bg-[var(--navy)] rounded-lg shadow-xl border border-white/10 py-2">
        <div className="px-3 py-1 text-[10px] text-white/30 uppercase tracking-wider">Instructor</div>
        {instructorLinks.map((link) => (
          <MobileLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
        ))}
        <div className="border-t border-white/10 my-1" />
        <div className="px-3 py-1 text-[10px] text-white/30 uppercase tracking-wider">Student</div>
        {studentLinks.map((link) => (
          <MobileLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
        ))}
      </div>
    </details>
  );
}

function MobileLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm ${
        isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}
