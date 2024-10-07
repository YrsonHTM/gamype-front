import { Component, Input, forwardRef } from '@angular/core';
import { AutoCompleteCompleteEvent } from '../models/autocompleteEvente.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AutoErrorsDirective } from '../../../directives/auto-errors.directive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AutoCompleteModule,
    FloatLabelModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoErrorsDirective
  ],
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() items: any[] | null = [];

  @Input() searchByParam: string = 'name';

  @Input() labelParam: string = 'pais';

  @Input() idParam: string = 'code';

  selectedItem: any | null = null;

  onChangeCb?: (obj: any) => void;

  onTouchedCb?: () => void;

  suggestions: any[] = [];

  constructor() { }

  selectItem(obj?: any){
    this.selectedItem = obj;

    this.onChangeCb?.(obj);
  }

  writeValue(obj: any): void {
    this.selectedItem = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  

  search(event: AutoCompleteCompleteEvent) {
    if(!this.items) return;
    this.suggestions = this.items!.filter((item: any) => {
      return item[this.searchByParam].toLowerCase().includes(event.query.toLowerCase());
    });
  }
  
}
