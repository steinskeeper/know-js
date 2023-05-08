## Solution for the Problem 1


### Approach

The initial JSON data was converted to an intermediate JSON to help calculate the spacing and help create the html table

```json

// Intermediate JSON

[
    {
        "Organization": "Google",
        "members": [
            {
                "Department": "Sales",
                "members": [
                    {
                        "UserName": "Ashok Kumar",
                        "members": [
                            {
                                "Organization": "Google",
                                "Department": "Sales",
                                "Date": "31/01/2019",
                                "Time": "10 Hrs 0 Mins",
                            },
                            {
                                "Organization": "Google",
                                "Department": "Sales",
                                "Date": "02/02/2019",
                                "Time": "8 Hrs 0 Mins"
                            }
                        ],
                        "len": 2,
                        "span": 2
                    }
                ],
                "len": 1,
                "span": 2
            }
        ],
        "len": 1,
        "span": 2
    },
    {
        "Organization": "FB",
        "members": [
            {
                "Department": "Sales",
                "members": [
                    {
                        "UserName": "Phani Sai",
                        "members": [
                            {
                                "Organization": "FB",
                                "Department": "Sales",
                                "Date": "31/01/2019",
                                "Time": "10 Hrs 0 Mins",
                            },
                            {
                                "Organization": "FB",
                                "Department": "Sales",
                                "Date": "02/02/2019",
                                "Time": "8 Hrs 0 Mins"
                            }
                        ],
                        "len": 2,
                        "span": 2
                    }
                ],
                "len": 1,
                "span": 2
            },
            {
                "Department": "Quality",
                "members": [
                    {
                        "UserName": "Laskhmi Gayathri",
                        "members": [
                            {
                                "Organization": "FB",
                                "Department": "Quality",
                                "Date": "02/02/2019",
                                "Time": "8 Hrs 0 Mins",
                            },
                            {
                                "Organization": "FB",
                                "Department": "Quality",
                                "Date": "02/02/2019",
                                "Time": "8 Hrs 0 Mins"
                            }
                        ],
                        "len": 2,
                        "span": 2
                    }
                ],
                "len": 1,
                "span": 2
            }
        ],
        "len": 2,
        "span": 4
    }
]
```

### Sample Output

1. Merge true for - Organization , Department , UserName

    <table border="1 | 0"><tbody><tr><th>Organization</th><th>Department</th><th>UserName</th><th>Date</th><th>Time</th></tr><tr><td rowspan="2" name="Organization">Google</td><td rowspan="2" name="Department">Sales</td><td rowspan="2" name="UserName">Ashok Kumar</td><td name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="4" name="Organization">FB</td><td rowspan="2" name="Department">Sales</td><td rowspan="2" name="UserName">Phani Sai</td><td name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="2" name="Department">Quality</td><td rowspan="2" name="UserName">Laskhmi Gayathri</td><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr></tbody></table>

2. Merge true for - Organization , UserName

    <table border="1 | 0"><tbody><tr><th>Organization</th><th>UserName</th><th>Department</th><th>Date</th><th>Time</th></tr><tr><td rowspan="2" name="Organization">Google</td><td rowspan="2" name="UserName">Ashok Kumar</td><td name="Department">Sales</td><td name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td name="Department">Sales</td><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="4" name="Organization">FB</td><td rowspan="2" name="UserName">Phani Sai</td><td name="Department">Sales</td><td name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td name="Department">Sales</td><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="2" name="UserName">Laskhmi Gayathri</td><td name="Department">Quality</td><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td name="Department">Quality</td><td name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr></tbody></table>

3. Merge true for Organization, Department, Username, Date

    <table border="1 | 0"><tbody><tr><th>Organization</th><th>Department</th><th>UserName</th><th>Date</th><th>Time</th></tr><tr><td rowspan="2" name="Organization">Google</td><td rowspan="2" name="Department">Sales</td><td rowspan="2" name="UserName">Ashok Kumar</td><td rowspan="1" name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td rowspan="1" name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="4" name="Organization">FB</td><td rowspan="2" name="Department">Sales</td><td rowspan="2" name="UserName">Phani Sai</td><td rowspan="1" name="Date">31/01/2019</td><td name="Time">10 Hrs 0 Mins</td></tr><tr><td rowspan="1" name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td rowspan="2" name="Department">Quality</td><td rowspan="2" name="UserName">Laskhmi Gayathri</td><td rowspan="2" name="Date">02/02/2019</td><td name="Time">8 Hrs 0 Mins</td></tr><tr><td name="Time">8 Hrs 0 Mins</td></tr></tbody></table>

