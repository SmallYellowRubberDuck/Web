package server.data.validation;

import static server.data.validation.ClickValidator.checkClick;
import static server.data.validation.InputValidator.checkInput;

public class Validator {
    public static boolean correct(String x, String y, String r, String type){
        if (type.equals("click")){
            return checkClick(x,y,r);
        }else if (type.equals("input")){
            return checkInput(x,y,r);
        }
        return false;
    }
}
