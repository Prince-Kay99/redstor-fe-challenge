import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  title = '';
  selectedLang = 'en';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.selectedLang = browserLang?.match(/en|fr|es/) ? browserLang : 'en';
    translate.use(this.selectedLang);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.getDeepestTitle(this.activatedRoute))
      )
      .subscribe(title => {
        this.title = title || 'Redstor FE Challenger';
      });
  }

  private getDeepestTitle(route: ActivatedRoute): string | null {
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    return currentRoute.snapshot.data['title'] || null;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
