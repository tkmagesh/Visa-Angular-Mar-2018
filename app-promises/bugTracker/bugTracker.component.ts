import {Component, OnInit} from '@angular/core';
import { Bug } from './models/Bug';
import { BugServerService } from './services/bugServer.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	
	bugs : Bug[] = [];
	sortBugBy : string = 'name';
	sortBugDescending : boolean = false;
	
	
	ngOnInit(){
		this.bugServer
			.getAll()
			.then(bugs => this.bugs = bugs);


	}

	constructor(private bugServer : BugServerService){
		
	}
	
	onNewBug(bug : Bug){
		this.bugs = [...this.bugs, bug];
	}

	onBugNameClick(bugToToggle : Bug){
		this.bugServer
			.toggle(bugToToggle)
			.then(toggledBug => this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug));
	}

	onRemoveClosedClick(){
		for(let index = this.bugs.length-1; index >= 0; index--){
			if (this.bugs[index].isClosed){
				this.bugServer
					.remove(this.bugs[index])
					.then(response => this.bugs.splice(index, 1));
			}
		}
	}


}