import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoading = false;
  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.stateService.state$.subscribe((data) => {
      this.isLoading = data.isLoading;
    });
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }
}
