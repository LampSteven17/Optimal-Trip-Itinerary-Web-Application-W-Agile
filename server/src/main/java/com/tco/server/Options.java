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

    public Options() {
        optimization = new Optimization();
    }

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
        return this.optimization.getResponse();
    }

    public String getConstruction() {
        return this.optimization.getConstruction();
    }

    protected String getImprovement() {
        return this.optimization.getImprovement();
    }
}
