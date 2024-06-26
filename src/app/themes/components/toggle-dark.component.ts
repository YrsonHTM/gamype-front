import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ToggleButton, ToggleButtonModule } from "primeng/togglebutton";
import { ThemeService } from "../theme.service";
import { Theme } from "../models/Theme";

@Component({
    selector: "toggle-dark",
    template: `<p-toggleButton
    #toggleButton
    (checked)="true"
    (onChange)="onChange($event)"
    onIcon="pi pi-moon"
    offIcon="pi pi-sun"/>`,
    standalone: true,
    imports: [
        ToggleButtonModule
    ],
    })

export class ToggleDarkComponent implements AfterViewInit {

    @ViewChild('toggleButton') toggleButton!: ToggleButton;

    checked: boolean = false;

    constructor(
        private themeService: ThemeService,
      ) {
      }

    ngAfterViewInit(): void {
        if(localStorage.getItem('tema') === this.themeService.theme[0]) {
            this.toggleButton.toggle(new Event('click'));
        }
    }

    onChange(event: any) {
        console.log('onChange')
        event.checked ? this.changeTheme(this.themeService.theme[0]) : this.changeTheme(this.themeService.theme[1]);
      }
    
    changeTheme(theme: Theme) {
        console.log('changeTheme');
        this.themeService.switchTheme(theme);
    }
}