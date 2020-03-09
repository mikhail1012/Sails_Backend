module.exports = {


  friendlyName: 'Parse token',


  description: 'Parse some token.',


  inputs: {
    data: {
      type: 'ref',
      example: '{"anything":"here"}',
      description: 'Contains SessionID and UserID.',
      required: true      
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var parseData = await sails.helpers.decrypt(inputs.data);
    var result = JSON.parse(parseData);

    // All done.
    return exits.success(result);
  }


};

