import { Font } from "./Font";
export interface WidthCalculator {
  calculateWidth(ch: string): number;
  add(ch: string): void;
  reset(): void;
  needsNewline(ch: string): boolean;
  remains(): boolean;
}

export class TextWidthCalculator implements WidthCalculator {
  private accumulatedWidth = 0;
  constructor(private font: Font, private maxWidth: number) {}

  calculateWidth(ch: string): number {
    const charWidth = this.font.widthOf(ch);
    return charWidth;
  }

  add(ch: string): void {
    const w = this.calculateWidth(ch);
    this.accumulatedWidth += w;
  }

  reset(): void {
    this.accumulatedWidth = 0;
  }

  needsNewline(ch: string): boolean {
    return this.accumulatedWidth > this.maxWidth || ch === "\n";
  }

  remains(): boolean {
    return this.accumulatedWidth > 0;
  }
}