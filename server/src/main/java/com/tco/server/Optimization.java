package com.tco.server;

import com.google.gson.annotations.SerializedName;

/*
wow, here again. thanks gson, this class DOES feel necessary
 */
public class Optimization {
    //private String construction;
    private Improvement improvement = Improvement.NONE;
    private Construction construction = Construction.none;
    private String response = "1"; // default

    private enum Construction {
        none,
        one,
        some;
    }

    private enum Improvement {
        @SerializedName("none") NONE,
        @SerializedName("2opt") TWOOPT,
        @SerializedName("3opt") THREEOPT;
    }

    protected String getConstruction() {
        return construction.name();
    }

    protected String getImprovement() {
        return improvement.name();
    }

    protected byte getResponse() {
        return response != null ? Byte.parseByte(response) : 1;
    }

}
