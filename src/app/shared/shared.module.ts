import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { HeaderComponent } from './components/navbar/header.component';

@NgModule({
  declarations: [FilterByPipe, HeaderComponent],
  imports: [CommonModule],
  exports: [FilterByPipe, HeaderComponent],
})
export class SharedModule {}
