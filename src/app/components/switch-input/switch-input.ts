import { Component, forwardRef, model } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-switch-input',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './switch-input.html',
  styleUrl: './switch-input.css',  
})
export class SwitchInput  {

  switchState = model(false);
  
  toggleTheme() {
    this.switchState.update(current => !current);
  }

}
