import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugOperationsService } from './bugOperations.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import'rxjs/add/operator/map';

@Injectable()
export class BugServerService{
	private baseUrl  = 'http://localhost:3000/bugs';

	constructor(private bugOperations : BugOperationsService, private http : Http){

	}

	getAll() : Observable<Bug[]>{
		return this.http
			.get(this.baseUrl)
			.map(response => response.json());
	}

	addNew(bugName : string) : Observable<Bug> {
		let newBugData = this.bugOperations.createNew(bugName);
		return this.http
			.post(this.baseUrl, newBugData)
			.map(response => response.json());
	}

	toggle(bugToToggle : Bug) : Observable<Bug> {
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		return this.http
			.put(`${this.baseUrl}/${bugToToggle.id}`, toggledBugData)
			.map(response => response.json());
	}
	remove(bug : Bug) : Observable<any>{
		return this.http
			.delete(`${this.baseUrl}/${bug.id}`)
			.map(response => response.json());
	}
}