import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html',
	styleUrls : ['greeter.component.css']
})
export class GreeterComponent{
	message = '';
	onGreetClick(userName){
		//var userName = prompt('Enter the username :')
		this.message = `Hi ${userName}, Have a nice day!`;
	}
}
