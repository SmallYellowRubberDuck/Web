package entity;

import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Comparator;

@Entity
@Table(name = "record")
public class Result implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Column(name = "x")
    private double x;

    @Getter
    @Column(name = "y")
    private double y;

    @Getter
    @Column(name = "r")
    private double r = 1.0;

    @Getter
    @Column(columnDefinition = "timestamp without time zone default now()", name = "record_time")
    private Timestamp currentTime;

    @Getter
    @Column(name = "execution_time")
    private double executionTime;

    @Getter
    @Column(name = "hit")
    private boolean hit;

    @Getter
    @Column(name = "type")
    private Type type;

    public Result() {}

    public Result(double x, double y, double r, Timestamp currentTime, double executionTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hit = hit;
    }

    @Override
    public String toString(){
        return "{id: " + id + ", " +
                "x: " + x + ", " +
                "y: " + y + ", " +
                "r: " + r + ", " +
                "time: " + currentTime + ", " +
                "ex_time: " + executionTime + ", " +
                "hit: " + hit + ", " +
                "type: " + type + "}";
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setCurrentTime(Timestamp currentTime) {
        this.currentTime = currentTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public void setType(Type type){this.type = type;}

    public static class publicComparator implements Comparator{
        public int compare(Object o1, Object o2){
            long id1 = ((Result) o1).id;
            long id2 = ((Result) o2).id;
            return (((Long)id2).toString()).compareTo(((Long)id1).toString());
        }
    }
}