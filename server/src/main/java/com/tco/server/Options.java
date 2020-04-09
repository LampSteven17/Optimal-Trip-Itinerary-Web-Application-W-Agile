package com.tco.server;

import java.util.Map;

/* This class was created to hold the options as parsed by the
MicroServer Gson instance. Think we don't need a class? I'll
buy you a beer second COVID is over if you can do it without
a class.
 */
public class Options {
    private Optimization optimization;
    private String earthRadius;
    private String title;

    public Options() {}

    protected Options(String earthRadius, String title) {
        this.earthRadius = earthRadius;
        this.title = title;
    }


    protected String getEarthRadius() {
        return this.earthRadius;
    }

    protected String getTitle() {
        return this.title;
    }

    protected byte getResponse() {
        //return optimization.getResponse();
        return 1;
    }

    public String getConstruction() {
        //return optimization.getConstruction();
        return "yeah";
    }

    protected String getImprovement() {
        //return optimization.getImprovement();
        return optimization.getImprovement();
    }
}
