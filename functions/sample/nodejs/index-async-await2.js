/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */

 const { CloudantV1 } = require('@ibm-cloud/cloudant')
 const { IamAuthenticator } = require('ibm-cloud-sdk-core')
 
 async function main(params) {
     const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY })
     const cloudant = CloudantV1.newInstance({
         authenticator: authenticator
     })
 
     cloudant.setServiceUrl(params.COUCH_URL)
 
     if(params['state']){
         try {
             const response = await cloudant.postFind({
               db: 'dealerships',
               selector: {state: {'$eq': params.state}},
             })
 
             return {"body":response.result.docs.map((row) => { return {
                 id: row.id,
                 full_name: row.full_name,
                 short_name: row.short_name,
                 city: row.city,
                 state: row.state,
                 st: row.st,
                 address: row.address,
                 zip: row.zip,
                 lat: row.lat,
                 long: row.long
             }})}
 
         } catch (error) {
             return { error: error.description }
         }
     } else {
         try {
             const response = await cloudant.postAllDocs({
               db: 'dealerships',
               includeDocs: true
             })
 
             return { "body":response.result.rows.map((row) => { return {
                 id: row.doc.id,
                 full_name: row.doc.full_name,
                 short_name: row.doc.short_name,
                 city: row.doc.city,
                 state: row.doc.state,
                 st: row.doc.st,
                 address: row.doc.address,
                 zip: row.doc.zip,
                 lat: row.doc.lat,
                 long: row.doc.long
             }}) }
         } catch (error) {
             return { error: error.description }
         }
     }
 }
 