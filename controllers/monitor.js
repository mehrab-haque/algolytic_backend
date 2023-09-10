const Controller = require("./base").Controller;
const fs=require('fs')


class MonitorController extends Controller{
    constructor(){
        super()
    }
    gitBackendWebhook=async (req,res)=>{
        var payload=req.body

        if(Object.keys(payload).indexOf('action')>=0 && payload.action==='opened'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr created')
                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr created')
                }
            }
        }
        else if(Object.keys(payload).indexOf('action')>=0 && payload.action==='closed'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr closed')
                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr closed')
                }
            }
        }
        else if(Object.keys(payload).indexOf('before')>=0 && Object.keys(payload).indexOf('after')>=0){
            if(payload.repository.name==="algolytic_backend"){
                if(payload.ref==='refs/heads/dev'){
                    console.log('backend: dev changed')
                }
                else if(payload.ref==='refs/heads/dev'){
                    console.log('backend: main changed')
                }
            }
        }

        else if(Object.keys(payload).indexOf('action')>=0 && Object.keys(payload).indexOf('workflow_run')>=0){
            if(payload.workflow_run.repository.name==="algolytic_backend"){
                if(payload.workflow_run.name==='DevDeploy'){
                    if(payload.action==='requested'){
                        console.log('backend: dev deployment started')
                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conslusion==='success')
                            console.log('backend: dev deployment completed successfully')
                        else
                            console.log('backend: dev deployment failed')
                    }
                }
                else if(payload.workflow_run.name==='PingTest'){
                    if(payload.action==='requested'){
                        console.log('backend: testings started')
                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conslusion==='success')
                            console.log('backend: testings completed successfully')
                        else
                            console.log('backend: testings failed')
                    }
                }
            }
        }

        res.sendStatus(200)
    }
}

module.exports = {MonitorController}