$(document).ready(function() {
    // Function to fetch and display contacts
    function fetchContacts() { 
            //"http://localhost:3000/contacts" is my URL_ENDPOINT
        $.get("http://localhost:3000/contacts", function(data) {
            const contactList = $("#contact-list");
            contactList.empty();

            data.forEach(function(contact) {
                contactList.append(`
                    <tr>
                        <td>${contact.firstName}</td>
                        <td>${contact.lastName}</td>
                        <td>${contact.phone}</td>
                        <td>${contact.email}</td>
                        <td>
                            <button class="btn btn-primary btn-edit" data-id="${contact.id}">Update</button>
                            <button class="btn btn-danger btn-delete" data-id="${contact.id}">Delete</button>
                        </td>
                    </tr>
                `);
            });

            // Add event listeners for edit and delete buttons
            $(".btn-edit").click(editContact); //This is the UPDATE button
            $(".btn-delete").click(deleteContact);
        });
    }

    // Function to add a new contact
    $("#contact-form").submit(function(event) {
        event.preventDefault();
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const phone = $("#phone").val();
        const email = $("#email").val();

        const newContact = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        };

        $.post("http://localhost:3000/contacts", newContact, function() {
            fetchContacts(); // Refresh the contact list
            // Clear the form
            $("#first-name").val("");
            $("#last-name").val("");
            $("#phone").val("");
            $("#email").val("");
        });
    });

    // Function to edit a contact
    function editContact() {
        const contactId = $(this).data("id");
        
        //  Edit functionality here.
        // Prompt the user to edit contact details CHOSE PROMPT because I had less issues.
        const firstName = prompt("Edit First Name:", $(this).closest("tr").find("td:eq(0)").text());
        const lastName = prompt("Edit Last Name:", $(this).closest("tr").find("td:eq(1)").text());
        const phone = prompt("Edit Phone Number:", $(this).closest("tr").find("td:eq(2)").text());
        const email = prompt("Edit Email:", $(this).closest("tr").find("td:eq(3)").text());

        // Create an updated contact object
        const updatedContact = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        };

        // Send a PUT request to update the contact
        $.ajax({
            url: `http://localhost:3000/contacts/${contactId}`,
            method: "PUT",
            data: updatedContact,
            success: function() {
                fetchContacts(); // Refresh the contact list
            }
        });
    }

    // Function to delete a contact
    function deleteContact() {
        const contactId = $(this).data("id");
        // Delete functionality here.
         // Confirm with the user before deletion
         if (confirm("Are you sure you want to delete this contact?")) {
            // Send a DELETE request to remove the contact
            $.ajax({
                url: `http://localhost:3000/contacts/${contactId}`,
                method: "DELETE",
                success: function() {
                    fetchContacts(); // Refresh the contact list
                }
            });
        }

    }

    // Initial fetch to load contacts
    fetchContacts();
});

