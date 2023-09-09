const Service = require('../base').Service;
const SubRepository = require('../../repository/subscription').SubRepository
const SSLCommerzPayment = require('sslcommerz-lts');
const { setSubscriptionPayload } = require('../../routes/interviewee/payment');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { register } = require("../auth");
const { AuthRepository } = require('../../repository/auth');
const { userTypeMapping } = require('../../config/constants');
const axios = require('axios')


const subRepository = new SubRepository()

const authRepository = new AuthRepository()



// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // Use port 465 for secure (SSL/TLS) connection
  secure: true, // Use SSL/TLS
  service: 'SMTP', // use your SMTP service provider (e.g., 'Gmail', 'Yahoo', etc.)
  auth: {
    user: process.env.SMTP_USER, // your email address
    pass: process.env.SMTP_PASS, // your email password or application-specific password
  },
});


function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
class SubService extends Service {
  constructor() {
    super();
  }

  list = async () => {
    try {
      var data = await subRepository.getAll()
      return {
        success: true,
        data: data
      }

    } catch (e) {
      console.log(e)
      return {
        success: false,
      }
    }
  }

  create = async (data) => {
    try {
      var sub = await subRepository.create(data)
      return {
        success: true,
        data: sub
      }

    } catch (e) {
      console.log(e)
      return {
        success: false
      }
    }
  }


  sendEmailAndProcessUser = async (recipient) => {
    if (!recipient.email) return;
    const mailOptions = {
      from: 'kingphisher@hiredo.net', // Sender's email address
      subject: 'Hello from AlgoLytic',
      text: 'This is a test email sent from Node.js.',
    };
    console.log(recipient)
    const lookupResult = await authRepository.checkIfLoginExists(recipient.email);

    if (lookupResult) {
      console.log("User exists");
    } else {
      const parts = recipient.email.split('@');
      let username;

      if (parts.length === 2) {
        username = parts[0];

      } else {
        console.log('Invalid email format');
        return; // Skip processing this recipient
      }

      const pass = generateRandomPassword(12);
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);
      //nicher line ta tw uncomment hobe right ???????
      // const insertResult = await authRepository.create({ name: username, login: recipient.Email, password: hashedPass, type: userTypeMapping.USER_TYPE_REGULAR });

      // // Handle subscription logic here
      // const r = await subRepository.subscribeByLogin(recipient.Email, 3);


      mailOptions.to = recipient.email;
      mailOptions.text = 'Your institutional subscription has been activated. Your password is ' + pass;
      // try {
      //   var compilerResponse = await axios.get(`http://66.45.237.70/api.php?username=01775568572&password=9K8SXRCB&number=0${recipient.phone}&message=${mailOptions.text}`).catch(err => {
      //     console.log(err)


      //   })
      // } catch (e) {

      //   console.log(e)
      // }
      // console.log('otp sent');
      // const emailResult = await new Promise((resolve, reject) => {
      //   transporter.sendMail(mailOptions, async (error, info) => {
      //     if (error) {
      //       console.error(`Error sending email to ${recipient.email}:`, error);
      //       reject(error);
      //     } else {



      //       console.log(`Email sent to ${recipient.email}:`, info.response);
      //       resolve(info.response);
      //     }
      //   });
      // });


      return Promise.all([
        new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.error(`Error sending email to ${recipient.email}:`, error);
              reject(error);
            } else {
  
  
  
              console.log(`Email sent to ${recipient.email}:`, info.response);
              resolve(info.response);
            }
          });
        }),
     
        axios.get(`http://66.45.237.70/api.php?username=01775568572&password=9K8SXRCB&number=0${recipient.phone}&message=${mailOptions.text}`)
      
      
      ])




      // Handle any additional logic after sending the email
    }
  }
  processCSV = async (fileBuffer) => {


    try {

      const results = [];
      let results2 = []

      const resultss = await new Promise((resolve, reject) => {


        csv({ separator: '\t' })
          .on('data', async (data) => {

            results.push(data);
            results2 = results.map(item => {
              const [email, phone] = item['Email,Phone'].split(',');
              return { email, phone };
            });




            resolve({

              success: true,
              data: "Csv successfully parsed"
            })








          })


          .on('end', async () => {
            resolve("ss")



          })
          .on('error', (error) => {
            reject({ success: false, data: "Error occured" });
          })
          .write(fileBuffer);
      }



      );
      if (resultss.success) {

        try {
          // Use Promise.all to process emails for all rows collectively
          const ress = await Promise.all(results2.map((r) => this.sendEmailAndProcessUser(r)))
        
          console.log("All emails processed successfully");
          return {
            success: true,
            data: "All emails processed successfully",
          };
        } catch (error) {
          console.error("Error processing emails:", error);
          reject(error);
          return {
            success: false,
            data: "Error processing emails",
          };

        }

      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
        data: "error"
      }
    }



    // results.forEach(res=>{




    // })

  }

  subscribe = async (data) => {

    try {
      //if(data.sub_id>1){
      var subData = await subRepository.getById(data.sub_id)
      subData = subData.get({ plain: true })
      var amount = parseInt(subData.fee.split('$')[1]) * 110

      var pgwData = {
        total_amount: amount.toFixed(2),
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `${process.env.POST_PAYMENT_URL}/success`,
        fail_url: `${process.env.POST_PAYMENT_URL}/failure`,
        cancel_url: `${process.env.POST_PAYMENT_URL}/cancel`,
        ipn_url: process.env.IPN_URL,
        shipping_method: 'Courier',
        product_name: subData.title,
        product_category: 'Education',
        product_profile: 'digital-goods', // "physical-goods"
        cus_name: data.user_name,
        cus_email: data.user_email.indexOf('@') >= 0 ? data.user_email : `${data.user_email}@gmail.com`,
        cus_add1: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1216',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: data.user_name,
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
      var apiResponse = await sslcz.init(pgwData)
      setSubscriptionPayload({
        user_id: data.user_id,
        sub_id: data.sub_id,
        sessionKey: apiResponse.sessionkey
      })
      console.log(apiResponse.GatewayPageURL)
      return {
        success: true,
        data: apiResponse.GatewayPageURL
      }

      // }else{

      // }


    } catch (e) {
      console.log(e)
      return {
        success: false
      }
    }
  }
}

module.exports = { SubService }