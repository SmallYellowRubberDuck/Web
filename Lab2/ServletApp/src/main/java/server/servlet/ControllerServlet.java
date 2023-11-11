package server.servlet;


import server.data.Result;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class ControllerServlet extends HttpServlet {

    public static ArrayList<Result> table = new ArrayList<>();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, ServletException {
        String type = req.getParameter("type");
        ServletContext ctx = getServletContext();
        String x;
        String y;
        String r;
        switch (type){
            case "delete":table.clear();ctx.setAttribute("table",table); resp.getWriter().println("Deleted");
            case "input":
                x = req.getParameter("x");
                y = req.getParameter("y");
                r = req.getParameter("r");
                if ((x != null && y != null && r != null && type != null) &&
                    ((!x.trim().isEmpty()) &&
                            (!y.trim().isEmpty()) &&
                            (!r.trim().isEmpty()) &&
                            (!type.trim().isEmpty()))){
                req.getRequestDispatcher("/area-checker").forward(req, resp);
                System.out.println(table);
                }
            case "click":
                x = req.getParameter("x");
                y = req.getParameter("y");
                r = req.getParameter("r");
                if ((x != null && y != null && r != null && type != null) &&
                        ((!x.trim().isEmpty()) &&
                                (!y.trim().isEmpty()) &&
                                (!r.trim().isEmpty()) &&
                                (!type.trim().isEmpty()))){
                    req.getRequestDispatcher("/area-checker").forward(req, resp);
                }
            default:
                PrintWriter out = resp.getWriter();
                out.println("Packet is not full! Try to resend it.");
                resp.setContentType("text/plain;charset=UTF-8");
                resp.sendError(400);
        }
    }
}