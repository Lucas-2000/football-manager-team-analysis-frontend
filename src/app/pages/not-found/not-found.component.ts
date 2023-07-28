import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Recupere a mensagem personalizada da query param
    this.errorMessage = this.route.snapshot.queryParamMap.get(
      'message'
    ) as string;
  }
}
