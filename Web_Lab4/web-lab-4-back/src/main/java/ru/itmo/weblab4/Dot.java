package ru.itmo.weblab4;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "dots")
public class Dot implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private float x;
    private float y;
    private float r;
    private boolean status;
    private long timestamp;
    private long scriptTime;
    private String owner;

    public Dot() {}

    public Dot(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
        checkStatus();
    }

    private void checkStatus() {
        float ourX = (float) (Math.abs(x)*7/r);
        float ourY = (float) (y*7/r);
        if(ourY >= 0){
            if(ourX<0.5 && ourY < 2.25) status = true;
            else if(ourX>=0.5 && ourX<0.75 && ourY < (3 * ourX + 0.75) ) status = true;
            else if(ourX>=0.75 && ourX<1 && ourY < (9 - 8 * ourX) ) status = true;
            else if(ourX>=1 && ourX<3 && ourY < (1.5 - 0.5 * ourX - 3 * Math.sqrt(10) / 7 * (Math.sqrt(3 - ourX*ourX + 2 * ourX) - 2) )) status = true;
            else if(ourX>=3 && ourX<=7 && ourY < 3 * Math.sqrt(-((ourX / 7) * (ourX/7)) + 1)) status = true;
            else status = false;
        }else{
            if(ourX<4 && ourY > (Math.abs(ourX / 2) - (3 * Math.sqrt(33) - 7) / 112 * ourX * ourX +
                    Math.sqrt(1 - (Math.abs(ourX - 2) - 1) * (Math.abs(ourX - 2) - 1)) - 3)) status = true;
            else if(ourX>=4 && ourX<=7 && ourY > (-3 * Math.sqrt(-((ourX / 7) * (ourX / 7)) + 1))) status = true;
            else status = false;
        }
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float radius) {
        this.r = radius;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public long getScriptTime() {
        return scriptTime;
    }

    public void setScriptTime(long scriptTime) {
        this.scriptTime = scriptTime;
    }
}
