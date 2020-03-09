// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '90a01d0db7ef2b4890a0e88ccfd158fe', // 90a01d0db7ef2b4890a0e88ccfd158fe
    iv = 'bff25246c7fe0d0c';

module.exports = {


  friendlyName: 'Encrypt',


  description: 'Encrypt something.',


  inputs: {
    data: {
      type: 'ref',
      example: '{"anything":"here"}',
      description: 'The text to be encrypted.',
      required: true      
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var cipher = crypto.createCipheriv(algorithm,password,iv)
    var crypted = cipher.update(JSON.stringify(inputs.data),'utf8','base64')
    crypted += cipher.final('base64');
    // All done.
    return exits.success(crypted);

  }


};

