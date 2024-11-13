import { Component, inject, signal } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../../../services/empresa.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {

  empresaInfo = signal<Empresa>(null);
  companyService = inject(CompanyService);
  empresaService = inject(EmpresaService);

  tamagnioName: string = '';
  sectorSocioEconomicoName: string = '';
  sociendadesMercantilesName: string = '';

  constructor() {
    this.companyService.getCompany().subscribe((company) => {
      this.empresaInfo .set(company);
      this.loadInitialData();
    });
  }

      
  loadInitialData() {
    forkJoin({
      sectoresSocioEconomicos: this.empresaService.getSectoresMercantiles(),
      tamagnios: this.empresaService.getTamagnios(),
      sociedadesMercantiles: this.empresaService.getSociedadesMercantiles()
    }).subscribe({
      next: (results) => {
        this.tamagnioName = results.tamagnios.claseEmpresas.find(tamagnio => tamagnio.id === this.empresaInfo().idTamagnio).nombre;
        this.sectorSocioEconomicoName = results.sectoresSocioEconomicos.claseEmpresas.find(sector => sector.id === this.empresaInfo().idSectorEconomico).nombre;
        this.sociendadesMercantilesName = results.sociedadesMercantiles.claseEmpresas.find(sociedad => sociedad.id === this.empresaInfo().idTipoSociedadMercantil).nombre;
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }

}
