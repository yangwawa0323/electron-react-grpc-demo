
import client from '../../pb_js/user/v1/user_service_grpc_web_pb'

export const newUserService = (grpc_server_address) => {
  // return new client.UserSearchServiceClient("http://proxy:8199")
  // change to xueit.guoziweb.com:8181 
  return new client.UserSearchServiceClient(grpc_server_address)
}