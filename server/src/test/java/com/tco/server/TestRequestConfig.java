package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestRequestConfig {
  private RequestConfig conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = conf.getType();
    assertEquals("config requestType", "config", type);
  }

  @Test
  public void testVersion() {
    int version = conf.getVersion();
    assertEquals("config requestVersion", 5, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "t10 Two Hands Up", name);
  }

  @Test
  public void testNumberOfRequests() {
    int num = conf.getSupportedRequestLength();
    assertEquals("config supported requests", 4, num);
  }
}
