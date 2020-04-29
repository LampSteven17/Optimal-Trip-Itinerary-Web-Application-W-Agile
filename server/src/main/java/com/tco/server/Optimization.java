package com.tco.server;

import com.google.gson.annotations.SerializedName;

/*
wow, here again. thanks gson, this class DOES feel necessary
 */
public class Optimization {
    //private String construction;
    private Improvement improvement;
    private Construction construction;
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
        return construction != null ? construction.name() : null;
    }

    protected String getImprovement() {
        return improvement != null ? improvement.name() : null;
    }

    protected byte getResponse() {
        return response != null ? Byte.parseByte(response) : 1;
    }

}
