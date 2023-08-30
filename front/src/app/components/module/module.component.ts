import { Component, OnInit } from '@angular/core';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { Module } from 'src/model/Module';
import { SubModule } from 'src/model/SubModule';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit{
  modules: Module[] = [];
  selectedModule: Module | undefined;
  moduleId : any | undefined;
  subModuls : SubModule[] | undefined

  constructor(private dataService: ModuleServicesService) { }

  ngOnInit() {
    this.dataService.getAllModules().subscribe(data => {
      this.modules = data;
    });
  }

  onModuleChange(event : Event) {
    this.moduleId = (event.target as HTMLInputElement).value;
    this.selectedModule = this.modules.find(module => module.id === +this.moduleId) as Module;
    this.subModuls = this.selectedModule.list_sub_modules;
  }

}
