const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const fs = require('fs')
const path = require('path')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
const port = 3000;

app.listen(port, () => {
    console.log("Server started on port 3000");
});

const events = JSON.parse(fs.readFileSync(path.join(__dirname, './db/events.json')))

app.post('/add_event', (req, res) => {
    events.push({
        id: uuidv4(),
        ...req.body
    });
    fs.writeFileSync(path.join(__dirname, './db/events.json'), JSON.stringify(events))
    res.sendStatus(200);
});

app.get('/get_event/:month', (req, res) => {
    if (!req.params.month) return res.status(400).send('Date is not found')
    const formatedData = events.map(e => ({
        ...e,
        date: dayjs(e.date).unix() * 1000
    }))
    const startMonth = dayjs(req.params.month * 1000).startOf('month').unix() * 1000
    const endMonth = dayjs(req.params.month * 1000).endOf('month').unix() * 1000
    const filterdEvents = formatedData.filter(e => e.date >= startMonth && e.date <= endMonth)

    return res.status(200).json(filterdEvents)
})

