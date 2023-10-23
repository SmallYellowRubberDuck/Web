package server.data.validation;

import java.util.Arrays;

public class InputValidator {
    public static boolean checkInput(String x, String y, String r){
        return checkInputX(x)&&checkInputY(y)&&checkInputR(r);
    }
    private static boolean checkInputX(String input){
        String floatRegex = "^-?\\d+\\.?\\d*$";
        if (input.trim().matches(floatRegex)){
            float x = Float.parseFloat(input.trim());
            return -3 < x && x < 5;
        }
        return false;
    }

    private static boolean checkInputY(String input){
        final String[] values = {"-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"};
        return Arrays.asList(values).contains(input.trim());
    }

    private static boolean checkInputR(String input){
        final String[] values = {"1", "1.5", "2", "2.5", "3"};
        return Arrays.asList(values).contains(input.trim());
    }
}
