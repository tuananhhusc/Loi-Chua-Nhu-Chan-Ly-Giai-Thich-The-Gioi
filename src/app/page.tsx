import { parseReport } from "@/lib/parser";
import ProgressBar from "@/components/ProgressBar";
import Navigation from "@/components/Navigation";
import CitationTooltip from "@/components/CitationTooltip";
import SummaryTable from "@/components/SummaryTable";
import { ChevronDown, Cross, BookOpen } from "lucide-react";

export default function Home() {
  const report = parseReport();
  const allSections = [report.intro, ...report.parts];

  // Helper to render text with citations
  const renderText = (text: string) => {
    // Regex to split by [n], .n, or . n
    const parts = text.split(/(\[\d+\]|\.\d+|\. \d+)/g);
    return parts.map((part, index) => {
      // Check for [n]
      const bracketMatch = part.match(/^\[(\d+)\]$/);
      if (bracketMatch) {
        return renderCitation(bracketMatch[1], index);
      }

      // Check for .n or . n
      const dotMatch = part.match(/^\. ?(\d+)$/);
      if (dotMatch) {
        return (
          <span key={index}>
            . <CitationTooltip citationNumber={dotMatch[1]} text={getRefText(dotMatch[1])} />
          </span>
        );
      }

      // It is regular text. Check if next part is a citation.
      const nextPart = parts[index + 1];
      const isNextCitation = nextPart && (nextPart.match(/^\[\d+\]$/) || nextPart.match(/^\. ?\d+$/));

      return <span key={index}>{isNextCitation ? part.trimEnd() : part}</span>;
    });
  };

  const getRefText = (num: string) => {
    const entry = report.references.find(r => r.trim().startsWith(`${num}.`) || r.trim().startsWith(`${num} `));
    return entry || "Nguồn tham khảo";
  };

  const renderCitation = (num: string, index: number) => {
    return <CitationTooltip key={index} citationNumber={num} text={getRefText(num)} />;
  };

  return (
    <main className="min-h-screen bg-transparent relative selection:bg-secondary selection:text-white pb-20">
      <ProgressBar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary via-[#002f80] to-[#002868] text-center px-4 overflow-hidden mb-20 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

        <div className="max-w-5xl z-10 animate-[fadeInUp_1s_ease-out]">
          <div className="mb-8 flex justify-center opacity-80">
            {/* Cross Icon / Divider */}
            <div className="relative">
              <div className="absolute -inset-1 bg-secondary blur opacity-30 rounded-full"></div>
              <Cross className="w-12 h-12 text-secondary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-display text-surface font-bold tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
            {report.title.split(':')[0].replace('như', 'Như')}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 font-body font-light max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
            Một khảo sát toàn diện về tương quan giữa Đức Tin và Lý Trí trong thế giới hiện đại.
          </p>

          {/* Button removed as requested */}
        </div>

        <div className="absolute bottom-10 animate-bounce opacity-50">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12 relative">
        <aside className="md:w-72 lg:w-80 flex-shrink-0 hidden md:block">
          <div className="sticky top-24">
            <Navigation sections={allSections} />
          </div>
        </aside>

        {/* Mobile Navigation wrapper */}
        <div className="md:hidden">
          <Navigation sections={allSections} />
        </div>

        <article className="flex-1 max-w-3xl mx-auto w-full">
          {/* Intro */}
          <section id={report.intro.id} className="mb-16 md:mb-24 scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px bg-secondary/40 flex-1"></span>
              <span className="text-secondary font-display text-sm tracking-widest uppercase">Khởi đầu</span>
              <span className="h-px bg-secondary/40 flex-1"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-10 text-center font-bold">
              {report.intro.title.replace('Dẫn nhập:', '').trim()}
            </h2>
            <div className="prose prose-lg prose-slate max-w-none font-body text-text-primary leading-loose text-justify hyphens-auto">
              {report.intro.content.map((para, i) => (
                <p key={i} className={i === 0 ? "first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px] first-letter:leading-none" : "mb-6 indent-8"}>
                  {renderText(para)}
                </p>
              ))}
            </div>
          </section>

          {/* Parts */}
          {report.parts.map((part) => (
            <section key={part.id} id={part.id} className="mb-24 scroll-mt-32 min-h-[50vh]">
              {/* Ornate Divider */}
              <div className="flex items-center justify-center my-20 opacity-60">
                <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent w-full max-w-xs"></div>
                <div className="mx-6 text-secondary transform rotate-45 border border-secondary p-1.5"><div className="w-1.5 h-1.5 bg-secondary"></div></div>
                <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent w-full max-w-xs"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-display text-primary mb-10 pb-6 border-b border-gray-100">
                {part.title}
              </h2>
              <div className="prose prose-lg prose-slate max-w-none font-body text-text-primary leading-loose text-justify hyphens-auto">
                {part.content.map((para, i) => {
                  // Subsections detection logic
                  const isSubsection = para.match(/^\d+\.\d+\.? /);
                  // Quotes detection logic (simple)
                  const isQuote = para.startsWith('"') && para.length > 50;



                  if (isSubsection) {
                    const match = para.match(/^(\d+\.\d+\.?)\s+(.*)/);
                    if (match) {
                      return (
                        <h3 key={i} className="text-xl md:text-2xl font-bold text-primary mt-12 mb-6 font-display border-l-4 border-secondary pl-4">
                          {/* Removed number display as requested */}
                          {renderText(match[2])}
                        </h3>
                      );
                    }
                    // Fallback if regex doesn't match perfectly but started with number
                    return <h3 key={i} className="text-xl md:text-2xl font-bold text-primary mt-12 mb-6 font-display border-l-4 border-secondary pl-4">{renderText(para.replace(/^\d+\.\d+\.?\s*/, ''))}</h3>;
                  }

                  if (para.includes("Bảng dưới đây tóm tắt các khía cạnh chính")) {
                    return (
                      <div key={i}>
                        <p className="mb-6 indent-8">{renderText(para)}</p>
                        <SummaryTable />
                      </div>
                    );
                  }

                  // Hide raw table rows if they appear in text (simple heuristic)
                  // Table Header
                  if (para.startsWith("Lĩnh Vực") || para.startsWith("Vấn Đề") || para.startsWith("Giải Pháp") || para.startsWith("Các Tác Giả")) return null;

                  // Cosmology
                  if (para.startsWith("Vũ Trụ Học")) return null;
                  if (para.startsWith("Tại sao vũ trụ") && para.length < 150) return null;
                  if (para.startsWith("Vũ trụ là sản phẩm") && para.length < 250) return null;
                  if (para.startsWith("Benedict XVI") && para.length < 100) return null;

                  // History
                  if (para.startsWith("Lịch Sử") && para.length < 50) return null;
                  if (para.startsWith("Thời gian là") && para.length < 150) return null;
                  if (para.startsWith("Lịch sử là") && para.length < 250) return null;
                  if (para.startsWith("Augustine") && para.length < 100) return null;

                  // Epistemology
                  if (para.startsWith("Nhận Thức Luận")) return null;
                  if (para.startsWith("Làm sao con người") && para.length < 150) return null;
                  if (para.startsWith("Logic con người") && para.length < 250) return null;
                  if (para.startsWith("Gordon Clark") && para.length < 100) return null;

                  // Anthropology
                  if (para.startsWith("Nhân Học") && para.length < 50) return null;
                  if (para.startsWith("Con người là ai") && para.length < 150) return null;
                  if (para.startsWith("Con người là Imago") && para.length < 250) return null;
                  if (para.startsWith("Gioan Phaolô II") && para.length < 100) return null;

                  // Ethics
                  if (para.startsWith("Đạo Đức") && para.length < 50) return null;
                  if (para.startsWith("Cơ sở nào cho") && para.length < 150) return null;
                  if (para.startsWith("Lời Chúa cung cấp") && para.length < 250) return null;
                  if (para.startsWith("Ratzinger, Cựu Ước") && para.length < 100) return null;

                  if (isQuote) {
                    return (
                      <blockquote key={i} className="border-l-4 border-secondary bg-background p-6 my-8 rounded-r-lg italic text-text-secondary shadow-sm">
                        {renderText(para)}
                      </blockquote>
                    );
                  }

                  if (para.length < 80 && !para.endsWith('.')) {
                    // Likely a minor header or emphasis
                    return <h4 key={i} className="text-lg font-bold text-text-primary mt-8 mb-4">{renderText(para)}</h4>;
                  }

                  return (
                    <p key={i} className="mb-6 indent-8">
                      {renderText(para)}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          {/* References Section */}
          <section className="mt-32 pt-16 border-t border-gray-200 bg-gray-50 -mx-4 md:-mx-8 px-4 md:px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-display text-primary mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6" /> Tài liệu tham khảo
              </h3>
              <ul className="grid gap-6 text-sm text-text-secondary font-ui">
                {report.references.map((ref, i) => {
                  // clean reference text
                  const cleanRef = ref.replace(/^\d+\.\s*/, '');
                  // Check for URL
                  const urlMatch = cleanRef.match(/(https?:\/\/[^\s]+)/);
                  const url = urlMatch ? urlMatch[0] : null;
                  const textParts = url ? cleanRef.split(url) : [cleanRef];

                  return (
                    <li id={`ref-${i + 1}`} key={i} className="flex gap-4 items-start p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-secondary/20 group scroll-mt-32">
                      <span className="flex-shrink-0 font-bold text-secondary w-8 text-right font-display pt-0.5 group-hover:text-primary transition-colors text-base">{i + 1}.</span>
                      <div className="break-words leading-relaxed text-gray-700 font-lora">
                        {url ? (
                          <>
                            {textParts[0]}
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline decoration-primary/30 underline-offset-2 break-all">{url}</a>
                            {textParts[1] || ''}
                          </>
                        ) : (
                          cleanRef
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <div className="text-center mt-20 mb-10">
            <div className="text-xs text-secondary font-ui font-bold tracking-widest uppercase">
              Lời Chúa Như Chân Lý Giải Thích Thế Giới
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
