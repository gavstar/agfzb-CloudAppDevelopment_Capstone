from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import BasicAuthenticator

def main(param_dict):
    authenticator = BasicAuthenticator(param_dict["USERNAME"], param_dict["IAM_API_KEY"])
    service = CloudantV1(authenticator=authenticator)
    service.set_service_url(param_dict["COUCH_URL"])

    response = service.post_find(
        db='reviews',
        selector={'dealership': {'$eq': int(param_dict['dealer_id'])}},
    ).get_result()

    return {"body": response['docs']}