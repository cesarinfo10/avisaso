import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

interface Servicio {
  nomServicio: string;
}

@Component({
  selector: 'app-licitar',
  templateUrl: './licitar.page.html',
  styleUrls: ['./licitar.page.scss'],
})
export class LicitarPage implements OnInit {
  searchTerm: string = '';
  suggestions: Servicio[] = [];
  filteredSuggestions: Servicio[] = [];

  constructor(private servicioService: UserService) {}


  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    this.servicioService.getSuggestions().subscribe((data: Servicio[]) => {
      console.log(data);
      this.suggestions = data;
    });
  }

  filterSuggestions() {
    const term = this.searchTerm.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.nomServicio.toLowerCase().includes(term)
    );
  }

  selectSuggestion(suggestion: Servicio) {
    this.searchTerm = suggestion.nomServicio;
    this.filteredSuggestions = [];
  }
}
