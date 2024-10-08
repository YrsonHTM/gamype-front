import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrl: './form-empresa.component.scss'
})
export class FormEmpresaComponent implements OnInit {
  empresaForm: FormGroup;
  activeIndex: number = 0;
  selectedIcon: string = '';
  tamagnios: any[] = [];
  filteredTamagnios: any[] = [];
  sociedadesMercantiles: any[] = [];
  filteredSociedadesMercantiles: any[] = [];
  sectoresSocioEconomicos: any[] = [];
  filteredSectoresSocioEconomicos: any[] = [];
  editMode = false;
  idEmpresa: number;
  infoEmpresa: any;

  iconOptios = [
    'pi-briefcase',
    'pi-building',
    'pi-chart-line',
    'pi-users',
    'pi-sitemap'
  ]
  tamagnioOptions = [
    { label: 'Pequeña', value: 1 },
    { label: 'Mediana', value: 2 },
    { label: 'Grande', value: 3 }
  ];

  tipoOptions = [
    { label: 'Tipo 1', value: 1 },
    { label: 'Tipo 2', value: 2 },
    { label: 'Tipo 3', value: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private messageService: MessageService,
  ) {

    this.empresaForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      foundationDate: ['', Validators.required],
      icon: ['', Validators.required],
      idTamagnio: [null, Validators.required],
      idTipoSociedadMercantil: [null, Validators.required],
      idSectorEconomico: [null, Validators.required],
      contactNumber: ['', [Validators.required, this.maxDigitsValidator(10)]],
      addres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      webSite: ['', [Validators.required, this.websiteValidator()]],
    });
  }

  ngOnInit(): void {
    this.idEmpresa = Number(this.route.snapshot.paramMap.get('id'));
    if(this.idEmpresa) this.editMode = true;
    this.loadInitialData();

  }

  loadInitialData() {
    forkJoin({
      sectoresSocioEconomicos: this.empresaService.getSectoresMercantiles(),
      tamagnios: this.empresaService.getTamagnios(),
      sociedadesMercantiles: this.empresaService.getSociedadesMercantiles()
    }).subscribe({
      next: (results) => {
        this.tamagnios = results.tamagnios.claseEmpresas;
        this.sectoresSocioEconomicos = results.sectoresSocioEconomicos.claseEmpresas;
        this.sociedadesMercantiles = results.sociedadesMercantiles.claseEmpresas;
        if(this.editMode)
        {
          this.loadInfoEmpresa();
        }
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }

  loadInfoEmpresa() {
    this.empresaService.getInfoEmpresa(this.idEmpresa).subscribe((empresa) => {
      this.infoEmpresa = empresa;
      this.empresaForm.patchValue({
        name: empresa.name,
        companyName: empresa.companyName,
        foundationDate: new Date(empresa.foundationDate),
        icon: empresa.icon,
        idTamagnio: this.tamagnios.find(tamagnio => tamagnio.id === empresa.idTamagnio),
        idTipoSociedadMercantil: this.sociedadesMercantiles.find(sociedad => sociedad.id === empresa.idTipoSociedadMercantil),
        idSectorEconomico: this.sectoresSocioEconomicos.find(sectores => sectores.id === empresa.idSectorEconomico),
        contactNumber: empresa.contactNumber,
        addres: empresa.addres,
        email: empresa.email,
        webSite: empresa.webSite,
      });
    });
  }
/* eslint-disable */
  websiteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (control.value && !pattern.test(control.value)) {
        return { invalidWebsite: true };
      }
      return null;
    };
  }
/* eslint-enable */
  filterTamagnios($event){
    const query = $event.query;
    this.filteredTamagnios = this.tamagnios.filter(tamagnio => tamagnio.nombre.toLowerCase().includes(query.toLowerCase()));
  }

  filterSociedadesMercantiles($event){
    const query = $event.query;
    this.filteredSociedadesMercantiles = this.sociedadesMercantiles.filter(sociedad => sociedad.nombre.toLowerCase().includes(query.toLowerCase()));
  }

  filterSectoresSocioEconomicos($event){
    const query = $event.query;
    this.filteredSectoresSocioEconomicos = this.sectoresSocioEconomicos.filter(sectores => sectores.nombre.toLowerCase().includes(query.toLowerCase
    ()));
  }

  maxDigitsValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.toString().length > max) {
        return { 'maxDigits': { value: value, max: max } };
      }
      return null;
    };
  }

  nextStep() {
    if (this.activeIndex < 1) {
      this.activeIndex++;
    }
  }

  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  selectIcon(icon: string) {
    this.empresaForm.get('icon').setValue(icon);
  }


  goBack() {
    this.router.navigate(['gamype']);
  }
  onSubmit() {
    this.empresaForm.markAllAsTouched();
    Object.keys(this.empresaForm.controls).forEach(field => {
      const control = this.empresaForm.get(field);
      control.markAsDirty();
    });
    if (this.empresaForm.valid) {
      const paBack = this.empresaForm.value;
      paBack.idTipoSociedadMercantil = paBack.idTipoSociedadMercantil.id;
      paBack.idTamagnio = paBack.idTamagnio.id;
      paBack.idSectorEconomico = paBack.idSectorEconomico.id;
      if(this.editMode) paBack.id = this.idEmpresa;
      this.empresaService.guuardarEmpresa(paBack).subscribe(
        {
          next: () => {
          this.messageService.add({severity:'success', summary:'Guardado', detail: this.editMode ? 'Empresa actualizada' : 'Empresa guardada'});
          this.goBack();
          },
           error: () => {
          this.messageService.add({severity:'error', summary:'Error', detail: this.editMode ? 'No se pudo actualizar la empresa' : 'No se pudo guardar la empresa'});
        }
        }
      );
    }
    else{
      this.messageService.add({severity:'error', summary:'Error', detail:'Favor de llenar todos los campos'});
    }
  }
}
