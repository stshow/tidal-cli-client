const List = require("./List");
const keySender = require("node-key-sender");

module.exports = class extends List {
    constructor(options, tracks) {
        let tracksDescriptions = tracks.map(track => {
                let trackLabel = track.title + " - ";
                track.artists.forEach((artist) => {
                    trackLabel += artist.name + " ";
                });
                return trackLabel;
            }
        );
        super(options, tracksDescriptions);

        this.communicationEventTypes = require("./MainScreen").eventTypes;
        this.communicationEvents = options.communicationEvents;
        this.listSelectEvent = this.communicationEventTypes.PLAY_TRACKS;


        this.on("select", async (item, index) => {
            let track = tracks[index];

            this.communicationEvents.fire({
                type: this.listSelectEvent,
                tracks: [track]
            });
            this.listSelectEvent = this.communicationEventTypes.PLAY_TRACKS;
        });

        this.key(["n"], () => {
            this.listSelectEvent = this.communicationEventTypes.PLAY_TRACKS_NEXT;
            keySender.sendKey("enter");
        });

        this.key(["a"], () => {
            this.listSelectEvent = this.communicationEventTypes.ADD_TRACKS_TO_QUEUE;
            keySender.sendKey("enter");
        });
    }
};