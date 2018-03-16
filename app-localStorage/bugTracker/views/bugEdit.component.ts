import { Component, Output, EventEmitter } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from '../services/bugStorage.service';

@Component({
	selector : 'app-bug-edit',
	template : `
		<section class="edit">
		 	<form onSubmit="return false;">
			 	<label for="">Bug Name :</label>
			 	<input type="text" #txtBugName />
			 	<input type="submit" value="Create New" (click)="onCreateNewClick(txtBugName.value)"
			 	>
			 </form>
		 </section>
	`
})
export class BugEditComponent{

	@Output()
	create : EventEmitter<Bug> = new EventEmitter<Bug>();

	constructor(private bugStorage : BugStorageService){
		
	}
	
	onCreateNewClick(bugName : string){
		let newBug = this.bugStorage.addNew(bugName);
		this.create.emit(newBug);
	}
}