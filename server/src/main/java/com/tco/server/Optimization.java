package com.tco.server;

import com.google.gson.annotations.SerializedName;

/*
wow, here again. thanks gson, this class DOES feel necessary
 */
public class Optimization {
    //private String construction;
    private Improvement improvement;
    private Construction construction;
    private String response;

    private enum Construction {
        @SerializedName("none") NONE,
        @SerializedName("one") ONE ,
        @SerializedName("some") SOME;
    }
    //private String construction;

    public enum Improvement {
        @SerializedName("none") NONE("none"),
        @SerializedName("2opt") TWOOPT("2opt"),
        @SerializedName("3opt") THREEOPT("3opt");

        String improvement;

        Improvement(String improvement) {
            this.improvement = improvement;
        }

        public String getImprovement() {
            return this.improvement;
        }
    }


    /*
    protected String getConstruction() {
        return construction != null ? this.construction. : "";
    }
    */



    protected String getImprovement() {
        return improvement.getImprovement();
    }


    protected byte getResponse() {
        //return response != null ? Byte.parseByte(response) : 1;
        return 1;
    }
}
