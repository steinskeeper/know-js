function flattenData(data) {
  let res = [];
  let visited = new Set();

  function trav(obj, path = []) {
    if (typeof obj !== "object") {
      res.push({
        key: path,
        value: obj
      });
      return;
    }

    if (visited.has(obj)) {
      res.push({
        key: path,
        value: "[Circular Reference]"
      });
      return;
    }

    visited.add(obj);

    for (let key in obj) {
      let newPath = path.concat(key);

      if (Array.isArray(obj[key])) {
        res.push({
          key: newPath,
          value: obj[key]
        });
        continue;
      }

      trav(obj[key], newPath);
    }
  }

  trav(data);
  return res;
}


let obj = {
 "employee": {
  "name": {
   "firstName": "nara",
   "lastName": "simha"
  },
  "address": [
   {
    "street": "a",
    "city": "b",
    "state": "c"
   },
   {
    "street": "a1",
    "city": "b1",
    "state": "c1"
   }
  ]
 }
}

let obj1 = {
	"id": "0001",
	"type": "donut",
	"name": "Cake",
	"ppu": 0.55,
	"batters":
		{
			"batter":
				[
					{ "id": "1001", "type": "Regular" },
					{ "id": "1002", "type": "Chocolate" },
					{ "id": "1003", "type": "Blueberry" },
					{ "id": "1004", "type": "Devil's Food" }
				]
		},
	"topping":
		[
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5007", "type": "Powdered Sugar" },
			{ "id": "5006", "type": "Chocolate with Sprinkles" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
		]
}
console.log(flattenData(obj));
console.log(flattenData(obj1));
