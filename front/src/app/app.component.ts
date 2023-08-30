  import { AfterViewInit, Component, OnInit ,ChangeDetectorRef } from '@angular/core';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './services/auth.service';
  import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
  import { CookieService } from 'ngx-cookie-service';
  import { User } from 'src/model/User';
  import { FilterService } from './services/filter.service';
  import { Filters } from 'src/model/Filters';
  import { FilterType } from 'src/model/FilterType';
  import { Module } from 'src/model/Module';
  import { SubModule } from 'src/model/SubModule';
  import { LoaderService } from './services/loader.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { group_module } from 'src/model/group_module';
  import { ModuleFunction } from 'src/model/ModuleFunction';
  import { Subscription } from 'rxjs';
  import { PassResetComponent } from './components/pass-reset/pass-reset.component';
  declare var $: any;


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit,AfterViewInit  {
    body = document.getElementsByTagName('body')[0]
    title = 'reporting';
    isAuth:boolean= false;
    user!:User;
    currentPath!: string ;
    routess!:any;
    pushme:boolean= false;
    opened:boolean=false;
    reset:boolean=false;
    
    filterType = FilterType;
    startDate!: Date|null;
    endDate!: Date|null;
    selectedFilter!: FilterType;
    isVaration=false;
    isPerHour= false;
    startHour!:any|null;
    endHour!:any|null;
    filtred: Filters = {
      startDate: null,
      endDate: null,
      idfunction: 0,
      type_Filter: this.filterType.None,
      isVaration: false,
      isPerHour: false,
      startHour: null,
      endHour: null
    };
    form!: FormGroup;
    menuItems: any[] = [];
    description:String="test"
    private subscriptions: Subscription[] = [];
    constructor(private service:AuthService,
                private router:Router,
                private route: ActivatedRoute,
                public filterService: FilterService,
                private cookieService: CookieService,
                public loaderService:LoaderService,
                private fb: FormBuilder,
                private datePipe: DatePipe,
                private changeDetectorRef: ChangeDetectorRef){

                  this.form = this.fb.group({
                    selectedFilter: ['', [Validators.required]],
                    startDate: ['', [Validators.required]],
                    endDate: ['', [Validators.required]],
                    startHour: [null],
                    endHour: [null]
                  }, {
                    validator: this.dateValidator,
                  });
                  
      
    }

    ngOnInit(): void {
    console.log(this.route.snapshot)
    this.pushme = false;
      // set isOpen to false for all modules
      if(this.service.getToken()){
        this.service.checkToken().subscribe(
          (result: boolean) => {
            this.isAuth = result;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
      this.service.getUser().subscribe(
        (user: User) => {
          this.user = user;
          this.service.userToSave.emit(this.user);
          this.service.setUser(this.user)
          this.user.role = user.role;
          //console.log(user)
        },
        (error: any) => {
          this.cookieService.delete('jwtToken');
          console.log(error);
        }
      );
      this.user?.user_group?.module_groups.forEach((group) => {
        group.isOpen = false; // set isOpen to false for each group
        group.list_sub_modules.forEach((subModule) => {
          subModule.isOpen = false; // set isOpen to false for each sub-module
        });
      });
      }

      logOut(){
        this.cookieService.delete('jwtToken'),
        window.location.reload();
      }

      updateFilters() {
        if (this.form.valid) {
          const startDate = typeof this.startDate === 'string' ? new Date(this.startDate) : this.startDate;
          const endDate = typeof this.endDate === 'string' ? new Date(this.endDate) : this.endDate;
      
          const filtred: Filters = {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
            type_Filter: this.selectedFilter,
            isVaration: this.isVaration,
            isPerHour: this.isPerHour,
            startHour: this.startHour ? this.startHour.split(':')[0] : null,
            endHour: this.endHour ? this.endHour.split(':')[0] : null,
            idfunction: 0
          };
      
          this.filterService.filtredUpdatedChart.next(filtred);
          this.filterService.filtredUpdatedFunctionChart.next(filtred);
        }
      }
      
      
      formatDateToString(date: Date | null): string | null {
        if (!date) {
          return null;
        }
        
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
      

    toggleModuleGroup(moduleGroup: Module) {
      moduleGroup.isOpen = !moduleGroup.isOpen;
    }

    toggleSubModule(subModule: SubModule) {
      subModule.isOpen = !subModule.isOpen;
    }

    toggle() {
      this.opened = !this.opened
    }

    pushMe(){
      this.pushme = true;
    }
  

    dateValidator(formGroup: FormGroup) {
      const startDate = formGroup.get('startDate')?.value ;
      const endDate = formGroup.get('endDate')?.value;
    
      if (startDate && endDate) {
        if (startDate > endDate) {
          return { invalidDateRange: true };
        }
      }
      return null;
    }

    formatHour(hour: number): string {
      return hour.toString().padStart(2, '0');
    }
    
    
    openSidebar() {
      // Code to open the sidebar and make changes
    
      this.changeDetectorRef.detectChanges();
    }
    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    ngAfterViewInit() {
    }
  }

