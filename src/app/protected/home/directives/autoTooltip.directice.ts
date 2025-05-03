import { Directive, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[pButton]' // Se aplica automáticamente a todos los botones PrimeNG
})
export class AutoTooltipDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2,private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const buttonElement = this.el.nativeElement;
    const buttonText = buttonElement.textContent?.trim();
    const icon = buttonElement.getAttribute('icon'); // Obtener el valor del atributo 'icon'
    let tooltipText = '';

    // Determinar el texto del tooltip basado en el ícono
    if (icon === 'pi pi-pencil') {
      tooltipText = 'Editar';
    } else if (icon === 'pi pi-trash') {
      tooltipText = 'Eliminar';
    } else if (icon === 'pi pi-plus') {
      tooltipText = 'Agregar';
    }

    // Si hay texto en el botón, usarlo como tooltip
    if (buttonText) {
      tooltipText = buttonText;
    }

    if (tooltipText) {
      this.renderer.setAttribute(buttonElement, 'pTooltip', tooltipText);
      this.renderer.setAttribute(buttonElement, 'tooltipPosition', 'top');
      this.cd.detectChanges();
    }
  }
}