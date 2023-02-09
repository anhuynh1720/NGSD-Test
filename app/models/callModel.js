const pool = require("../../database/database")

const queryCalls = async(req) => {
    let queryString = "SELECT cl_calls.id, cl_participants.start_time, cl_party_info.caller_number,cl_participants.forward_reason, cl_calls.ringing_dur, cl_calls.talking_dur, cl_participants.is_inbound FROM cl_calls right outer join cl_participants ON cl_participants.call_id = cl_calls.id FULL OUTER JOIN cl_segments ON cl_segments.action_party_id = cl_participants.id FULL OUTER JOIN cl_party_info ON cl_participants.info_id = cl_party_info.id";
    let q = "";
    let params = [];
    let valueCount = 0;

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const phoneNumber = req.query.phoneNumber;
    const inbound = req.query.inbound;
    const ringingTimeFrom = req.query.ringingTimeFrom;
    const ringingTimeTo = req.query.ringingTimeTo;
    const talkingTimeFrom = req.query.talkingTimeFrom;
    const talkingTimeTo = req.query.talkingTimeTo;

    // Handle query string with condition
    if (fromDate != "") {
        valueCount++;
        q+="cl_participants.start_time>=$" + valueCount + " ";
        params.push(fromDate)
    }

    if (toDate != "") {
        valueCount++;
        q+="cl_participants.start_time<=$" + valueCount + " ";
        params.push(toDate)
    }

    if (phoneNumber != "") {
        valueCount++;
        q+="cl_party_info.caller_number=$" + valueCount + " ";
        params.push(phoneNumber)
    }

    if (inbound != "") {
        valueCount++;
        q+="cl_participants.is_inbound=$" + valueCount + " ";
        params.push(inbound)
    }

    if (ringingTimeFrom != "" & ringingTimeTo != "") {
        valueCount++;
        q+="cl_calls.ringing_dur>=$" + valueCount + " ";
        valueCount++;
        q+="cl_calls.ringing_dur<=$" + valueCount + " ";
        params.push(ringingTimeFrom)
        params.push(ringingTimeTo)
    }

    if (talkingTimeFrom != "" & talkingTimeTo != "") {
        valueCount++;
        q+="cl_calls.talking_dur>=$" + valueCount + " ";
        valueCount++;
        q+="cl_calls.talking_dur<=$" + valueCount + " ";
        params.push(talkingTimeFrom)
        params.push(talkingTimeTo)
    }

    if (q != "") {
        q = q.substring(0, q.length - 1)
        q = q.split(' ').join(' AND ')
        q = " WHERE " + q;
    } else {
        return null;
    }

    queryString += q;
    try {
        const all = await pool.query(queryString, params);
        return all;
    } catch(err) {
        console.error(err.message);
    }
}

module.exports = {queryCalls}