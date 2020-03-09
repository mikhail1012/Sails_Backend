module.exports = {


  friendlyName: 'Get Token',


  description: 'Get some token.',


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
    var tmcEncrypt = await sails.helpers.encrypt(inputs.data);
    // All done.
    return exits.success(tmcEncrypt);
  }


};

