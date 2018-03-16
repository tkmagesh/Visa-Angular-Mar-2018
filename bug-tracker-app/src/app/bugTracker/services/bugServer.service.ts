import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugOperationsService } from './bugOperations.service';
import axios from 'axios';


@Injectable()
export class BugServerService{
	private baseUrl  = 'http://localhost:3000/bugs';

	constructor(private bugOperations : BugOperationsService){

	}

	getAll() : Promise<Bug[]>{
		/*var p1 = axios.get(this.baseUrl);
		var p2 = p1.then(response => {
			return response.data;
		});
		return p2;*/

		return axios
			.get(this.baseUrl)
			.then(response => response.data)
	}

	addNew(bugName : string) : Promise<Bug> {
		let newBugData = this.bugOperations.createNew(bugName);
		return axios
			.post(this.baseUrl, newBugData)
			.then(response => response.data);
	}

	toggle(bugToToggle : Bug) : Promise<Bug> {
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		return axios
			.put(`${this.baseUrl}/${bugToToggle.id}`, toggledBugData)
			.then(response => response.data);
	}
	remove(bug : Bug) : Promise<any>{
		return axios
			.delete(`${this.baseUrl}/${bug.id}`)
			.then(response => response.data);
	}
}