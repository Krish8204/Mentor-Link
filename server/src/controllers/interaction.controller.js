const Interaction = require("../models/Interaction");
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");
const interactionEvents = require("../utils/interactions.utils");
const roles = require("../utils/roles");
const response = require("../utils/responses.utils");

module.exports = {
    /**
     * @Desc create a new interaction between a mentor and mentee
     * @param {*} event Interaction event
     * @param {*} user current user
     * @param {*} content Interaction event content
     * 
     */
     createInteraction: async (event, user, content) => {
        try {

            var start = new Date();
            start.setHours(0,0,0,0);
    
            var end = new Date();
            end.setHours(23,59,59,999);
            
          
            if(user.role === roles.Mentor) {

                const interaction = await Interaction.findOne({
                    mentor: user._id,
                    date: { "$gte": start, "$lte": end }
                })

                if(interaction) {
                    if(event === "Post") {
                        await Interaction.findOneAndUpdate({ _id: interaction._id}, {
                            $inc: {
                                "interactionCount.post": 1,

                            },
                            $push: {
                                "posts": content
                            }
                        })
                    }

                    if(event === "Meeting") {
                        await Interaction.findOneAndUpdate({ _id: interaction._id}, {
                            $inc: {
                                "interactionCount.meeting": 1
                            },
                            $push: {
                                "meetings": content
                            }
                        })
                    }
                }
                else {
                    const newInteraction = new Interaction();
                    newInteraction.mentor = user._id;
                    
                    if(event === "Post") {
                        newInteraction.interactionCount.post += 1;
                        newInteraction.posts.push(content);
                    }

                    if(event === "Meeting") {
                        newInteraction.interactionCount.meeting += 1;
                        newInteraction.meetings.push(content);
                    }
                    
                    // console.log("newInteraction", newInteraction)

                    await newInteraction.save();
                }

            }

            if(user.role === roles.Student) {

                const interaction = await Interaction.findOne({
                    mentor: user.mentoredBy,
                    date: { "$gte": start, "$lte": end }
                })

                if(interaction) {
                    await Interaction.findOneAndUpdate({ _id: interaction._id}, {
                        $inc: {
                            interactionCount: 1
                        }
                    })
                }
                else {
                    const newInteraction = new Interaction();
                    newInteraction.mentor = user.mentoredBy;
                    newInteraction.interactionCount += 1;
                    newInteraction.activities.push({
                        content: content,
                        contentModel: event
                    })

                    await newInteraction.save();
                }

            }

        }
        catch(err){
            console.log(err);
        }
    },


    /**
     * @Desc Fetchs all interactions for the current user
     */
    getAllInteractions: async (req, res, next) => {
        try {
            let interactions = [];

            if (req.user.role === roles.Admin) {
                interactions = await Interaction.find();
            } else if (req.user.role === roles.Mentor) {
                interactions = await Interaction.find({ mentor: req.user._id });
            } else if (req.user.role === roles.Student) {
                interactions = await Interaction.find({ student: req.user._id });
            }

            if(req.user.role === roles.Mentor) {
                interactions = await Interaction.find({ mentor: req.user._id});
            }

            if(req.user.role === roles.Student) {
                interactions = await Interaction.find({ students: req.user._id});
            }

            response.success(res, "", { interactions } )
        }
        catch(err) {
            console.log(err);
        }
    },
};
