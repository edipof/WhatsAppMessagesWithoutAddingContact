import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WhatsappMessagesWhithoutAddingContact';
  profileForm = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
  });
  
  onSubmit() {
    const url = `https://api.whatsapp.com/send/?phone=+55${this.profileForm.value}&text='teste'&app_absent=0`;
    window.location.href = url;
  }
}
