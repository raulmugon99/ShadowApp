import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircle, home, radio, library, search, statsChart, personCircle, book } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TabsPage implements OnInit {

  constructor() { 
    addIcons({home,statsChart,book,personCircle,radio,library,search,playCircle});
  }

  ngOnInit() {
  }

}
