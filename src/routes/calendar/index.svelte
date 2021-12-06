<script>
	import {onMount} from 'svelte';
	 const map_month = new Map();
	map_month.set(0,'January');
	map_month.set(1,'February');
	map_month.set(2, 'March');
	map_month.set(3,'April');
	map_month.set(4,'May');
	map_month.set(5,'June');
	map_month.set(6,'July');
	map_month.set(7,'August');
	map_month.set(8,'September');
	map_month.set(9,'October');
	map_month.set(10,'November');
	map_month.set(11,'December');

 const map_days = new Map();
	map_days.set(0,'Sunday');
	map_days.set(1,'Monday');
	map_days.set(2,'Tuesday');
	map_days.set(3,'Wednesday');
	map_days.set(4,'Thursday');
	map_days.set(5,'Friday');
	map_days.set(6,'Saturday');
	
	let week_label = [ ...map_days.values() ]; 
	//console.log(week_label);
	

    let date,day;
		let today_date,today_month,today_year;
	let calendar, calendar_day = 0, calendar_month= 0, calendar_days = 0,calendar_year=0, calendar_date = 0;
	let calendar_dayName="", calendar_monthName="";
	
/*	let display_calendar = [[1,2,3,4,5,6,7],
							[8,9,10,11,12,13,14],
						[15,16,17,18,19,20,21],
						[22,23,24,25,26,27,28],
						[29,30,31,1,2,3,4]];*/
	
	let display_calendar = [];


   date = new Date();

   $: day = date.getDay();
	$: today_date = date.getDate();
	$: today_month = date.getMonth();
	$: today_year = date.getFullYear();
	
	
	calendar = new Date();
	calendar_day = calendar.getDay();
	calendar_date =calendar.getDate();
	calendar_month = calendar.getMonth();
	calendar_year= calendar.getFullYear();
	$: calendar_month = calendar_month;
	
	$: calendar_days = getCalenderDays(calendar_month, calendar_year).getDate();
	$: calendar_day = getStartDay(calendar_month,calendar_year);

	$: calendar_dayName = map_days.get(calendar_day);
	$: calendar_monthName = map_month.get(calendar_month);
	$: display_calendar = updateDisplay(calendar_day,calendar_days,calendar_month,calendar_year);
	
	function updateDisplay(startDay,totalDays, month,year){
		let local_display = [], local_week_display =[];
		let today = false, inter_today = false;
		let countDays = 1;
		let next_month= 0 ;
		let state = true;
		let start_date = 1,itertate_date = 1;
		let prev_month_totalDays = new Date(year,month,0).getDate() ;
		console.log(prev_month_totalDays);
		//console.log(new Date(year,month,1).getDay() );
		if(startDay != 0){
			start_date = prev_month_totalDays - startDay + 1;
			console.log(start_date +' ' + prev_month_totalDays +' ' + startDay);
			state = false;
		}else{
			prev_month_totalDays = totalDays;
			next_month = 1;
		}
		if(today_month == month && today_year == year){
			inter_today = true;
		}
		
		itertate_date = start_date;
		//console.log('adf '+ startDay);
		//	prev_month_totalDays = ((Math.ceil((startDay + totalDays )/7)) *7 ) % (startDay + totalDays);
			//			console.log(prev_month_totalDays);
		
		let week =0;
		while(itertate_date <= (prev_month_totalDays + 1)){
		
				if( itertate_date > prev_month_totalDays ){
					if(next_month === 2){
						if(local_week_display[0]){
							local_display = [...local_display, local_week_display];
						}
						break;
					}
					itertate_date = 1;
					if( next_month === 0 ){
						prev_month_totalDays = totalDays;
						console.log(prev_month_totalDays);
						next_month=1;
					}else if(next_month === 1 ){
						prev_month_totalDays = ((Math.ceil((startDay + totalDays )/7)) *7 ) % (startDay + totalDays);
						next_month = 2;
						if(prev_month_totalDays === 0){
							local_display = [...local_display, local_week_display];
							break;
						}
						console.log(prev_month_totalDays);
						console.log(next_month);
					}
					if(state == false) {
						state = true;
					}else{
						state = false;
					}
				}
				if(inter_today == false && state == true && today_date == itertate_date){
					today = true;
					console.log('hi');
				}
			
				local_week_display = [...local_week_display, {id: itertate_date,content: 'note', enable: state, isToday: today, day: week}];
				itertate_date += 1;
			week += 1;
			if(week > 6){
				week = 0;
				
				local_display = [...local_display, local_week_display];
				local_week_display = [];
				//console.log(local_display);
			}
			//	console.log(local_display);
			countDays += 1;
			
		}	
			

		console.log(local_display);
		return local_display;

	}

	function getStartDay(month,year){
		return new Date(year,month,1).getDay();
	}
	function getCalenderDays(month,year){
		console.log(month +' '+year  );
		if(month == 11){
			month = 0;
		}else{
			month += 1;
		}
		console.log(month+' '+year  );
		let local_date = new Date(year,month,0);
		console.log(local_date);
		return local_date;
	}

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

 function previousMonth(){
	 if(calendar_month !=0){
	 	calendar_month -= 1;
	 }else{
		 calendar_month = 11;
		 calendar_year -= 1;
	 }
 }

function nextMonth() {
	if(calendar_month !=11){
		calendar_month += 1;
	}else{
		calendar_month = 0;
		calendar_year += 1;
	}
}
</script>


<p>trying to build calendar</p>

<p>
{date}
<br>
	
</p>


<button on:click={previousMonth}>
previous month 
</button>


<button on:click={nextMonth}>
	next month 
</button>


<button on:click={() => {calendar_year -= 1}}>
previous year 
</button>


<button on:click={() => {calendar_year += 1}}>
	next year 
</button>


<header>
	
	<h4>{calendar_monthName} {calendar_year}</h4>
	
</header>


<div class="month">

	
{#each week_label as label}
	<span class="label">{label}</span>
{/each}
	
{#each display_calendar as week}
	{#each week as day}
		{#if day.enable}
			<span class= "date">{day.id}</span>
		{:else if day.isToday}
				<span class= "date.today">{day.id}</span> 
		{:else}
			<span class= "date.other">{day.id}</span> 
		{/if}
			
	{/each}
	

{/each}
	
</div>
<style>

header {
		display: flex;
		margin: 2rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}

h4 {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 140%;
		margin: 0 1rem;
	}


.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: right;
		grid-gap: 4px;
	}
	
	.label {
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}
	
	.date {
		height: 50px;
		font-size: 16px;
		letter-spacing: -1px;
		border: 1px solid #e6e4e4;
		padding-right: 4px;
		font-weight: 700;
		padding: 0.5rem;
	}
	
	.date.today {
		color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor;
	}
	
	.date.other {
		opacity: 0.2;
	}


</style>