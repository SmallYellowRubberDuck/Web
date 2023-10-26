package server.servlet;


import server.data.Result;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static server.data.validation.Validator.correct;
import static server.servlet.ControllerServlet.*;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        long start = System.nanoTime();
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm::ss"));
        String reqX = req.getParameter("x").trim();
        String reqY = req.getParameter("y").trim();
        String reqR = req.getParameter("r").trim();
        String reqType = req.getParameter("type").trim();

        PrintWriter out = resp.getWriter();
        resp.setContentType("text/plain;charset=UTF-8");
        ServletContext ctx = getServletContext();
        if (correct(reqX, reqY, reqR, reqType)){
            float x = Float.parseFloat(reqX);
            float y = Float.parseFloat(reqY);
            float r = Float.parseFloat(reqR);

            boolean hit = checkHit(x,y,r);
            long execTime = (System.nanoTime() - start)/1000;
            Result result = new Result(x, y, r, currentTime, execTime, hit);
            table.add(result);
            ctx.setAttribute("table", table);
            out.println(result);
        }else{
            float x = Float.parseFloat(reqX);
            float y = Float.parseFloat(reqY);
            float r = Float.parseFloat(reqR);
            long execTime = (System.nanoTime() - start)/1000;
            Result result = new Result(x,y,r, currentTime, execTime, false);
            table.add(result);
            ctx.setAttribute("table", table);
            out.println(result);
            //resp.sendError(403);
        }
    }
    private boolean checkHit(float x, float y, float r){
        return firstQuarter(x,y,r)||secondQuarter(x,y,r)||thirdQuarter(x,y,r)||forthQuarter(x,y,r);
    }
    private boolean firstQuarter(float x, float y, float r){
        return x>=0&&y>=0&&x<=r&&y<=r/2;
    }
    private boolean secondQuarter(float x, float y, float r){
        return x<=0&&y>=0&&(x*x+y*y<=r*r/4);
    }
    private boolean thirdQuarter(float x, float y, float r){
        return false;
    }
    private boolean forthQuarter(float x, float y, float r){
        return x>=0&&y<=0&&(y-x>=-r/2);
    }
}
