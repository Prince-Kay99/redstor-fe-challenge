import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input() activePage: { label: string; link?: string }[] = [];
}
