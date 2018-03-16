import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Bug } from '../models/Bug';

@Component({
	selector : 'app-bug-stats',
	template : `
		<section class="stats">
		 	<span class="closed">{{data | closedCount}}</span>
		 	<span> / </span>
		 	<span>{{data.length}}</span>
		 </section>
	`,
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class BugStatsComponent{

	@Input()
	data : Bug[] = [];

}