const input = [
	{
		Organization: "Google",
		UserId: "akumar",
		UserName: "Ashok Kumar",
		Department: "Sales",
		Designation: "Sales",
		CheckInTime: 1548909000000,
		CheckOutTime: 1548945000000,
	},
	{
		Organization: "Google",
		UserId: "akumar",
		UserName: "Ashok Kumar",
		Department: "Sales",
		Designation: "Sales",
		CheckInTime: 1549081800000,
		CheckOutTime: 1549110600000,
	},
	{
		Organization: "FB",
		UserId: "phanis",
		UserName: "Phani Sai",
		Department: "Sales",
		Designation: "Sales",
		CheckInTime: 1548909000000,
		CheckOutTime: 1548945000000,
	},
	{
		Organization: "FB",
		UserId: "phanis",
		UserName: "Phani Sai",
		Department: "Sales",
		Designation: "Sales",
		CheckInTime: 1549081800000,
		CheckOutTime: 1549110600000,
	},
	{
		Organization: "FB",
		UserId: "lakshmig",
		UserName: "Laskhmi Gayathri",
		Department: "Quality",
		Designation: "QA Engineer",
		CheckInTime: 1549081800000,
		CheckOutTime: 1549110600000,
	},
	{
		Organization: "FB",
		UserId: "lakshmig",
		UserName: "Laskhmi Gayathri",
		Department: "Quality",
		Designation: "QA Engineer",
		CheckInTime: 1549081800000,
		CheckOutTime: 1549110600000,
	},
];

const config = [
	{
		HeaderName: "Organization",
		Column: "Organization",
		Merge: true,
	},
	{
		HeaderName: "Department",
		Column: "Department",
		Merge: true,
	},
	{
		HeaderName: "UserName",
		Column: "UserName",
		Merge: true,
	},
	{
		HeaderName: "Date",
		Column: ({ CheckInTime }) => {
			return moment(CheckInTime).format("DD/MM/YYYY");
		},
		Merge: true,
	},
	{
		HeaderName: "Time",
		Column: ({ CheckInTime, CheckOutTime }) => {
			const secs = (CheckOutTime - CheckInTime) / 1000;
			const hours = Math.floor(secs / 3600);
			const mins = Math.floor((secs % 3600) / 60);
			return `${hours} Hrs ${mins} Mins`;
		},
		Merge: false,
	},
];

// Map the config
const result = input.map((row) => {
	const newRow = {};
	config.forEach(({ Column, Merge }) => {
		if (Merge) {
			newRow[Column] = row[Column];
		}
	});
	config.forEach(({ HeaderName, Column }) => {
		if (HeaderName !== "Date" && HeaderName !== "Time" && Column) {
			newRow[HeaderName] = row[Column];
		}
		if (HeaderName === "Date" || HeaderName === "Time") {
			newRow[HeaderName] = Column(row);
		}
	});
	return newRow;
});

// Headers and To Group Headers
const togroup = config
	.filter(({ Merge }) => Merge)
	.map(({ HeaderName }) => HeaderName);

const notgroup = config
	.filter(({ Merge }) => !Merge)
	.map(({ HeaderName }) => HeaderName);

let headers = [...togroup, ...notgroup];

// Intermediate JSON
function intermediateJSON() {
	const nested = result.reduce((acc, obj) => {
		let node = acc;
		togroup.forEach((key, index) => {
			const value = obj[key];
			let childNode = node.find((node) => node[key] === value);
			if (!childNode) {
				childNode = { [key]: value, members: [], len: 0 };
				node.push(childNode);
			}
			childNode.len = childNode.members.length;
			node = childNode.members;
			if (index === togroup.length - 1) {
				const { [key]: omitKey, ...member } = obj;
				const filteredObj = Object.fromEntries(
					Object.entries(member).filter(
						([key, value]) => value !== undefined
					)
				);
				childNode.members.push(filteredObj);
				childNode.len = childNode.members.length;
			}
		});
		return acc;
	}, []);
	return nested;
}

// Traverse Intermediate JSON
function jumpToObjectLevel(obj, level) {
	let currentLevel = 1;
	const queue = [...obj.members];

	while (queue.length > 0 && currentLevel <= level) {
		const size = queue.length;
		for (let i = 0; i < size; i++) {
			const element = queue.shift();
			if (currentLevel === level) {
				return element;
			}
			if (element && element.members) {
				for (const subElement of element.members) {
					queue.push(subElement);
				}
			}
		}
		currentLevel++;
	}

	return obj;
}

// Calculate SPAN - Spacing
function traverse(objs, levels) {
	for (let k = levels; k >= 0; k--) {
		const pp = jumpToObjectLevel(objs, k);
		if (k === levels) {
			let childspan = pp.members.length;
			pp.span = childspan;
			continue;
		}

		let childspan = pp.members.length;
		let sum = 0;
		for (let i = 0; i < childspan; i++) {
			if (pp.members[i].hasOwnProperty("span")) {
				sum = sum + pp.members[i].span;
			} else {
				traverse(pp.members[i], levels - (k + 1));
				sum = sum + pp.members[i].span;
			}
		}
		childspan = sum;
		pp.span = childspan;
	}
}

let row = [];
function printTable(dat, le) {
	for (let n = 0; n < le; n++) {
		if (dat[n].hasOwnProperty("members")) {
			const objkey = Object.keys(dat[n])[0];
			let r = {
				span: dat[n].span,
				value: dat[n][objkey],
				name: objkey,
			};
			row.push(r);
			printTable(dat[n].members, dat[n].members.length);
		} else {
			const objkey = Object.keys(dat[n]);
			const finalobj = objkey.filter(
				(element) => !togroup.includes(element)
			);
			for (let i = 0; i < finalobj.length; i++) {
				let r = {
					value: dat[n][finalobj[i]],
					name: finalobj[i],
				};
				row.push(r);
			}
		}
	}
}

// Grouping
const newrows = [];
function grouping() {
	let rownum = 0;
	for (let i = 0; i < row.length; i++) {
		if (row[i].name === headers[headers.length - 1]) {
			newrows[rownum] = newrows[rownum] || [];
			newrows[rownum].push(row[i]);
			rownum++;
		} else {
			newrows[rownum] = newrows[rownum] || [];
			newrows[rownum].push(row[i]);
		}
	}
}

function jsonToTable(jsonData, merge) {
	let table = document.createElement("table");
	let headerRow = document.createElement("tr");
	for (let i = 0; i < headers.length; i++) {
		let headerCell = document.createElement("th");
		headerCell.innerHTML = headers[i];
		headerRow.appendChild(headerCell);
	}
	table.appendChild(headerRow);

	if (merge) {
		for (let i = 0; i < jsonData.length; i++) {
			let row = document.createElement("tr");

			for (let j = 0; j < jsonData[i].length; j++) {
				let cell = document.createElement("td");

				if (jsonData[i][j].span) {
					cell.setAttribute("rowspan", jsonData[i][j].span);
				}

				cell.innerHTML = jsonData[i][j].value;
				cell.setAttribute("name", jsonData[i][j].name);

				row.appendChild(cell);
			}

			table.appendChild(row);
		}
	} else {
		jsonData.forEach((object) => {
			const row = table.insertRow();
			Object.values(object).forEach((value) => {
				const cell = row.insertCell();
				const textNode = document.createTextNode(value);
				cell.appendChild(textNode);
			});
		});
	}

	return table.outerHTML;
}

if (togroup.length !== 0) {
	const output = intermediateJSON();
	let js = output;
	for (let b = 0; b < js.length; b++) {
		traverse(js[b], togroup.length - 1);
	}
	printTable(js, js.length);
	grouping();
	document.getElementById("table").innerHTML = jsonToTable(newrows, true);
} else {
	document.getElementById("table").innerHTML = jsonToTable(result, false);
}
