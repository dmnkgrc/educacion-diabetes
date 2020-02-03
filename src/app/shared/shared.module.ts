import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from '../escape-html.pipe';
import { FormatDatePipe } from '../format-date.pipe';

@NgModule({
  declarations: [EscapeHtmlPipe, FormatDatePipe],
  imports: [CommonModule],
  exports: [EscapeHtmlPipe, FormatDatePipe],
})
export class SharedModule {}
