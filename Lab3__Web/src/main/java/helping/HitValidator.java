package helping;

public class HitValidator {
    public static boolean isHit(double x, double y, double r){
        return inSecondQuarter(x, y, r) || inThirdQuarter(x, y, r) || inForthQuarter(x, y, r);
    }

    private static boolean inSecondQuarter(double x, double y, double r){
        return (-r <= x && x <= 0) && (0 <= y && y <=r);
    }
    private static boolean inThirdQuarter(double x, double y, double r){
        return (x <= 0) && (y <= 0) && (y >= -x - r/2);
    }
    private static boolean inForthQuarter(double x, double y, double r){
        return (x >= 0) && (y <= 0) && (x*x + y*y <= r*r);
    }
}