const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();
const controller=require("./../controllers/studentcontrollers")
const isAuth=require("./../middleware/authrizeMW")



router.route("/students/:id?")
        .get([
            body("id").optional().isInt().withMessage("student ID should be Integer")
        ],isAuth,controller.getAllstudents)
        .post([
            body("id").isInt().withMessage("student ID should be Integer"),
            body("fullName").isAlpha().withMessage("student Name should be String")
            .isLength({max:20}).withMessage("student name length <10"),
            body("Email").isEmail().withMessage("this is not email"),
            body("password").isAlphanumeric().withMessage("password must be complicated")
           
        ],isAuth,controller.createStudent)
        .put([
            body("id").isInt().withMessage("student ID should be Integer")
        ],isAuth,controller.updateStudent)
        .delete([
            body("id").isInt().withMessage("student ID should be Integer")
        ],isAuth,controller.deleteStudent);





module.exports=router;