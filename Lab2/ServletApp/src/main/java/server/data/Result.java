package server.data;

import java.util.HashMap;
import java.util.Map;

public class Result {
    public float x;
    public float y;
    public  float r;
    public String time;
    public long execTime;
    public boolean hit;

    public Result(float x, float y, float r, String time, long execTime, boolean hit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = time;
        this.execTime = execTime;
        this.hit = hit;
    }
    @Override
    public String toString(){
        return "{" +
                "\"x\":" + x +
                ", \"y\":" + y +
                ", \"r\":" + r +
                ", \"time\":\"" + time + "\"" +
                ", \"execTime\":" + execTime +
                ", \"hit\":" + hit +
                "}";
    }


    public Map<String, Object> toMap(){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("x", x);
        result.put("y", y);
        result.put("r", r);
        result.put("time", time);
        result.put("execTime", execTime);
        result.put("hit", hit);
        return result;
    }
}