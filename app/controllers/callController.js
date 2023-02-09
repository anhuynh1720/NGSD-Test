const callModel = require("../models/callModel")

const getCalls = (req, res) => {
    callModel.queryCalls(req).then(all => {
        if (all != null) {
            // Handle data from database
            var jsonObj = JSON.parse(JSON.stringify(all.rows));
            for (o in jsonObj) {
                // Convert inbound status
                if (jsonObj[o].is_inbound == true) {
                    jsonObj[o].is_inbound = "Gọi đến"
                } else {
                    jsonObj[o].is_inbound = "Gọi đi"
                }

                var totalTime = 0;
                // Convert ringing duration
                if (jsonObj[o].ringing_dur.hasOwnProperty('seconds')) {
                    var i = jsonObj[o].ringing_dur.seconds;
                    if (jsonObj[o].ringing_dur.hasOwnProperty('minutes')) {
                        i+=jsonObj[o].ringing_dur.minutes*60;
                        if (jsonObj[o].ringing_dur.hasOwnProperty('hours')) {
                            i+=jsonObj[o].ringing_dur.hours*60*60;
                        }
                    }
                    totalTime+=i;
                    var date = new Date(0);
                    date.setSeconds(i);
                    jsonObj[o].ringing_dur = date.toISOString().substring(11, 19);
                } else {
                    jsonObj[o].ringing_dur = "00:00:00";
                }

                // Convert talking duration
                if (jsonObj[o].talking_dur != null) {
                    if (jsonObj[o].talking_dur.hasOwnProperty('seconds')) {
                        var i = jsonObj[o].talking_dur.seconds;
                        if (jsonObj[o].talking_dur.hasOwnProperty('minutes')) {
                            i+=jsonObj[o].talking_dur.minutes*60;
                            if (jsonObj[o].talking_dur.hasOwnProperty('hours')) {
                                i+=jsonObj[o].talking_dur.hours*60*60;
                            }
                        }
                        totalTime+=i;
                        var date = new Date(0);
                        date.setSeconds(i);
                        jsonObj[o].talking_dur = date.toISOString().substring(11, 19);
                    } else {
                        jsonObj[o].talking_dur = "00:00:00";
                    }
                }
                var date = new Date(0);
                date.setSeconds(totalTime);
                jsonObj[o].total_time = date.toISOString().substring(11, 19);
            }
            res.json(jsonObj)
        }
    })
}

module.exports = {getCalls}