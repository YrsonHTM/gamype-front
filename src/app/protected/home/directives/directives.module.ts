import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoTooltipDirective } from './autoTooltip.directice';

@NgModule({
  declarations: [AutoTooltipDirective],
  imports: [CommonModule],
  exports: [AutoTooltipDirective]
})
export class AutoTooltipModule {}