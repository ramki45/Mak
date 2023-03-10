// Copyright (c) 2023, ram and contributors
// For license information, please see license.txt


frappe.ui.form.on("Meeting", {
	send_invitation: function(frm) {
		if (frm.doc.status==="Planned") {
			frappe.call({
				method: "meeting.api.send_invitation_emails",
				args: {
					meeting: frm.doc.name
				}
			});
		}
	},
});

frappe.ui.form.on("Attendees", {
	attendee: function(frm, cdt, cdn){
        var attendee = frappe.model.get_doc(cdt,cdn);
        if(attendee.attendee){
            frm.call({
                method: "meeting.meeting_module.doctype.meeting.meeting.get_full_name",
			args: {
				attendee: attendee.attendee
			},
                callback: function(r){
                frappe.model.set_value(cdt,cdn,"full_name",r.message);

                }
            })
        }
        else{
            frappe.model.set_value(cdt,cdn,"full_name",null);
        }
    }
    
});

