const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();
const isAuth=require("./../middleware/authrizeMW")

const controller=require("./../controllers/speakerscontroll")

router.route("/speakers")
      .get([
        body("Email").optional().isInt().withMessage("speaker Email should be Integer"),
      ],isAuth,controller.getSpeaker) //getting
      .post([
            body("fullName").isAlpha().withMessage("speaker Name should be String")
           .withMessage("speaker name should be string"),
            body("password").isAlpha().withMessage("speaker Password should be"),
            body("Email").isEmail().withMessage("this is not email"),
            body("image").isString().withMessage("this is not image"),
            body("role").isAlpha().withMessage("role should be string"),
            body("Address").isString().withMessage("you should enter adress object")
        ],isAuth,controller.createSpeaker)                                                     //adding
        .put([
            body("Email").isInt().withMessage("speaker Email should be Integer")              //edite
        ],isAuth,controller.updateSpeakers)
        .delete([
        body("Email").isInt().withMessage("speaker Email should be Integer")                  //delete
        ],isAuth,controller.deleteSpeakers);











































        

module.exports=router;