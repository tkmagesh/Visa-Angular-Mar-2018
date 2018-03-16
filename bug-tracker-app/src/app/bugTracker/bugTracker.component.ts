import {Component, OnInit} from '@angular/core';
import { Bug } from './models/Bug';
import { BugStorageService } from './services/bugStorage.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	
	bugs : Bug[] = [];
	sortBugBy : string = 'name';
	sortBugDescending : boolean = false;
	
	
	ngOnInit(){
		this.bugs = this.bugStorage.getAll();
	}

	constructor(private bugStorage : BugStorageService){
		
	}
	
	onNewBug(bug : Bug){
		this.bugs = [...this.bugs, bug];
	}

	onBugNameClick(bugToToggle : Bug){
		let toggledBug = this.bugStorage.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		for(let index = this.bugs.length-1; index >= 0; index--){
			if (this.bugs[index].isClosed){
				this.bugStorage.remove(this.bugs[index]);
				this.bugs.splice(index, 1);
			}
		}
	}


}