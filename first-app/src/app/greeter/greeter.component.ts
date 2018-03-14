import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html',
	styleUrls : ['greeter.component.css']
})
export class GreeterComponent{
	message = '';
	onGreeterClick(){
		this.message = 'Greeter message will be displayed here';
	}
}
