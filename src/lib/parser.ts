
import fs from 'fs';
import path from 'path';

export interface Section {
  id: string;
  title: string;
  content: string[]; // Array of paragraphs
  level: number; // 1 for Main Parts, 2 for Subsections
}

export interface ParsedReport {
  title: string;
  intro: Section;
  parts: Section[];
  references: string[];
}

export function parseReport(): ParsedReport {
  const filePath = path.join(process.cwd(), 'src/data/Chan_ly.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const report: ParsedReport = {
    title: '',
    intro: { id: 'intro', title: 'Dẫn nhập', content: [], level: 1 },
    parts: [],
    references: []
  };

  let currentSection: Section | null = null;
  let isReferences = false;

  // Title is likely the first line
  if (lines.length > 0) {
    report.title = lines[0];
  }

  // Iterate lines starting from index 1
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Detect References section
    if (line.toLowerCase().includes('tài liệu tham khảo') || line.toLowerCase().includes('nguồn trích dẫn')) {
      isReferences = true;
      continue;
    }

    if (isReferences) {
      report.references.push(line);
      continue;
    }

    // Detect Intro
    if (line.startsWith('Dẫn nhập:')) {
       // Introduction usually treated as a section but here we mapped it to report.intro
       // We can just add content to report.intro
       report.intro.title = line;
       currentSection = report.intro;
       continue;
    }

    // Detect Parts (Part I, Part II...)
    // Pattern: "Phần [Number]: [Title]"
    const partMatch = line.match(/^Phần\s+[IVX]+:/i);
    if (partMatch) {
      const newPart: Section = {
        id: `part-${report.parts.length + 1}`,
        title: line,
        content: [],
        level: 1
      };
      report.parts.push(newPart);
      currentSection = newPart;
      continue;
    }

    // Detect Subsections (1.1, 1.2...)
    // Pattern: "1.1. Title" or "1. Title"
    // We can treat them as content with a specific formatting or separate sections if needed.
    // For now, let's treat them as bold paragraphs or subheaders within the content to simplify rendering,
    // OR create a more complex nested structure. The request says "structure the raw text into sections... so they can be rendered as distinct blocks".
    // Let's stick to Parts as the main navigation units. Subsections can be part of the content but maybe highlighted.
    
    // Add content to current section
    if (currentSection) {
      currentSection.content.push(line);
    } else {
        // If content appears before any section (after title), maybe it belongs to intro or just loose text?
        // Assuming it belongs to intro if started.
        if (report.intro.content.length > 0 || line.startsWith('Trong bức tranh')) { // heuristics
             report.intro.content.push(line);
             currentSection = report.intro;
        }
    }
  }

  return report;
}
