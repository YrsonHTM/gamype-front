import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CompanyService } from './company.service';
import { EmpresaService } from '../../../services/empresa.service';
import { firstValueFrom } from 'rxjs';

export const companyResolver: ResolveFn<boolean> = async (route, state) => {
  const companyService = inject(CompanyService);
  const empresaService = inject(EmpresaService);
  const id = route.queryParamMap.get('empresa');
  if(!id){
    return false;
  }
  const empresa = await firstValueFrom(empresaService.getInfoEmpresa(Number(id)))
  companyService.setCompany(empresa);
  const userEmpresas = await firstValueFrom(empresaService.getEmpresas());
  const empresaRoles = userEmpresas.find(empresa => empresa.id === Number(id))?.idsRoles;
  companyService.setRolesEmpresa(empresaRoles);
  companyService.setRolesAplicacion(await firstValueFrom(empresaService.getRolesAplication()));
  return true;
};
