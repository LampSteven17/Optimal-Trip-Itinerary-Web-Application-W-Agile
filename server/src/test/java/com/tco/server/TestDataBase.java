package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestDataBase {
    private DataBaseAccessor db;


    @Before
    public void createConfigurationForTestCases(){

        db = new DataBaseAccessor("alf", 100, "test"); // just construct
    }

    @Test
    public void check_environment() {
        // todo this should actually test something when set up
         String url = db.getURL();

        String environment_home = System.getenv("CS314_ENV");
        String environment_TRAVIS = System.getenv("TRAVIS");
        if (environment_home != null) {
            if (environment_home.equals("development") )
                assertEquals("URL test", "jdbc:mysql://127.0.0.1:56247/cs314", url);
        } else if (environment_TRAVIS != null) {
            if (environment_TRAVIS.equals("true"))
                assertEquals("URL test", "jdbc:mysql://127.0.0.1/cs314", url);
        }
    }

    @Test
    public void send_query() {
        // todo send test query once set up
        try {
            db.send_query();
        } catch (Exception e){
            System.out.println("Not connected, are you port forwarded??");
        }
    }

}
