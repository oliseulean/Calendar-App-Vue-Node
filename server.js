const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuid4 } = require('uuid');
const dayjs = require('dayjs');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
const port = 3000;

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Server started on port ${port}`);
});
const events = JSON.parse(fs.readFileSync('./db/events.json').toString());

app.post('/add_event', (req, res) => {
    events.push({
        id: uuid4(),
        ...req.body
    });
  /* eslint-disable no-debugger */
  debugger;
    const stringifyEventsJSONFile = JSON.stringify(events, null, '\t');
    fs.writeFileSync('./db/events.json', stringifyEventsJSONFile);
    res.sendStatus(200);
});

app.get('/get_event/:month', (req, res) => {
    const formattedData = events.map(e => ({
        ...e,
        date: dayjs(e.date).unix() * 1000,
    }));
    const startMonth = dayjs(req.params.month * 1000).startOf('month').unix() * 1000;
    const endMonth = dayjs(req.params.month * 1000).endOf('month').unix() * 1000;
    const filteredEvents = formattedData.filter(e => e.date >= startMonth && e.date <= endMonth);
    return res.status(200).json(filteredEvents);
})

