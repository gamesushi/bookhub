/*
 * Design Philosophy Reminder — Quiet Luxury Editorial Minimalism
 * This page must feel like a calm investment wisdom library: warm paper, deep ink green,
 * restrained gold accents, editorial hierarchy, asymmetric Quartz-inspired knowledge layout.
 * Every section should reinforce long-term thinking, rationality, and archival elegance.
 */
import {
  BookOpen,
  ChevronRight,
  Compass,
  FileText,
  Library,
  Network,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663645332152/SXYAeD4diyxNjQqMy7tQ6H/buffett-munger-hero-knowledge-map-PZCtTZu6ZMUp5PeqNYYaN5.webp";
const graphImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663645332152/SXYAeD4diyxNjQqMy7tQ6H/buffett-munger-graph-panel-KkWBQ3DWRcJYAUu4nttnPC.webp";
const libraryImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663645332152/SXYAeD4diyxNjQqMy7tQ6H/buffett-munger-library-index-f9EfAkeD3TbsQLAvML4qu8.webp";

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const handleComingSoon = (label: string) => {
    toast(t.comingSoon, {
      description: t.comingSoonDesc(label),
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="paper-grain" aria-hidden="true" />
      <main className="relative mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_350px]">
        <aside className="library-sidebar animate-rise border-b border-border/70 px-6 py-7 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="brand-mark">B</div>
              <div>
                <p className="font-serif text-[1.55rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  {t.brand}
                </p>
                <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {t.tagline}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => handleComingSoon("搜尋")}
            className="group mb-6 flex w-full items-center gap-2 border border-border/80 bg-card/62 px-3 py-2 text-left shadow-[0_10px_30px_rgba(33,30,20,0.04)] transition duration-300 hover:border-primary/40 hover:bg-white/72"
            aria-label={t.searchPlaceholder}
          >
            <Search className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
            <span className="font-sans text-sm text-muted-foreground">{t.searchPlaceholder}</span>
          </button>

          <div className="mb-8 flex items-center justify-between border-y border-border/70 py-3">
            <span className="font-serif text-[0.94rem] font-semibold text-ink">{t.explorer}</span>
            <Compass className="h-4 w-4 text-primary" />
          </div>

          <nav className="space-y-5" aria-label="知识库探索索引">
            {t.people.map((group) => (
              <section key={group.title}>
                <button
                  type="button"
                  onClick={() => handleComingSoon(group.title)}
                  className="flex w-full items-start gap-2 text-left font-serif text-[0.9rem] font-semibold leading-5 text-ink transition hover:text-primary"
                >
                  <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="min-w-0 break-words">{group.title}</span>
                </button>
                <div className="mt-2 space-y-1.5 pl-5">
                  {group.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleComingSoon(item)}
                      className="block max-w-full text-left font-sans text-[0.82rem] leading-6 text-muted-foreground transition hover:text-primary hover:underline hover:underline-offset-4"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </nav>

          <div className="mt-10 hidden border-t border-border/70 pt-5 lg:block">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
              {t.createdFor}
            </p>
            <p className="mt-2 font-serif text-sm leading-6 text-ink">{t.createdForDesc}</p>
          </div>
        </aside>

        <section className="relative px-6 py-8 sm:px-10 lg:px-12 lg:py-14">
          <div className="animate-fade max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
              <Library className="h-3.5 w-3.5" />
              {t.referenceLibrary} · {t.year}
            </div>

            <h1 className="max-w-4xl font-serif text-[3rem] font-semibold leading-[0.96] tracking-[-0.055em] text-ink sm:text-[4.8rem] lg:text-[5.65rem]">
              {t.mainTitle}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg leading-8 text-muted-foreground sm:text-xl">
              {t.mainSubtitle}
            </p>
          </div>

          <div className="hero-plate animate-rise mt-10 overflow-hidden border border-border/80 bg-card shadow-[0_30px_90px_rgba(35,31,20,0.09)]">
            <div className="relative min-h-[300px] p-6 sm:p-8 lg:min-h-[390px] lg:p-10">
              <img src={heroImage} alt="抽象投资智慧知识图谱背景" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(250,247,238,0.96)] via-[rgba(250,247,238,0.74)] to-[rgba(250,247,238,0.18)]" />
              <div className="relative z-10 flex max-w-xl flex-col justify-between gap-12">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                    {t.openingNote}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                    {t.openingQuote}
                  </h2>
                  <p className="mt-5 font-sans text-base leading-8 text-foreground/78">{t.openingDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.principles.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleComingSoon(item)}
                      className="border border-primary/20 bg-white/48 px-3 py-1.5 font-sans text-sm text-primary backdrop-blur transition hover:border-primary/45 hover:bg-white/70"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 xl:grid-cols-3">
            {t.knowledgeCards.map((card, index) => {
              const icons = [ShieldCheck, Network, Sparkles];
              const Icon = icons[index];
              return (
                <article
                  key={card.title}
                  className="knowledge-card animate-rise border border-border/80 bg-card/76 p-5 shadow-[0_18px_60px_rgba(35,31,20,0.055)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_80px_rgba(35,31,20,0.08)]"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {card.eyebrow}
                    </p>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-ink">{card.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{card.text}</p>
                  <button
                    type="button"
                    onClick={() => handleComingSoon(card.title)}
                    className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-primary underline-offset-4 transition hover:gap-3 hover:underline"
                  >
                    {t.enterNode} <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </article>
              );
            })}
          </div>

          <section className="mt-10 grid gap-6 border-y border-border/70 py-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[260px] overflow-hidden border border-border/80 bg-card">
              <img src={libraryImage} alt="抽象图书馆索引与文献资料柜" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,42,36,0.52)] to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-xs font-serif text-2xl font-semibold leading-tight text-white">
                {t.likeReadingYearbook}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-primary/25 text-primary">
                <Quote className="h-5 w-5" />
              </div>
              <blockquote className="font-serif text-2xl font-medium leading-snug tracking-[-0.025em] text-ink sm:text-3xl">
                {t.blockquote}
              </blockquote>
              <p className="mt-5 font-sans text-base leading-8 text-muted-foreground">{t.blockquoteDesc}</p>
            </div>
          </section>
        </section>

        <aside className="right-rail animate-rise border-t border-border/70 px-6 py-8 lg:min-h-screen lg:border-l lg:border-t-0 lg:px-8 lg:py-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-ink">{t.graphView}</h2>
            <Network className="h-4 w-4 text-primary" />
          </div>
          <div className="relative overflow-hidden border border-border/80 bg-card shadow-[0_18px_70px_rgba(35,31,20,0.06)]">
            <img src={graphImage} alt="抽象知识图谱面板" className="h-[268px] w-full object-cover" />
            <div className="absolute inset-0 bg-[rgba(250,247,238,0.2)]" />
          </div>

          <section className="mt-8 border border-border/80 bg-card/78 p-5">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary">{t.todayReading}</p>
            </div>
            <h3 className="font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-ink">
              {t.todayReadingTitle}
            </h3>
            <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{t.todayReadingDesc}</p>
          </section>

          <section className="mt-6 border border-border/80 bg-card/78 p-5">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary">{t.indexStatus}</p>
            </div>
            <div className="space-y-3 font-sans text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/70 pb-2">
                <span>{t.peopleEntries}</span>
                <span className="text-ink">03</span>
              </div>
              <div className="flex justify-between border-b border-border/70 pb-2">
                <span>{t.coreConcepts}</span>
                <span className="text-ink">06</span>
              </div>
              <div className="flex justify-between">
                <span>{t.pendingContent}</span>
                <span className="text-primary">{t.open}</span>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
