import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugOperationsService } from './bugOperations.service';

@Injectable()
export class BugStorageService{
	private storage = window.localStorage;
	private currentBugId = 0;

	constructor(private bugOperations : BugOperationsService){

	}

	getAll() : Bug[] {
		let result : Bug[] = [];
		for(let index = 0, count = this.storage.length; index < count; index++){
			let key = this.storage.key(index),
				rawData = this.storage.getItem(key),
				bug = JSON.parse(rawData);
			this.currentBugId = this.currentBugId > bug.id ? this.currentBugId : bug.id;
			result.push(bug);
		}
		return result;
	}
	private save(bug){
		this.storage.setItem(bug.id.toString(), JSON.stringify(bug));
	}
	addNew(bugName : string) : Bug {
		let newBug = this.bugOperations.createNew(bugName, ++this.currentBugId);
		this.save(newBug);
		return newBug;
	}
	toggle(bugToToggle : Bug ) : Bug {
		let toggledBug = this.bugOperations.toggle(bugToToggle);
		this.save(toggledBug);
		return toggledBug;
	}
	remove(bug : Bug ) : void {
		this.storage.removeItem(bug.id.toString());
	}
}