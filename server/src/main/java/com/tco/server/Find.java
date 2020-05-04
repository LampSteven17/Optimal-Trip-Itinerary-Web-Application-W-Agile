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
    private Narrow narrow;

    public Find() {}

    public Find(String match, int limit, int found) {
        this.match = match;
        this.limit = limit;
        this.found = found;
    }

    @Override
    public void buildResponse() throws IOException {
        sanitize(); // clean up inputs
        // Find something
    }


    private void sanitize() {
        if (match != null) {
            match = match.replaceAll("[^a-zA-Z0-9]", "_");
        }
        if (narrow == null) {
            return;
        }
        if (narrow.getWhere() != null) {
            narrow.setWhere(narrow.getWhere().replaceAll("[^a-zA-Z0-9]", "_"));
        }
    }



    // quick data structure for narrow cause why not
    protected class Narrow{
        private List<String> type;
        private String where;

        protected Narrow(List<String> type, String where) {
            this.type = type;
            this.where = where;
        }

        protected String getWhere() { return this.where != null ? this.where : null; }

        protected String[] getTypes() {
            if (this.type == null) return null;
            return this.type.toArray(new String[this.type.size()]);
        }

        protected void setWhere(String where) { this.where = where;}

    }

    public String getWhere() { return this.narrow.getWhere();}
    public String[] getTypes() { return this.narrow.getTypes();}

    public void setForTesting(List<Map<String, String> > places, List<String> type, String where) {
        this.places = places;
        this.narrow = new Narrow(type, where);
    }

    public String getMatch() {return this.match;}
}
