package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;

public class Find extends RequestHeader {


    private String match;
    private int limit;
    private int found;
    private List<Map<String, String> > places;

    @Override
    public void buildResponse() throws IOException {
        System.out.println(this.places.size() + " ==============");
    }



}
