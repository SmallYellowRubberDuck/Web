package server.data.validation;

import java.util.Arrays;

public class ClickValidator {
    private static boolean checkClickCoordinate (String coordinate, String  r){
        String floatRegex = "^-?\\d+\\.?\\d*$";
        if (coordinate.trim().matches(floatRegex)){
            float rFloat = Float.parseFloat(r);
            float coordinateFloat = Float.parseFloat(coordinate);
            return -5 <= coordinateFloat && coordinateFloat <= 5;
        }
        return false;
    }
    static final String[] values = {"1", "1.5", "2", "2.5", "3"};


    public static boolean checkClick(String x, String y, String r){
        if(Arrays.asList(values).contains(r.trim())){
            return checkClickCoordinate(x, r) && checkClickCoordinate(y, r);
        }
        return false;
    }
}
