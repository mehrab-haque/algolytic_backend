const Controller = require("./base").Controller;
const fs=require('fs')


class MonitorController extends Controller{
    arr
    state
    constructor(){
        super()
        this.arr=[]
        this.state=={
            fCodeToDev:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-1-2'
            },
            fdevToMain:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-2-3'
            },
            fMainToDeploy:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-3-6'
            },
            fDevToDeploy:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-2-4'
            },
            bCodeToDev:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-8-9'
            },
            bdevToMain:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-9-10'
            },
            bMainToDeploy:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-10-13'
            },
            bDevToDeploy:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-9-11'
            },
            bDevToTest:{
                state:'success',
                timestamp:Date.now(),
                label:'',
                edgeId:'reactflow__edge-9-15'
            }     
        }
    }
    connect=async (req,res)=>{
        this.arr.push(res)
    }
    updateAll=async (obj)=>{
        this.arr.map(a=>{
            a.status(200).json(obj)
        })
        this.arr=[]
    }
    gitBackendWebhook=async (req,res)=>{
        var payload=req.body
        var obj=this.state
        console.log(obj,this.state)
        return res.sendStatus(200)


        if(Object.keys(payload).indexOf('action')>=0 && payload.action==='opened'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr created')
                    var obj=this.state
                    obj.bCodeToDev['state']='loading'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    this.updateAll(obj)
                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr created')
                    var obj=this.state
                    obj.bdevToMain['state']='loading'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    this.updateAll(obj)

                }
            }
        }
        else if(Object.keys(payload).indexOf('action')>=0 && payload.action==='closed'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr closed')
                    var obj=this.state
                    obj.bCodeToDev['state']='success'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    this.updateAll(obj)

                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr closed')
                    var obj=this.state
                    obj.bdevToMain['state']='success'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    this.updateAll(obj)

                }
            }
        }
        else if(Object.keys(payload).indexOf('before')>=0 && Object.keys(payload).indexOf('after')>=0){
            if(payload.repository.name==="algolytic_backend"){
                if(payload.ref==='refs/heads/dev'){
                    console.log('backend: dev changed')
                    var obj=this.state
                    obj.bCodeToDev['state']='success'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    this.updateAll(obj)

                }
                else if(payload.ref==='refs/heads/main'){
                    var obj=this.state
                    obj.bdevToMain['state']='success'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    this.updateAll(obj)

                }
            }
        }

        else if(Object.keys(payload).indexOf('action')>=0 && Object.keys(payload).indexOf('workflow_run')>=0){
            if(payload.workflow_run.repository.name==="algolytic_backend"){
                if(payload.workflow_run.name==='DevDeploy'){
                    if(payload.action==='requested'){
                        console.log('backend: dev deployment started')
                        var obj=this.state
                        obj.bDevToDeploy['state']='loading'
                        obj.bDevToDeploy['timestamp']=Date.now()
                        obj.bDevToDeploy['label']=''
                        this.updateAll(obj)

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: dev deployment completed successfully')
                            var obj=this.state
                            obj.bDevToDeploy['state']='success'
                            obj.bDevToDeploy['timestamp']=Date.now()
                            obj.bDevToDeploy['label']=''
                            this.updateAll(obj)
                        }

                        else{
                            console.log('backend: dev deployment failed')
                            var obj=this.state
                            obj.bDevToDeploy['state']='error'
                            obj.bDevToDeploy['timestamp']=Date.now()
                            obj.bDevToDeploy['label']='Failed: '
                            this.updateAll(obj)
                        }

                    }
                }
                else if(payload.workflow_run.name==='PingTest'){
                    if(payload.action==='requested'){
                        console.log('backend: testings started')
                        var obj=this.state
                        obj.bDevToTest['state']='loading'
                        obj.bDevToTest['timestamp']=Date.now()
                        obj.bDevToTest['label']=''
                        this.updateAll(obj)

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: testings completed successfully')
                            var obj=this.state
                            obj.bDevToTest['state']='success'
                            obj.bDevToTest['timestamp']=Date.now()
                            obj.bDevToTest['label']=''
                            this.updateAll(obj)

                        }
                        else{
                            console.log('backend: testings failed')
                            var obj=this.state
                            obj.bDevToTest['state']='error'
                            obj.bDevToTest['timestamp']=Date.now()
                            obj.bDevToTest['label']='Failed: '
                            this.updateAll(obj)
                        }
                    }
                }
            }
        }

        return res.sendStatus(200)
    }
}

module.exports = {MonitorController}