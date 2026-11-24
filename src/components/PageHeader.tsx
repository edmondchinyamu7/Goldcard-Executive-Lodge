import { Link } from 'react-router-dom';

interface PageHeaderProps {
  sectionLabel: string;
  title: string;
  description: string;
}

export function PageHeader({ sectionLabel, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-[#E5E2DC] bg-[#F4F1EA]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6E675C]">
          <Link to="/" className="hover:text-[#171614] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171614]">{sectionLabel}</span>
        </nav>

        <h1 className="font-serif text-[clamp(2.25rem,3.8vw,3.4rem)] leading-[1.1] font-medium tracking-tight text-[#171614] max-w-3xl text-balance">
          {title}
        </h1>

        <p className="text-base leading-relaxed text-[#4A453E] max-w-2xl">{description}</p>
      </div>
    </section>
  );
}
