// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '90a01d0db7ef2b4890a0e88ccfd158fe', // 90a01d0db7ef2b4890a0e88ccfd158fe
    iv = 'bff25246c7fe0d0c';

module.exports = {


  friendlyName: 'Decrypt',


  description: 'Decrypt something.',


  inputs: {
    data: {
      type: 'ref',
      example: '{"anything":"here"}',
      description: 'The text to be decrypted.',
      required: true      
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var decipher = crypto.createDecipheriv(algorithm,password,iv)
    var dec = decipher.update(inputs.data,'base64','utf8')
    dec += decipher.final('utf8');
    // All done.
    return exits.success(dec);
  }


};

