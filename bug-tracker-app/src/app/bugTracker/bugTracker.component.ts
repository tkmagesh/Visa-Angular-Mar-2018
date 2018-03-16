import {Component, OnInit} from '@angular/core';
import { Bug } from './models/Bug';
import { BugStorageService } from './services/bugStorage.service';
import axios from 'axios';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	
	bugs : Bug[] = [];
	sortBugBy : string = 'name';
	sortBugDescending : boolean = false;
	
	
	ngOnInit(){
		//this.bugs = this.bugStorage.getAll();
		var p = axios.get('http://localhost:3000/bugs');
		p.then(response => {
			this.bugs = response.data;
		})


	}

	constructor(private bugStorage : BugStorageService, private bugOperations : BugOperationsService){
		
	}
	
	onNewBug(bug : Bug){
		this.bugs = [...this.bugs, bug];
	}

	onBugNameClick(bugToToggle : Bug){
		//let toggledBug = this.bugStorage.toggle(bugToToggle);
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		var p = axios.put('http://localhost:3000/bugs/' + bugToToggle.id, toggledBugData);
		p.then(response => {
			var toggledBug = response.data;
			this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);
		});
		
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