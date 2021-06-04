import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserHistory } from './interfaces/UserHistory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WhatsappMessagesWhithoutAddingContact';
  userHistoryData: UserHistory[];
  profileForm = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
    message: new FormControl(''),
  });
  
  constructor() {
    this.userHistoryData = JSON.parse(localStorage.getItem("userHistoryData"));
  }

  onSubmit() {
    const user: UserHistory = { name: this.profileForm.value.name, whatsappNumber: `55${this.profileForm.value.tel}`, date: new Date() };
    const message: string = this.profileForm.value.message;
    const url = `https://api.whatsapp.com/send/?phone=${user.whatsappNumber}&text=${message}&app_absent=0`;
    if(!this.userHistoryData || this.userHistoryData?.length === 0) {
      this.userHistoryData = [];
    }
    this.userHistoryData.push(user);
    localStorage.setItem("userHistoryData", JSON.stringify(this.userHistoryData));
    window.location.href = url;
  }

  deleteFromHistory(user) {
    console.log(user);
    const indexOfUser = this.userHistoryData.indexOf(user);
    if(indexOfUser > -1) {
      this.userHistoryData.splice(indexOfUser, 1);
      localStorage.setItem("userHistoryData", JSON.stringify(this.userHistoryData));
    }
  }

  clearHistory() {
    localStorage.clear();
    window.location.reload();
  }
}
