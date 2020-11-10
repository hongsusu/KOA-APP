const Router = require("koa-router")
const router =new Router();
var bcrypt = require('bcryptjs');
//处理头像
const gravatar = require('gravatar');

//引入User
const User =require("../../models/User")

//test
//路由
/**
 * router GET apis/users/test
 * @desc 测试接口地址
 * @access 接口公开
 */

router.get('/test', ctx=>{
    ctx.status = 200
    ctx.body={msg:'users works....'}
})

/**
 * router GET apis/users/test
 * @desc 注冊接口
 * @access 接口公开
 */
router.post('/register', ctx=>{
    //存储数据库
    const findResult= User.find({email:ctx.request.body.email})
    console.log(findResult)
    if(findResult.length>0){
        ctx.status=200;
        ctx.body={code:500,message:"邮箱已被占用"}
    }else{
        const avatar =gravatar.url(ctx.request.body.email,{s:'200',r:'pg',d:'mm'})
        //没查到
        const newUser=new User ({
            name:ctx.request.body.name,
            email:ctx.request.body.email,
            pwd:ctx.request.body.pwd,
            avatar
        });
        //加密
     bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.pwd, salt, (err, hash)=> {
                // Store hash in your password DB.
                if(err) throw err
                newUser.pwd=hash
            });
        });
       newUser
          .save()
          .then(user=>{
          ctx.body={
              code:200,
              msg:'成功'
          }
      }).catch((err=>{
          console.log(err)
      }))
        //返回json数据
        ctx.bosy=newUser
    }
})

module.exports = router.routes();