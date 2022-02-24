// export express,validator, router, controller 
const express=require("express");
const {body,query,param}=require("express-validator");
const router=express.Router();
const controller=require("./../controllers/authantictioncontrolls")
const isAuth=require("./../middleware/authrizeMW")


//log 
router.post("/login",[
    body("password").isString().withMessage("password should be Integer with number"),
    body("Email").isString().withMessage("formatein error"),
    body("role").isString().isIn(["speaker", "student","admin"]).withMessage("role should be string"),
],controller.loginCheck);
//register
router.post('/register',[
    body("password").isString().withMessage("password should be Integer with number"),
    body('passwordConfirmation').isString().custom((value, { req }) => {
        console.log( req.body.password)
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }else{
            return true;
        }
    }),
    body("fullName").isAlpha().withMessage("name should be String")
    .isLength({max:10}).withMessage(" name length <10"),
    body("Email").isEmail().withMessage("this is not email"),
    body("image").optional().isString().withMessage("this is not image"),
    body("role").isString().isIn(["speaker", "student"]).withMessage("role should be string"),
    body("address").optional().isObject().withMessage("you should enter adress object")

],controller.creatAccount);
//update
router.put("/update",[
    body("password").isString().withMessage("password should be Integer with number"),
    body('passwordConfirmation').isString().custom((value, { req }) => {
        console.log( req.body.password)
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }else{
            return true;
        }
    }),
    body("Email").isString().withMessage("formatein error"),
    body("role").isString().isIn(["speaker", "student","admin"]).withMessage("role should be string"),
],isAuth,controller.updateAccount);








//exporting
module.exports=router;