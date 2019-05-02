import moment from "moment-timezone";

// This is hardcoded to the UK, but could be extended by cross-referencing
// geodata with the Google maps API and moment-timezone
const formatTimestamp = timestamp => {
    return moment(timestamp)
        .tz("Europe/London")
        .format("dddd, MMMM Do YYYY, hh:mm a");
};

export default formatTimestamp;
