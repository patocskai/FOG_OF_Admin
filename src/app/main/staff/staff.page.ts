import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataPage } from './data/data.page';
import { MatDialog, MatDialogModule, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PassDataService } from 'src/app/services/pass-data.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Practitioner } from 'src/app/interfaces/practitioner.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddDialogPage } from './add-dialog/add-dialog.page';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})

@NgModule({
  imports: [MatDialogModule]
})
export class StaffPage implements OnInit {
  dataForm: FormGroup;
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  columnsToDisplay = ['Alap felhasználó', 'Rezidens', 'Szakorvos', 'Admin'];
  loadSite = '';
  dataBoolean = true;
  selectedStaff = {};
  selectedVal = 'data';
  staffLeaders = [];
  staffMembers = [];
  rolesBeforeChange = [];
  roles = [];
  @ViewChild(DataPage, {static: false}) child: DataPage;
  staff = [];
  options = [];
  filteredItems = [];
  adminIndex;
  dataSource = this.staff;
  expandedElement: Practitioner | null;

  constructor(public dataService: PassDataService,
              public dialog: MatDialog,
              private practitionerService: PractitionerService,
              private auth: AuthService,
              // tslint:disable-next-line: variable-name
              private _snackBar: MatSnackBar) {
  }

  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.panelClass = 'snackbar';
    this._snackBar.open('Sikeres mentés', undefined, config);
  }

  getMoreInformation(index: any) {
    if (index === 0) {
      // tslint:disable-next-line: max-line-length
      return 'Az általános felhasználó, tud kitöltést megadni vagyis saját nevében diagnosztizálni és látja a saját eredményeit/statisztikáit'
    } else if (index === 1) {
      // tslint:disable-next-line: max-line-length
      return 'A rezidens orvos  a  diagnózist tudja megadni, továbbá saját nevében tud kitöltést megadni, valamit látja a beteg adatait'
    } else if (index === 2) {
      return 'A szakorvos mindent lát, továbbá tud klinikai diagnózist felvenni';
    } else if (index === 3) {
      // tslint:disable-next-line: max-line-length
      return 'Az admin a menedzsment felületet teljes egészében látja minden funkcionalitásával együtt, tovább ő kezeli a jogosultságokat munkacsoporton belül'
    }
  }

  addStaffMember() {
    const dialogRef = this.dialog.open(AddDialogPage, {
      panelClass: 'add-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPractitioners().then(res => this.setFilteredOptions());
      }
    });
  }

  changePermissions() {
    this.practitionerService.changePractitionersPermissions(this.roles);
    this.openSnackBar();
  }

  rejectPermissionChanges() {
    this.getPractitioners();
  }

  addNewMember() {
  }

  assignCopy(staff: any[]) {
    this.filteredItems = Object.assign([], staff);
  }
  filterItem(value) {
    if (!value) {
      this.assignCopy(this.staff);
    }
    this.filteredItems = Object.assign([], this.staff).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  async getPractitioners() {
    this.staff = [];
    this.roles = [];
    this.options = [];
    let docSnapshots = [];
    this.filteredItems = [];
    let i = 0;
    let promise = new Promise((resolve, reject) => {
      this.practitionerService.getStaff().get().then(data => {
        docSnapshots = data.docs;
        docSnapshots.forEach(element => {
          let basic = false;
          let admin = false;
          let administrator = false;
          let specialist = false;
          this.staff.push(element.data());
          this.staff[i].practitonerID = element.id;
          this.staff[i].name = this.staff[i].prefix + ' ' + this.staff[i].family + ' ' + this.staff[i].given + ' ' + this.staff[i].suffix;
          this.staff[i].roles.forEach(role => {
            if (role === 'basic') {
              basic = true;
            }
            if (role === 'admin') {
              admin = true;
              this.adminIndex = i;
            }
            if (role === 'administrator') {
              administrator = true;
            }
            if (role === 'specialist') {
              specialist = true;
            }
          });
          const permissions = {
            id: element.id,
            roles: [
              { basic: basic },
              { admin: admin },
              { administrator: administrator },
              { specialist: specialist }
            ]
          };
          this.roles.push(permissions);
          this.rolesBeforeChange = this.roles;

          const user = {
            name: this.staff[i].prefix + ' ' + this.staff[i].family + ' ' + this.staff[i].given + ' ' + this.staff[i].suffix
          };
          this.options.push(user);
          i++;
        });

        resolve(this.staff);
      });

    });
    this.staff = await promise as Practitioner[];
    this.assignCopy(await promise as Practitioner[]);
  }

  closeDetails(event: any) {
    this.dataService.personDetails = event;
  }

  openPersonDetails(selectedStaff: Practitioner) {
    this.dataService.selectedStaffDetails = selectedStaff;
    this.dataService.personDetails = true;
  }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) > -1);
  }

  setFilteredOptions() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  async ngOnInit() {
    await this.auth.getUser();
    await this.getPractitioners();
    this.setFilteredOptions();
  }
}
