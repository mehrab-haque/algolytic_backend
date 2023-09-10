const Controller = require("./base").Controller;
const fs=require('fs')


class MonitorController extends Controller{
    arr
    constructor(){
        super()
        this.arr=[]
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

        if(Object.keys(payload).indexOf('action')>=0 && payload.action==='opened'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr created')
                    this.updateAll({status:'backend: dev pr created'})
                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr created')
                    this.updateAll({status:'backend: dev pr created'})

                }
            }
        }
        else if(Object.keys(payload).indexOf('action')>=0 && payload.action==='closed'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr closed')
                    this.updateAll({status:'backend: dev pr created'})

                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr closed')
                    this.updateAll({status:'backend: dev pr created'})

                }
            }
        }
        else if(Object.keys(payload).indexOf('before')>=0 && Object.keys(payload).indexOf('after')>=0){
            if(payload.repository.name==="algolytic_backend"){
                if(payload.ref==='refs/heads/dev'){
                    console.log('backend: dev changed')
                    this.updateAll({status:'backend: dev pr created'})

                }
                else if(payload.ref==='refs/heads/main'){
                    console.log('backend: main changed')
                    this.updateAll({status:'backend: dev pr created'})

                }
            }
        }

        else if(Object.keys(payload).indexOf('action')>=0 && Object.keys(payload).indexOf('workflow_run')>=0){
            if(payload.workflow_run.repository.name==="algolytic_backend"){
                if(payload.workflow_run.name==='DevDeploy'){
                    if(payload.action==='requested'){
                        console.log('backend: dev deployment started')
                    this.updateAll({status:'backend: dev pr created'})

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: dev deployment completed successfully')
                    this.updateAll({status:'backend: dev pr created'})
                        }

                        else{
                            console.log('backend: dev deployment failed')
                    this.updateAll({status:'backend: dev pr created'})
                        }

                    }
                }
                else if(payload.workflow_run.name==='PingTest'){
                    if(payload.action==='requested'){
                        console.log('backend: testings started')
                    this.updateAll({status:'backend: dev pr created'})

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: testings completed successfully')
                    this.updateAll({status:'backend: dev pr created'})

                        }
                        else{
                            console.log('backend: testings failed')
                    this.updateAll({status:'backend: dev pr created'})

                        }
                    }
                }
            }
        }

        res.sendStatus(200)
    }
}

module.exports = {MonitorController}