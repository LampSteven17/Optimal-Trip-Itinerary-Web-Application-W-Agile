package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;



public class Find extends RequestHeader {
    private final transient Logger log = LoggerFactory.getLogger(Find.class);
    private String match;
    private Integer limit;
    private int found;
    private List<Map<String, String> > places;
    private Narrow narrow;

    public Find() {}

    public Find(String match, int limit) {
        this.match = match;
        this.limit = limit;

    }

    @Override
    public void buildResponse() throws IOException {
        sanitize();                                                                                                     // clean up inputs
        queryDatabase();                                                                                                // actually send query
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


    private void queryDatabase() {
        DataBaseAccessor matchQuery = new DataBaseAccessor();

        if (getLimit() != null) { matchQuery.setLimit(this.limit); }                                                    // Only set if not null
        setUpDataBase(matchQuery);                                                                                      // Set other variables IFF not null from gson

        this.places = matchQuery.send_query();
        if (matchQuery.getFound() == null) this.found = 0;                                                              // not my greatest checks but hey, it works
        this.found = matchQuery.getFound() > 0 ? matchQuery.getFound() : 0;                                             // dont want to return it if - found
    }

    private void setUpDataBase(DataBaseAccessor matchQuery) {
        if (getMatch() == null)
            return;

        matchQuery.setMatch(this.match);
        if (this.narrow == null)
            return;

        if (this.narrow.getWhere() != null) {
            matchQuery.setWhere(this.getWhere());
        }
        if (this.narrow.getTypes() != null) {
            matchQuery.setTypes(this.narrow.getTypes());
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

    public String getMatch() {return this.match != null ? this.match : null;}
    public Integer getLimit() {return this.limit != null ? this.limit : null;}
    public void setMatch(String match) { this.match = match; }
}
