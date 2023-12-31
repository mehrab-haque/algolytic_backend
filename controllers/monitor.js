

class MonitorController{
    static arr=[]
    static state={
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

    //hello hiiii fff
    static initialize=async (req,res)=>{
        return res.status(200).json(MonitorController.state)
    }
    static connect=async (req,res)=>{
        MonitorController.arr.push(res)
    }
    static updateAll=async (obj)=>{
        MonitorController.arr.map(a=>{
            a.status(200).json(obj)
        })
        MonitorController.arr=[]
    }
    //sdsd
    static awsProdBack=async (req,res)=>{
        console.log('prod back deployed')
        var obj=MonitorController.state
        obj.bMainToDeploy['state']='success'
        obj.bMainToDeploy['timestamp']=Date.now()
        obj.bMainToDeploy['label']=''
        MonitorController.updateAll(obj)
        res.sendStatus(200)
    }
    static gitBackendWebhook=async (req,res)=>{
        var payload=req.body



        if(Object.keys(payload).indexOf('action')>=0 && payload.action==='opened'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr created')
                    var obj=MonitorController.state
                    obj.bCodeToDev['state']='loading'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    MonitorController.updateAll(obj)
                }

                else if(payload.pull_request.base.ref ==='main'){
                    console.log('backend: main pr created ')
                    var obj=MonitorController.state
                    obj.bdevToMain['state']='loading'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    MonitorController.updateAll(obj)
                    //thus
                }
            }else{
                if(payload.pull_request.base.ref==='dev'){
                    console.log('frontend: dev pr created')
                    var obj=MonitorController.state
                    obj.fCodeToDev['state']='loading'
                    obj.fCodeToDev['timestamp']=Date.now()
                    obj.fCodeToDev['label']=''
                    MonitorController.updateAll(obj)
                }

                else if(payload.pull_request.base.ref ==='main'){
                    console.log('frontend: main pr created ')
                    var obj=MonitorController.state
                    obj.fdevToMain['state']='loading'
                    obj.fdevToMain['timestamp']=Date.now()
                    obj.fdevToMain['label']=''
                    MonitorController.updateAll(obj)
                    //thus
                }
            }
        }
        else if(Object.keys(payload).indexOf('action')>=0 && payload.action==='closed'){
            if(payload.pull_request.base.repo.name==="algolytic_backend"){
                if(payload.pull_request.base.ref==='dev'){
                    console.log('backend: dev pr closed')
                    var obj=MonitorController.state
                    obj.bCodeToDev['state']='success'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    MonitorController.updateAll(obj)

                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('backend: main pr closed')
                    var obj=MonitorController.state
                    obj.bdevToMain['state']='success'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    MonitorController.updateAll(obj)

                }
            }else{
                if(payload.pull_request.base.ref==='dev'){
                    console.log('frontend: dev pr closed')
                    var obj=MonitorController.state
                    obj.fCodeToDev['state']='success'
                    obj.fCodeToDev['timestamp']=Date.now()
                    obj.fCodeToDev['label']=''
                    MonitorController.updateAll(obj)

                }
                else if(payload.pull_request.base.ref==='main'){
                    console.log('frontend: main pr closed')
                    var obj=MonitorController.state
                    obj.fdevToMain['state']='success'
                    obj.fdevToMain['timestamp']=Date.now()
                    obj.fdevToMain['label']=''
                    MonitorController.updateAll(obj)

                }
            }
        }
        else if(Object.keys(payload).indexOf('before')>=0 && Object.keys(payload).indexOf('after')>=0){
            if(payload.repository.name==="algolytic_backend"){
                if(payload.ref==='refs/heads/dev'){
                    console.log('backend: dev changed')
                    var obj=MonitorController.state
                    obj.bCodeToDev['state']='success'
                    obj.bCodeToDev['timestamp']=Date.now()
                    obj.bCodeToDev['label']=''
                    MonitorController.updateAll(obj)

                }
                else if(payload.ref==='refs/heads/main'){
                    var obj=MonitorController.state
                    obj.bdevToMain['state']='success'
                    obj.bdevToMain['timestamp']=Date.now()
                    obj.bdevToMain['label']=''
                    obj.bMainToDeploy['state']='loading'
                    obj.bMainToDeploy['timestamp']=Date.now()
                    obj.bMainToDeploy['label']=''
                    MonitorController.updateAll(obj)

                }
            }else{
                if(payload.ref==='refs/heads/dev'){
                    console.log('frontend: dev changed')
                    var obj=MonitorController.state
                    obj.fCodeToDev['state']='success'
                    obj.fCodeToDev['timestamp']=Date.now()
                    obj.fCodeToDev['label']=''
                    MonitorController.updateAll(obj)

                }
                else if(payload.ref==='refs/heads/main'){
                    var obj=MonitorController.state
                    obj.fdevToMain['state']='success'
                    obj.fdevToMain['timestamp']=Date.now()
                    obj.fdevToMain['label']=''
                    MonitorController.updateAll(obj)

                }
            }
        }

        else if(Object.keys(payload).indexOf('action')>=0 && Object.keys(payload).indexOf('workflow_run')>=0){
            if(payload.workflow_run.repository.name==="algolytic_backend"){
                if(payload.workflow_run.name==='DevDeploy'){
                    if(payload.action==='requested'){
                        console.log('backend: dev deployment started')
                        var obj=MonitorController.state
                        obj.bDevToDeploy['state']='loading'
                        obj.bDevToDeploy['timestamp']=Date.now()
                        obj.bDevToDeploy['label']=''
                        MonitorController.updateAll(obj)

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: dev deployment completed successfully')
                            var obj=MonitorController.state
                            obj.bDevToDeploy['state']='success'
                            obj.bDevToDeploy['timestamp']=Date.now()
                            obj.bDevToDeploy['label']=''
                            MonitorController.updateAll(obj)
                        }

                        else{
                            console.log('backend: dev deployment failed')
                            var obj=MonitorController.state
                            obj.bDevToDeploy['state']='error'
                            obj.bDevToDeploy['timestamp']=Date.now()
                            obj.bDevToDeploy['label']='Failed: '
                            MonitorController.updateAll(obj)
                        }

                    }
                }
                //comment new change
                else if(payload.workflow_run.name==='PingTest'){
                    if(payload.action==='requested'){
                        console.log('backend: testings started')
                        var obj=MonitorController.state
                        obj.bDevToTest['state']='loading'
                        obj.bDevToTest['timestamp']=Date.now()
                        obj.bDevToTest['label']=''
                        MonitorController.updateAll(obj)

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('backend: testings completed successfully')
                            var obj=MonitorController.state
                            obj.bDevToTest['state']='success'
                            obj.bDevToTest['timestamp']=Date.now()
                            obj.bDevToTest['label']=''
                            MonitorController.updateAll(obj)

                        }
                        else{
                            console.log('backend: testings failed')
                            var obj=MonitorController.state
                            obj.bDevToTest['state']='error'
                            obj.bDevToTest['timestamp']=Date.now()
                            obj.bDevToTest['label']='Failed: '
                            MonitorController.updateAll(obj)
                        }
                    }
                }
            }else{
                if(payload.workflow_run.name==='DevDeploy'){
                    if(payload.action==='requested'){
                        console.log('frontend: dev deployment started')
                        var obj=MonitorController.state
                        obj.fDevToDeploy['state']='loading'
                        obj.fDevToDeploy['timestamp']=Date.now()
                        obj.fDevToDeploy['label']=''
                        MonitorController.updateAll(obj)

                    }
                    else if(payload.action==='completed'){
                        if(payload.workflow_run.conclusion==='success'){
                            console.log('frontend: dev deployment completed successfully')
                            var obj=MonitorController.state
                            obj.fDevToDeploy['state']='success'
                            obj.fDevToDeploy['timestamp']=Date.now()
                            obj.fDevToDeploy['label']=''
                            MonitorController.updateAll(obj)
                        }

                        else{
                            console.log('frontend: dev deployment failed')
                            var obj=MonitorController.state
                            obj.fDevToDeploy['state']='error'
                            obj.fDevToDeploy['timestamp']=Date.now()
                            obj.fDevToDeploy['label']='Failed: '
                            MonitorController.updateAll(obj)
                        }

                    }
                }
            }
        }

        return res.sendStatus(200)
    }
}

module.exports = {MonitorController}