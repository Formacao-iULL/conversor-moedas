import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListagemComponent } from './components/listagem/listagem.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "moedas",
        component: ListagemComponent,
    },

];
