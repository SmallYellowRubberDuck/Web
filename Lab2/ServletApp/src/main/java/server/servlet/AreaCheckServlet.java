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
            BigDecimal x = new BigDecimal(reqX);
            float y = Float.parseFloat(reqY);
            float r = Float.parseFloat(reqR);

            boolean hit = checkHit(x,y,r);
            long execTime = (System.nanoTime() - start)/1000;
            Result result = new Result(x, y, r, currentTime, execTime, hit);
            table.add(result);
            ctx.setAttribute("table", table);
            out.println(result);
        }else{
            BigDecimal x = new BigDecimal(reqX);
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
    private boolean checkHit(BigDecimal x, float y, float r){
        return firstQuarter(x,y,r)||secondQuarter(x,y,r)||thirdQuarter(x,y,r)||forthQuarter(x,y,r);
    }
    private boolean firstQuarter(BigDecimal x, float y, float r){
        return x.compareTo(new BigDecimal(0))>=0&&y>=0&&x.compareTo(new BigDecimal(r))<=0&&y<=r/2;
    }
    private boolean secondQuarter(BigDecimal x, float y, float r){
        return x.compareTo(new BigDecimal(0))<=0&&y>=0&&(x.multiply(x).add(new BigDecimal(y*y)).compareTo(new BigDecimal(r*r/4))<=0);
    }
    private boolean thirdQuarter(BigDecimal x, float y, float r){
        return false;
    }
    private boolean forthQuarter(BigDecimal x, float y, float r){
        return x.compareTo(new BigDecimal(0))>=0&&y<=0&&((new BigDecimal(y).add(x.negate())).compareTo(new BigDecimal(r/2).negate())>=0);
    }
}
