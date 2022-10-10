/**
 * @fileoverview gRPC-Web generated client stub for grpc_web_demo.user.v1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.0
// 	protoc              v0.0.0
// source: user/v1/user_service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
import web from 'grpc-web';
grpc.web = web;

import user_v1_user_pb from './user_pb.js';
const proto = {};
proto.grpc_web_demo = {};
proto.grpc_web_demo.user = {};
import v1 from './user_service_pb.js';
proto.grpc_web_demo.user.v1 = v1

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc_web_demo.user.v1.UserSearchServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.grpc_web_demo.user.v1.UserSearchServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpc_web_demo.user.v1.SearchByNameRequest,
 *   !proto.grpc_web_demo.user.v1.SearchByNameResponse>}
 */
const methodDescriptor_UserSearchService_SearchByName = new grpc.web.MethodDescriptor(
  '/grpc_web_demo.user.v1.UserSearchService/SearchByName',
  grpc.web.MethodType.UNARY,
  proto.grpc_web_demo.user.v1.SearchByNameRequest,
  proto.grpc_web_demo.user.v1.SearchByNameResponse,
  /**
   * @param {!proto.grpc_web_demo.user.v1.SearchByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc_web_demo.user.v1.SearchByNameResponse.deserializeBinary
);


/**
 * @param {!proto.grpc_web_demo.user.v1.SearchByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpc_web_demo.user.v1.SearchByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpc_web_demo.user.v1.SearchByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc_web_demo.user.v1.UserSearchServiceClient.prototype.searchByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc_web_demo.user.v1.UserSearchService/SearchByName',
      request,
      metadata || {},
      methodDescriptor_UserSearchService_SearchByName,
      callback);
};


/**
 * @param {!proto.grpc_web_demo.user.v1.SearchByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpc_web_demo.user.v1.SearchByNameResponse>}
 *     Promise that resolves to the response
 */
proto.grpc_web_demo.user.v1.UserSearchServicePromiseClient.prototype.searchByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpc_web_demo.user.v1.UserSearchService/SearchByName',
      request,
      metadata || {},
      methodDescriptor_UserSearchService_SearchByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.grpc_web_demo.user.v1.SearchByGenderRequest,
 *   !proto.grpc_web_demo.user.v1.SearchByGenderResponse>}
 */
const methodDescriptor_UserSearchService_SearchByGender = new grpc.web.MethodDescriptor(
  '/grpc_web_demo.user.v1.UserSearchService/SearchByGender',
  grpc.web.MethodType.UNARY,
  proto.grpc_web_demo.user.v1.SearchByGenderRequest,
  proto.grpc_web_demo.user.v1.SearchByGenderResponse,
  /**
   * @param {!proto.grpc_web_demo.user.v1.SearchByGenderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpc_web_demo.user.v1.SearchByGenderResponse.deserializeBinary
);


/**
 * @param {!proto.grpc_web_demo.user.v1.SearchByGenderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.grpc_web_demo.user.v1.SearchByGenderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpc_web_demo.user.v1.SearchByGenderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpc_web_demo.user.v1.UserSearchServiceClient.prototype.searchByGender =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpc_web_demo.user.v1.UserSearchService/SearchByGender',
      request,
      metadata || {},
      methodDescriptor_UserSearchService_SearchByGender,
      callback);
};


/**
 * @param {!proto.grpc_web_demo.user.v1.SearchByGenderRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpc_web_demo.user.v1.SearchByGenderResponse>}
 *     Promise that resolves to the response
 */
proto.grpc_web_demo.user.v1.UserSearchServicePromiseClient.prototype.searchByGender =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/grpc_web_demo.user.v1.UserSearchService/SearchByGender',
      request,
      metadata || {},
      methodDescriptor_UserSearchService_SearchByGender);
};


export default proto.grpc_web_demo.user.v1;
