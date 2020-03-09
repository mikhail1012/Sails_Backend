module.exports = {


  friendlyName: 'Sendmailer',


  description: 'Sendmailer something.',


  inputs: {
    data: {
      type: 'ref',
      example: '{"anything":"here"}',
      description: 'The text to be decrypted.',
      required: true
    }

  },


  exits: {},


  fn: async function (inputs, exits) {

    let mandrill = require('mandrill-api/mandrill');
    let mandrill_client = new mandrill.Mandrill('T_e3g3qCROMZNLA3v7JlGw');

    // Get Template Name
    var template_name = inputs.data.template_name;

    // Template Content
    var template_content = [{


    }];

    var message = {
      "subject": inputs.data.subject,
      "from_email": inputs.data.from_email,
      "from_name": inputs.data.from_name,
      "to": [{
        "email": inputs.data.email,
        "type": "to"
      }],
      "merge_vars": [

      ],
      "attachments": [{}],

    };


    if(inputs.data.sendfile){
      var datetime = new Date();
      datetime.setTime( datetime.getTime() + datetime.getTimezoneOffset()*60*1000 );
      var invoice_datetime = new Date(datetime).toISOString().split('T')[0];

      message.attachments[0].type = "application/pdf";
      message.attachments[0].name = "invoice"+invoice_datetime+".pdf";
      message.attachments[0].content = inputs.data.sendfile;
    }

    var content = {
      "rcpt": inputs.data.email,
      "vars": [
        {
          "name": "Name",
          "content": inputs.data.name
        },
        {
          "name": "verification_link",
          "content": inputs.data.verification_link,
        },
        {
          "name": "password_key",
          "content": inputs.data.password_key
        },
      ]
    };
    message.merge_vars.push(content);
    var async = false;

    mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async
    }, function (result) {
      return exits.success(result);
      /*
       [{
       "email": "recipient.email@example.com",
       "status": "sent",
       "reject_reason": "hard-bounce",
       "_id": "abc123abc123abc123abc123abc123"
       }]
       */
    }, function (e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
  }
};
