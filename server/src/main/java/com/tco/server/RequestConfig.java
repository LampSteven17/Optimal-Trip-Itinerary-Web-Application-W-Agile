package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class RequestConfig extends RequestHeader {
  private String serverName;
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);
  private String[] supportedRequests;
  private Map<String, String[]> optimization;
  private Map<String, String[]> filter;


  RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    this.supportedRequests = new String[]{"config", "distance", "trip", "find"};

    String[] construction = new String[]{"none", "one"};
    String[] improvement = new String[]{"none"};
    this.optimization = new HashMap<String, String[]>();
    this.optimization.put("construction", construction);
    this.optimization.put("improvement", improvement);

    String[] type = new String[]{"airport"};
    String[] where = new String[]{"Nothin but a test babey"};
    this.filter = new HashMap<String, String[]>();
    this.filter.put("type", type);
    this.filter.put("where", where);
  }


  @Override
  public void buildResponse() {
    this.serverName = "t10 Two Hands Up";
    log.trace("buildResponse -> {}", this);
  }


  String getServerName() {
    return this.serverName;
  }
  Integer getVersion() { return this.requestVersion; }
  String getType() { return this.requestType;}
  int getSupportedRequestLength() { return this.supportedRequests.length;}
}
