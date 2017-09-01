var StatusENUMS = {
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Learn JavasScript", status: StatusENUMS.ACTIVE},
    2 : {title : "Git Tutorial", status: StatusENUMS.ACTIVE},
    3 : {title : "Interactive Git", status: StatusENUMS.ACTIVE}
}

var nextToDoID = 4;

module.exports = {StatusENUMS:StatusENUMS, todos: todos, nextToDoId: nextToDoID};
