import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { AutoCompleteCompleteEvent } from '../models/autocompleteEvente.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
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
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }

  search(event: AutoCompleteCompleteEvent) {
    if(!this.items) return;
    this.suggestions = this.items!.filter((item: any) => {
      return item[this.searchByParam].toLowerCase().includes(event.query.toLowerCase());
    });
  }
  
}
