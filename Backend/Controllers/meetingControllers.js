const { Meeting } = require('../db/Models/meetingsModel')

const Create = async (req, res) => {
    if (req.user.role == "supervisor" || req.user.role == "admin") {
        let newMetting = new Meeting({
            admin_supervisorId: req.user.id,
            internId: req.body.internId,
            start: req.body.start,
            end: req.body.end,
            title: req.body.title
        });
        newMetting.save().then((newMetting) => {
            return res.send(newMetting)
        })
    }
    else {
        return res.status(400).json('unAutherized')
    }
}

const getMeetings = (req, res) => {
    if (req.user.role == "admin") {
        Meeting.find()
            .then(meetings => res.json(meetings))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve meetings' }));
    }
    else if (req.user.role == "supervisor") {
        Meeting.find({ admin_supervisorId: req.user.id })
            .then(meetings => res.json(meetings))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve meetings' }));
    }
    else if (req.user.role == "intern") {
        Meeting.find({ internId: req.user.id })
            .then(meetings => { return res.json(meetings) })
            .catch(err => { return res.status(400).json({ error: 'Unable to retrieve meetings' }) });
    }
    else {
        return res.status(400).json('unAutherized')
    }
}

const DeleteMeeting = async (req, res) => {
    if (req.user.role == "supervisor" || req.user.role == "admin") {
        Meeting.findByIdAndRemove({ _id: req.params.meeting_id }).then((removedMeeting) => {
            return res.status(200).json(removedMeeting);
        })
    }
    else {
        return res.status(400).json('unAutherized')
    }
}

const updateMeeting = (req, res) => {
    if (req.user.role == "admin" || req.user.role == "supervisor") {
        Meeting.findOne({ _id: req.params.meeting_id }).then(async meeting => {
            if (meeting) {
                meeting.start = req.body.start
                meeting.end = req.body.end
                meeting.title = req.body.title,
                    meeting.save().then(() => { return res.status(200).json(meeting) })
                        .catch(err => { return res.status(400).json({ error: err }) });
            }
            else {
                res.status(400).json('unAutherized')
            };
        }
        )
    }
    else {
        return res.status(400).json('unAutherized')

    }

}

module.exports = {
    Create, updateMeeting, DeleteMeeting, getMeetings
}