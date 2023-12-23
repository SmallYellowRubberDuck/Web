package helping;

import entity.Type;

import java.util.Arrays;

public class ValueValidator {

    private final double[] xValues = {-3, -2, -1, 0, 1, 2, 3, 4, 5};
    private final  String floatRegex = "^-?\\d+\\.?\\d*$";


    public boolean validate(double x, double y, double r, Type type){
        System.out.println("type: " + type);
        if(type == Type.SUBMIT){
            System.out.println("Submit");
            System.out.println(x + " " + validateSubmitX(x));
            System.out.println(y + " " + validateSubmitY(y));
            System.out.println(r + " " + validateSubmitR(r));
            return validateSubmit(x, y, r);
        }
        else if(type == Type.CLICK){
            return validateClick(x, y, r);
        }
        return false;
    }

    private boolean validateSubmit(double x, double y, double r){
        return validateSubmitX(x) && validateSubmitY(y) && validateSubmitR(r);
    }

    private boolean validateSubmitX(double x){
        for(double value : xValues){
            if(value == x){
                return true;
            }
        }
        return false;
    }

    private boolean validateSubmitY(double y){
        return -5 <= y && y <= 3;
    }

    private boolean validateSubmitR(double r){
        return 1 <= r && r <= 4 && (r % 0.5) % 1  == 0;
    }



    private boolean validateClick(double x, double y, double r){
        System.out.println("validateR: "+validateClickR(r));
        System.out.println("validateX: "+validateClickX(x, r));
        System.out.println("validateY: "+validateClickY(y, r));
        System.out.println("x " + x);
        System.out.println("y " + y);
        System.out.println("r " + r);
        return validateClickR(r) && validateClickX(x, r) && validateClickY(y, r);
    }

    private boolean validateClickX(double x, double r){
        return -1.25*r <= x && x <= 1.25*r;
    }

    private boolean validateClickY(double y, double r){
        return -1.25*r <= y && y <= 1.25*r;
    }

    private boolean validateClickR(double r){
        return validateSubmitR(r);
    }
}