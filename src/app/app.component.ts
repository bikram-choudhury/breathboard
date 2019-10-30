import { Component } from '@angular/core';
import { SharedService } from './common/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BreathBoard';
  saveBtnFor: String;
  logo: String = 'assets/logo.png';
  sidebarToggle: boolean = false;
  constructor(private _shared: SharedService) {
    _shared.observableSource.subscribe((response: String) => this.saveBtnFor = response);
  }
  saveDetails(actionFor: String) {
    this._shared.intakeSourceData(actionFor);
  }
  toggleSidenav(event): void {
    event.stopPropagation();
    this.sidebarToggle = !this.sidebarToggle;
  }
  collapseSidenav(event): void {
    if (!event.currentTarget.classList.contains('active')) {
      this.sidebarToggle = !this.sidebarToggle;
    }
  }
}
