var Calendar = require('../models/calendar');
/*var calendar = require('../models/calendar');*/

exports.savecalendarDetails = (req, res) => {
    console.log('save calendar event',req.body.event);
    req.body.event.discription=req.body.event.desc;
    let calendar=Calendar(req.body.event);//what's happening here
    calendar.save().then(item => {
        console.log(item);
    })
    
}