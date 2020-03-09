/**
 * ImagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * 
 */
module.exports = async function imageadd (req, res) {

    var result = {};
  
    try {
  
      var token = req.headers['token'];
      var data = await sails.helpers.parsetoken(token);

      // image_id, 
      // image_base_url, image_folder, image_name, image_url, 
      // image_from_url, image_from_name, 
      // cloudinary_caption, cloudinary_description, 
      // image_type, 	image_lat, image_long, 
      // created_by, 	content_flag, status_id
  
      var image_id = req.param("image_id", "");

      var image_base_url = req.param("image_base_url", "");
      var image_folder = req.param("image_folder", "");
      var image_name = req.param("image_name", "");
      var image_url = req.param("image_url", "");

      var image_from_url = req.param("image_from_url", "");
      var image_from_name = req.param("image_from_name", "");

      var cloudinary_caption = req.param("cloudinary_caption", "");
      var cloudinary_description = req.param("cloudinary_description", "");

      var image_type = req.param("image_type", 0);
      var image_lat = req.param("image_lat", 0.0);
      var image_long = req.param("image_long", 0.0);

      var created_by = data.user_id;
      var content_flag = req.param("content_flag", 0);
      var status_id = req.param("status_id", 1);

      var valuesToEscape = [image_id, 
        image_base_url, image_folder, image_name, image_url, 
        image_from_url, image_from_name,
        cloudinary_caption, cloudinary_description, 
        image_type, image_lat, image_long, 
        created_by, content_flag, status_id];

  
      var sql = "CALL `post_image`($1,$2,$3,$4,$5,$6,$7,$8,$9, $10, $11, $12, $13, $14, $15);";
      var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);
      console.log(rawResult[0]);
      result.response = true;
      return res.json(result);
  
    }
    catch (error) {
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
      console.log("error:", error);
      result.response = false;
      return res.json(result);
    }
  };
  
  