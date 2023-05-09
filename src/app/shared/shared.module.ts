import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { HeaderComponent } from './components/navbar/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [FilterByPipe, HeaderComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [FilterByPipe, HeaderComponent],
})
export class SharedModule {}
