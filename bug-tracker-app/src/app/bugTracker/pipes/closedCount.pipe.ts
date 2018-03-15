import { Pipe, PipeTransform } from '@angular/core';
import { Bug } from '../models/Bug';

@Pipe({
	name : 'closedCount',
	pure : true
})
export class ClosedCountPipe implements PipeTransform{
	transform(data : Bug[]) : number{
		console.log('getClosedCount triggered');
		let closedCount = 0;
		for(let index = 0, count = data.length; index < count; index++){
			if (data[index].isClosed)
				++closedCount;
		}
		return closedCount;
	}
}