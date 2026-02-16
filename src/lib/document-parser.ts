/**
 * Extracts text content from various document formats.
 * Supports: PDF, DOCX, TXT, MD, JSON, YAML, CSV
 */

const TEXT_EXTENSIONS = ['.txt', '.md', '.json', '.yaml', '.yml', '.csv', '.xml', '.html'];
const BINARY_EXTENSIONS = ['.pdf', '.docx', '.doc'];

export const SUPPORTED_EXTENSIONS = [...TEXT_EXTENSIONS, ...BINARY_EXTENSIONS];
export const ACCEPT_STRING = SUPPORTED_EXTENSIONS.join(',');

export function getFileExtension(filename: string): string {
  return '.' + (filename.split('.').pop()?.toLowerCase() || '');
}

export function isSupported(filename: string): boolean {
  return SUPPORTED_EXTENSIONS.includes(getFileExtension(filename));
}

/**
 * Parse a File object and return its text content.
 * Handles PDF via pdfjs-dist and DOCX via mammoth.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = getFileExtension(file.name);

  if (ext === '.pdf') {
    return extractTextFromPDF(file);
  }

  if (ext === '.docx') {
    return extractTextFromDOCX(file);
  }

  // For .doc files, we can't parse them client-side reliably
  if (ext === '.doc') {
    throw new Error('Legacy .doc format is not supported. Please save as .docx and try again.');
  }

  // All other files: read as text
  return file.text();
}

async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  
  // Set worker source using CDN for the matching version
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const pageTexts: string[] = [];
  // Limit to first 50 pages to prevent extremely long processing
  const maxPages = Math.min(pdf.numPages, 50);

  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    pageTexts.push(pageText);
  }

  if (pdf.numPages > 50) {
    pageTexts.push('\n[Document truncated: only first 50 pages processed]');
  }

  return pageTexts.join('\n\n');
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
