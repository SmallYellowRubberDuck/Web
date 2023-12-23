package helping;

import java.sql.Timestamp;
import java.util.Date;

public class TimeManager {
    public static Timestamp getCurrentTimestamp() {
        Date currentDate = new Date();
        return new Timestamp(currentDate.getTime());
    }
}