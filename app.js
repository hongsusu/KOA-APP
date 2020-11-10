const koa = require("koa")
const Router = require("koa-router")
const mongoose =require("mongoose")
const db =require("./config/keys").mongoURI
const bodyParser =require('koa-bodyparser')

mongoose.connect(
    db,
    { useNewUrlParser: true }
).then(()=>console.log('MongoDB Connected'))
    .catch(err=>{
        console.log(err)
    })
//实例化
const app =new koa();
const router =new Router();

app.use(bodyParser())

//引入users.js
const users = require("./routers/api/users")

//路由
router.get('/',ctx=>{
    ctx.body={msg:'Hello koa int'}
})

//配置路由地址 localhost:5000/api/users
router.use("/api/users",users)

//配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`sever start on ${port}`)
})