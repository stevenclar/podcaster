import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoading = false;
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.state$.subscribe((data) => {
      this.isLoading = data.isLoading;
    });
  }
}
