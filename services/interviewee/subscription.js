const Service = require('../base').Service;
const SubRepository=require('../../repository/subscription').SubRepository
const SSLCommerzPayment = require('sslcommerz-lts')

const subRepository=new SubRepository()

class SubService extends Service {
    constructor() {
        super();
    }

    list =async ()=>{
        try{
            var data=await subRepository.getAll()
            return {
                success:true,
                data:data
            }

        }catch(e){
            console.log(e)
            return {
                success:false,
            }
        }
    }

    create =async (data)=>{
        try{
            var sub=await subRepository.create(data)
            return {
                success:true,
                data:sub
            }

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
    subscribe =async (data)=>{
        try{
            if(data.sub_id>1){
                var subData=await subRepository.getById(data.sub_id)
                subData=subData.get({ plain: true })
                var amount=parseInt(subData.fee.split('$')[1])*110
                var pgwData = {
                    total_amount: amount.toFixed(2),
                    currency: 'BDT',
                    tran_id: 'REF123', // use unique tran_id for each api call
                    success_url: `http://localhost:4000/subscription`,
                    fail_url: 'http://localhost:4000/subscription',
                    cancel_url: 'http://localhost:4000/subscription',
                    ipn_url: process.env.IPN_URL,
                    shipping_method: 'Courier',
                    product_name : subData.title,
                    product_category : 'Education',
                    product_profile : 'digital-goods', // "physical-goods"
                    cus_name: data.user_name,
                    cus_email: data.user_email.indexOf('@')>=0?data.user_email:`${data.user_email}@gmail.com`,
                    cus_add1: 'Dhaka',
                    cus_city: 'Dhaka',
                    cus_state: 'Dhaka',
                    cus_postcode: '1216',
                    cus_country: 'Bangladesh',
                    cus_phone:'01711111111',
                    cus_fax: '01711111111',
                    ship_name:data.user_name,
                    ship_add1: 'Dhaka',
                    ship_city: 'Dhaka',
                    ship_state: 'Dhaka',
                    ship_postcode: '1000',
                    ship_country: 'Bangladesh',
                    multi_card_name: 'internetbank,mobilebank,mastercard,visacard',
                    value_a: `${data.sub_id}`,
                    value_b: `${data.user_id}`
                };
                const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);
                var apiResponse=await sslcz.init(pgwData)
                return {
                    success:true,
                    data: apiResponse.GatewayPageURL
                }
              
            }else{
                
            }
            //var sub=await subRepository.subscribe(data)
            

        }catch(e){
            console.log(e)
            return {
                success:false
            }
        }
    }
}

module.exports = {SubService}