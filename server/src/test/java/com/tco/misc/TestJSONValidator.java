package com.tco.misc;

import org.junit.Test;

import org.json.*;

import com.tco.server.*;

import static org.junit.Assert.assertEquals;

public class TestJSONValidator {

    @Test
    public void testGetSchema() {
        JSONObject codeClimate = new JSONObject();
        codeClimate.append("requestVersion", "1");
        codeClimate.append("requestType", "config");
        String testString = codeClimate.toString();
        boolean passed = true;
        try {
            JSONValidator.validate(RequestConfig.class, testString);
            passed = false;
        } catch (Exception e) {
            // do nothing
        }
        assertEquals("No exception", true, passed);
    }


}
